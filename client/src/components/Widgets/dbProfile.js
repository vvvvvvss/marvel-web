import { Avatar, Paper,Typography, Chip, TextField, Button, Skeleton, Slide, Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProfileData, updateProfile} from "../../API/index.js"

const DbProfile = () => {
    const {authUser} = useSelector(state => state.auth);
    const [changed, setChanged] = useState(false);
    const [profileCopy, setProfileCopy] = useState({});
    const queryClient = useQueryClient();
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});
    //updating
    const {mutate:sendUpdate, isLoading:isUpdating} = useMutation(()=>(updateProfile(authUser?.slug, profileCopy)),
    {
        onSuccess:(response)=>{
            setChanged(false);
            queryClient.setQueryData([{profileSlug:authUser?.slug, scope:'display'}], {...response, status:'200'});
            setProfileCopy(response?.profile);
            setAlertInfo({open:true, message:'Profile updated successfully! 🚀', severity:'success'});
        },
        onError:()=>(setAlertInfo({open:true, message:"Something went wrong. couldn't wpdate profile.", severity:'error'})),
    })
    //feetching
    const {data, isLoading} = useQuery([{profileSlug:authUser?.slug, scope:'display'}],
        ()=>getProfileData(authUser?.slug, 'display'),
        {
            onSuccess:(response)=>{
                if(["404","403","400","BRUH"].includes(response?.status)){
                setAlertInfo({open:true, message:'Something went wrong', severity:'error'});
                }else{
                    setProfileCopy(response?.profile);
                }
            },
            onError:()=>(setAlertInfo({open:true, message:"Something went wrong. couldn't fetch profile", severity:'error'}))
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
        <Paper variant='widget' style={{height:'max-content',}}>
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center', minWidth:'100%'}}>
            <Typography variant='widget-heading'>Profile</Typography>
            <Chip size='small' variant='outlined' color='primary' label={authUser?.currentRole==='STU'?'STUDENT':'INSTRUCTOR'}></Chip>
            </div>
            <br/>

            { isLoading ? 
            <div style={{display: 'grid',gridTemplateColumns:'1fr 5fr',columnGap:'20px'}}>
                <Skeleton variant='circular' animation='wave' sx={{width:60,height:60}}/>
                <div>
                    <Skeleton variant='rectangular' height='24px'  animation='wave' style={{borderRadius:'12px'}} ></Skeleton>
                    <br/>
                    <Skeleton variant='rectangular' height='180px'  animation='wave' style={{borderRadius:'12px'}} ></Skeleton><br/>
                </div>
            </div> :  
            <div style={{display: 'grid',gridTemplateColumns:'1fr 5fr',columnGap:'20px'}}>
                <Avatar sx={{width:60,height:60}} src={authUser?.profilePic}/>
                <div>
                <Typography variant='button'>{authUser?.name}</Typography><br/><br/>

                    {/* EDITABLE FORM */}
                <TextField label="Bio" value={profileCopy?.bio} variant='standard' multiline
                InputProps={{ style:{fontSize: '14px', lineHeight:'24px'}}} inputProps={{maxLength:200}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,bio : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>
                
                <TextField label="LinkedIn" value={profileCopy?.linkedIn} variant='standard' multiline
                InputProps={{ style:{fontSize: '14px', lineHeight:'24px'}}} inputProps={{maxLength:80}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,linkedIn : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="GitHub" value={profileCopy?.gitHub} variant='standard' multiline
                InputProps={{style:{fontSize: '14px', lineHeight:'24px'}}} inputProps={{maxLength:80}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,gitHub : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="Website" value={profileCopy?.website} variant='standard' multiline
                InputProps={{style:{fontSize: '14px', lineHeight:'24px'}}} inputProps={{maxLength:80}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,website : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>
                
                {/* BUTTONS  */}
                {changed && <Button variant='contained' size='small' onClick={()=>sendUpdate()}
                color='secondary'>Save</Button>
                }&nbsp;&nbsp;&nbsp;&nbsp;
                { changed && 
                <Button variant='contained' size='small' onClick={()=>{setChanged(false);setProfileCopy(data?.profile)}}
                color='secondary'>Cancel</Button>
                }
                </div>  
            </div>}
        </Paper>
        </>
    )
}

export default DbProfile;
