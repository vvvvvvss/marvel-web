import { Paper, Typography, Tab, Tabs, Skeleton, Button, Select, MenuItem, TextField, Snackbar, Alert, IconButton, Slide } from "@mui/material";
import { useState } from "react";
import PostCard from '../PostCard.js';
import {useInfiniteQuery} from "react-query";
import { getToReview } from "../../API/index.js";
import CachedIcon from '@mui/icons-material/Cached';
import useAuth from "../../utils/hooks/useAuth.js";

const DbToReview = () => {
    const {authUser} = useAuth();
    const [tab, setTab] = useState('pr');
    const [filter, setFilter] = useState({title:"", courseCode:"All"});
    const [temp, setTemp] = useState("");
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});


    const {data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isRefetching, refetch, isStale} = useInfiniteQuery(
        [{nature:'feed',place:'dashboard', widget:'review', postType:tab, authUser:authUser, filter:filter}],
        ({pageParam=1})=>(getToReview(tab, pageParam, filter)),
        {
            getNextPageParam: (lastResult, results)=>{
                if(lastResult?.posts?.length < 8){
                    return undefined;
                }else{
                    return results?.length + 1;
                }
            },
            staleTime:1000*60*5 //5 minutes
        }
    );
    
    return (
        <>
        {alertInfo?.open && 
        <Snackbar open={alertInfo?.open} autoHideDuration={6000} 
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
                setAlertInfo({open:true, message:'Refreshing Review Widget.', severity:'info'});
                await refetch();
                setAlertInfo({open:true, message:'Review widget has been Refreshed', severity:'success'});
            }}>
                <CachedIcon/>
            </IconButton>
            <Typography variant="widget-heading">review</Typography>
            <br/><br/>
            <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
            <Tab label="PRs" value='pr'/>
            <Tab label="Blog Posts" value='blog'/>
            </Tabs>
            <br/>
            {(tab==='pr') &&
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
            {isLoading ? 
            <div>
                <Skeleton variant='rectangular' height='100px' animation='wave' style={{borderRadius: '8px'}}/><br/>
                <Skeleton variant='rectangular' height='100px' animation='wave' style={{borderRadius: '8px'}}/><br/>
            </div> 
            : 
            <div style={{display:'flex', flexDirection:'column'}}>
            { data?.pages?.[0]?.length===0 ? 
            <Typography variant='caption' >
                There are no submissions to Review for now!
            </Typography>
            :
            <div style={{display:'grid', gridTemplateColumns:'1fr',gap:'15px'}}>
            {data?.pages?.map((result, i)=>(
                result?.posts?.map((post, j)=>(
                    <PostCard key={`${i}${j}`} post={post} scope='ins-dashboard' type={tab} varaint='smol' />
                ))
            ))}
            </div>}
            <br/>
            <Button onClick={()=>(fetchNextPage())} disabled={!hasNextPage || isFetchingNextPage} >
                {hasNextPage ? "Load More" : "That's it"}
            </Button>
            </div>
            }
            
        </Paper>
        </>
    )
}

export default DbToReview;
