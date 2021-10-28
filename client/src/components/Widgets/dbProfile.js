import { Avatar, Paper,Typography, Chip, TextField, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from 'react';
import {getProfileData, updateProfile} from '../../actions/dashboard.js';

const DbProfile = () => {
    const {authUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileData(authUser?.id, 'dashboard'))
    }, [])
    const {profile, isProfileLoading} = useSelector(state => state.dashboard);
    const [changed, setChanged] = useState(false);
    const [profileCopy, setProfileCopy] = useState(profile);

    const handleSave=()=>{
        dispatch(updateProfile(profile?.id, profileCopy ));
        setChanged(false);
        setProfileCopy(profile);
    }
    return (
        <>
        <Paper variant='widget' style={{height:'max-content'}}>
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
            <Typography variant='widget-heading'>Public Profile</Typography>
            <Chip size='small' variant='outlined' label={authUser?.currentRole==='STU'?'STUDENT':'INSTRUCTOR'}></Chip>
            </div>
            <br/>

            { isProfileLoading ? <CircularProgress/> :  
            <div style={{display: 'grid',gridTemplateColumns:'1fr 5fr',columnGap:'20px'}}>
                <Avatar sx={{width:60,height:60}} src={authUser?.profilePic}/>
                <div>
                <Typography variant='button'>{authUser?.name}</Typography><br/><br/>

                    {/* EDITABLE FORM */}
                <TextField label="Bio" defaultValue={profileCopy?.bio} value={profileCopy?.bio} variant='standard' multiline
                InputProps={{ style:{fontSize: '13px', lineHeight:'24px'}}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,bio : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>
                
                <TextField label="LinkedIn" defaultValue={profileCopy?.linkedIn} value={profileCopy?.linkedIn} variant='standard' multiline
                InputProps={{ style:{fontSize: '13px', lineHeight:'24px'}}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,linkedIn : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="GitHub" defaultValue={profileCopy?.gitHub} value={profileCopy?.gitHub} variant='standard' multiline
                InputProps={{style:{fontSize: '13px', lineHeight:'24px'}}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,gitHub : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="Website"defaultValue={profileCopy?.website} value={profileCopy?.website} variant='standard' multiline
                InputProps={{style:{fontSize: '13px', lineHeight:'24px'}}}
                onChange={(e)=>{setChanged(true);setProfileCopy({...profileCopy,website : e.target.value});}}
                fullWidth size='small' color='secondary'/><br/><br/>
                
                {/* BUTTONS  */}
                {changed && <Button variant='contained' size='small' onClick={handleSave}
                color='secondary'>Save</Button>
                }&nbsp;&nbsp;&nbsp;&nbsp;
                { changed && 
                <Button variant='contained' size='small' onClick={()=>{setChanged(false);setProfileCopy(profile)}}
                color='secondary'>Cancel</Button>
                }
                </div>  
            </div>}
            
            
        </Paper>
        </>
    )
}

export default DbProfile;
