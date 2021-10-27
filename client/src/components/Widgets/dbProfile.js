import { Avatar, Paper,Typography, Chip, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from 'react';
import {getProfileData} from '../../actions/dashboard.js';

const DbProfile = () => {
    const {authUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileData(authUser?.id, 'dashboard'))
    }, [])
    const {profile, isProfileLoading} = useSelector(state => state.dashboard);
    const [editMode, setEditMode] = useState(false);
    const [profileCopy, setProfileCopy] = useState(profile);
    return (
        <>
        <Paper variant='widget' style={{height:'max-content'}}>
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
            <Typography variant='widget-heading'>Public Profile</Typography>
            <Chip size='small' variant='outlined' label={authUser?.currentRole==='STU'?'STUDENT':'INSTRUCTOR'}></Chip>
            </div>
            <br/>
            <div style={{display: 'grid',gridTemplateColumns:'1fr 5fr',columnGap:'20px'}}>
                <Avatar sx={{width:60,height:60}} src={authUser?.profilePic}/>
                <div>
                <Typography variant='button'>{authUser?.name}</Typography><br/><br/>

                    {/* EDITABLE FORM */}
                <TextField label="Bio" value={profileCopy?.bio} variant='standard' multiline
                InputProps={{ style:{fontSize: '13px'}}} disabled={!editMode}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="LinkedIn" value={profileCopy?.linkedIn} variant='standard' multiline
                InputProps={{ style:{fontSize: '13px'}}} disabled={!editMode}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="GitHub" value={profileCopy?.gitHub} variant='standard' multiline
                InputProps={{style:{fontSize: '13px'}}} disabled={!editMode}
                fullWidth size='small' color='secondary'/><br/><br/>

                <TextField label="Website" value={profileCopy?.website} variant='standard' multiline
                InputProps={{style:{fontSize: '13px'}}} disabled={!editMode}
                fullWidth size='small' color='secondary'/><br/><br/>
                
                {/* BUTTONS  */}
                <Button variant='contained' size='small' disabled={editMode ? true : false}
                onClick={()=>(setEditMode(true))}
                color='secondary'>Edit</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {editMode && <Button variant='contained' size='small' 
                color='secondary'>Save</Button>
                }&nbsp;&nbsp;&nbsp;&nbsp;
                { editMode && 
                <Button variant='contained' size='small' onClick={()=>(setEditMode(false))}
                color='secondary'>Cancel</Button>
                }
                </div>
                
            </div>
            
            
        </Paper>
        </>
    )
}

export default DbProfile;
