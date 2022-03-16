import { useSelector } from "react-redux";
import { useState } from "react";
import { Typography, Paper, Tab, Tabs, Skeleton, Button, 
    IconButton, Alert, Snackbar, Slide
} from "@mui/material";
import { Box } from "@mui/system";
import PostCard from '../PostCard.js'
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getSubmissions } from "../../API/index.js";
import CachedIcon from '@mui/icons-material/Cached';

const DbSubmissions = () => {
    const {authUser} = useSelector(state => state.auth);
    const [tab, setTab] = useState(authUser?.currentRole==='STU' ? 'pr' : 'rsa');
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});
    
    const {data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch, isRefetching} = useInfiniteQuery(
        [{nature:'feed',place:'dashboard',widget:'subs',postType:tab}],
        ({pageParam=1})=>(getSubmissions(tab, pageParam)),
    {
        getNextPageParam : (lastResult, results) => {
            if(lastResult?.posts?.length< 3){
                return undefined;
            }else{
                return results?.length+1;
            }
        },
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
        <IconButton disabled={isRefetching}
        sx={{position:'absolute', top:'5px',right:'5px', color:'secondary.main'}} 
        onClick={async()=>{
            setAlertInfo({open:true, message:'Refreshing Submission Widget.', severity:'info'});
            await refetch();
            setAlertInfo({open:true, message:'Submission widget has been Refreshed', severity:'success'});
        }}>
            <CachedIcon/>
        </IconButton>
        <Typography variant='widget-heading'>submissions</Typography>
        <br/><br/>
        <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        {(authUser?.currentRole==='STU'||authUser?.enrollmentStatus==="INACTIVE") && 
        <Tab label="Project reports" value='pr'/>
        }
        {(authUser?.currentRole==='INS'||authUser?.enrollmentStatus==="INACTIVE") && 
         <Tab label="Res Articles" value='rsa'/>
         }
        <Tab label="Blog posts" value='blog'/>
        </Tabs>
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
        {data?.pages?.map((result, ia)=>(
            <Box sx={{display:'grid', gridTemplateColumns: '1fr', gap:'15px'}} key={ia} >
                {result?.posts?.map((post, ib)=>(
                    <PostCard type={tab} post={post} scope='dashboard' variant='smol' key={ib} />
                ))}
            </Box>
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
