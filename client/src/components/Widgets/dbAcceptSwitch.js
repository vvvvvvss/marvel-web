import { MenuItem, Paper, Typography, Select, Skeleton, Switch, Divider, Snackbar, Slide, IconButton, Alert } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { memo } from "react"; 
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCourseData, toggleSub } from "../../API/index.js";
import CachedIcon from '@mui/icons-material/Cached';

const AcceptSwitch = () => {
    const {authUser} = useSelector(state => state.auth);
    const [course, setCourse] = useState(authUser?.currentInsCourse?.[0]);
    const queryClient = useQueryClient();
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});


    const {data, isLoading, refetch, isRefetching, isStale} = useQuery([{courseCode:course, scope:'subStatus'}],
        ()=>(getCourseData(course, 'subStatus')), {staleTime:1000*60*5}
    );

    const { mutate:toggle ,isLoading:isToggling} = useMutation((level)=>(toggleSub(course, level)),
        {
            onSuccess: (response)=>{
                if(["404","403","BRUH","400"].includes(response?.status)){
                    setAlertInfo({open:true, message:"Something went wrong", severity:'error'})
                }else{
                    console.log(response)
                    queryClient.setQueryData([{courseCode:course, scope:'subStatus'}], {...response, status:'200'})
                }
            },
            onError:()=>(setAlertInfo({open:true, message:"Something went wrong", severity:'error'}))
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

            <Paper variant='widget' sx={{maxHeight:'max-content', position:'relative'}}>
                <Typography variant='widget-heading'>controls</Typography>

                <IconButton disabled={isRefetching || !isStale}
                sx={{position:'absolute', top:'5px',right:'5px', color:'secondary.main'}} 
                onClick={async()=>{
                    setAlertInfo({open:true, message:'Refreshing Control Widget.', severity:'info'});
                    await refetch();
                    setAlertInfo({open:true, message:'Control widget has been Refreshed', severity:'success'});
                }}>
                    <CachedIcon/>
                </IconButton>
                <br/><br/>
                <Typography variant='caption' >You can open and close Submissions for the different courses that you instruct for.</Typography>
                <br/><br/>
                <Select fullWidth color='secondary'
                value={course}
                onChange={(e)=>(setCourse(e.target.value))}
            >
                {authUser?.currentInsCourse?.map((c)=>(
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
            </Select>
            <br/>
            {isLoading ? 
            <><br/>
            <Skeleton animation='wave' variant="text" sx={{height:"8px"}} /><br/>
            <Skeleton animation='wave' variant="text" sx={{height:"8px"}} /><br/>
            <Skeleton animation='wave' variant="text" sx={{height:"8px"}} /><br/>
            </> : 
            <div>
            <br/>
            <Divider/>
            {
               Array.from({length:data?.course?.totalLevels},(_, i)=>i+1).map((i, _)=>(
                <div key={i}>
                <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Typography variant='body2' component='div'>&nbsp;&nbsp;&nbsp;&nbsp;{`Lv ${i}`}</Typography>
                <Switch key={i} checked={data?.course?.submissionStatus?.forLevel===i} 
                disabled={(data?.course?.submissionStatus?.isAccepting && data?.course?.submissionStatus?.forLevel!==i)||isToggling}
                onClick={()=>(toggle(i))} 
                sx={{opacity: `${isToggling ? '0.4' : '1'}`}}
                /> 
                </div>
                <Divider/>
                </div>
               ))
            }
           

            </div>
            }
            </Paper>
        </>
    )
}

export default memo(AcceptSwitch);
