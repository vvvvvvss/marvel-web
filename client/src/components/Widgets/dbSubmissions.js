import { useSelector } from "react-redux";
import { useState } from "react";
import { Typography, Paper, Tab, Tabs, Skeleton, Button, 
    IconButton, Alert, Snackbar, Slide, Select, TextField, MenuItem
} from "@mui/material";
import { Box } from "@mui/system";
import PostCard from '../PostCard.js'
import { useInfiniteQuery } from "react-query";
import { getSubmissions } from "../../API/index.js";
import CachedIcon from '@mui/icons-material/Cached';

const DbSubmissions = () => {
    const {authUser} = useSelector(state => state.auth);
    const [tab, setTab] = useState(authUser?.currentRole==='STU' ? 'pr' : 'rsa');
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});
    const [filter, setFilter] = useState({title:'',courseCode:'All'});
    const [temp, setTemp] = useState("");
    
    const {data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch, isRefetching, isStale} = useInfiniteQuery(
        [{nature:'feed',place:'dashboard',widget:'subs',postType:tab, authUser:authUser?.id, search:{...filter}}],
        ({pageParam=1})=>(getSubmissions(tab, pageParam, filter)),
    {
        getNextPageParam : (lastResult, results) => {
            if(lastResult?.posts?.length< 3){
                return undefined;
            }else{
                return results?.length+1;
            }
        },
        staleTime:1000*60*5 //5 minutes
    });
    return (
    <>
        {alertInfo?.open && <Snackbar open={alertInfo?.open} autoHideDuration={6000} 
            TransitionComponent={(props)=><Slide direction="up" {...props}/>}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}} 
            onClose={()=>(setAlertInfo({...alertInfo, open:false}))}>
            <Alert variant="filled" onClose={()=>(setAlertInfo({...alertInfo, open:false}))} severity={alertInfo?.severity}>
                {alertInfo?.message}
            </Alert>
        </Snackbar>}
        <Paper variant='widget' sx={{position:'relative'}}>
        <IconButton disabled={isRefetching || !isStale}
        sx={{position:'absolute', top:'5px',right:'5px', color:'secondary.main'}} 
        onClick={async()=>{
            setFilter({...filter, title:temp})
            setAlertInfo({open:true, message:'Refreshing Submission Widget.', severity:'info'});
            await refetch();
            setAlertInfo({open:true, message:'Submission widget has been Refreshed', severity:'success'});
        }}>
            <CachedIcon/>
        </IconButton>
        <Typography variant='widget-heading'>submissions</Typography>
        <br/><br/>
        <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        {(authUser?.currentRole==='STU') && 
        <Tab label="PRs" value='pr'/>
        }
        {(authUser?.currentRole==='INS') && 
         <Tab label="Res Articles" value='rsa'/>
         }
        <Tab label="Blog posts" value='blog'/>
        </Tabs>
        <br/>
       {(authUser?.currentRole==="INS"&&tab==='rsa') &&
       <>
        <Select size="small" fullWidth color='secondary' placeholder="Filter by Course Code"
                value={filter?.courseCode}
                onChange={(e)=>(setFilter({...filter, courseCode:e?.target?.value}))}
            >
                <MenuItem value="All" ><em>All</em></MenuItem>
                {authUser?.currentInsCourse?.map((c)=>(
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
        </Select>
        <br/><br/>
        </>}
        <span style={{display:'grid', gridTemplateColumns:'5fr 2fr', gap:'15px'}} >
        <TextField sx={{width:'100%'}}
        size="small" value={temp} onChange={(e)=>setTemp(e?.target?.value)}
        placeholder={'Filter by Title'} />
        <Button sx={{width:'100%'}} variant='outlined' onClick={()=>setFilter({...filter, title:temp})}>
            GO
        </Button>
        </span>
        <br/>
        { isLoading ? 
        <>
        <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'8px', width:'100%', height:'90px',marginTop:'15px'}} /> 
        <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'8px', width:'100%', height:'90px',marginTop:'15px'}} /> 
        </> 
         :
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'15px'}}>

        {data?.pages?.[0]?.posts?.length===0 ? 
        <Typography variant='caption' sx={{width:'100%',display:'flex',justifyContent:'center',color:'#a1a1a1',height:'100px', alignItems:'center'}} >
            Crickets. Its empty here.
        </Typography> :
        <Box sx={{display:'grid', gridTemplateColumns: '1fr', gap:'15px'}}>
        {data?.pages?.map((result, i)=>(
                result?.posts?.map((post, j)=>(
                    <PostCard type={tab} post={post} scope='dashboard' variant='smol' key={`${i}${j}`} />
                ))
        ))
        } 
        </Box>}
         
       {isFetchingNextPage ?
       <Skeleton variant="text" width={'100%'} animation='wave' /> :
        <Button disabled={!hasNextPage} variant='text'
        onClick={()=>{fetchNextPage()}} >
            {hasNextPage ? 'Load more' : "that's it"}
        </Button>}
        </div>} 
        </Paper>
    </>
    )
}

export default DbSubmissions;
