import { Button, DialogTitle, useScrollTrigger } from "@mui/material";
import { Slide, AppBar, Toolbar, Typography, Chip, Avatar
      } from "@mui/material";
import { useState } from "react";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {auth} from '../../actions/auth.js'
import useStyles from './styles.js'

const Navbar = () => {
    const trigger = useScrollTrigger();
    const dispatch = useDispatch();
    const history = useHistory();
    const {authUser} = useSelector((state)=> state.auth);
    const classes = useStyles();

    const googleSuccess = (res)=> {
        console.log('initial token recieved');
        dispatch(auth(res, history));
    }

    const logout = ()=>{
        dispatch({type : 'LOGOUT'});
        sessionStorage.clear();
    }
    const googleError = (err) => {
        console.log(err.message);
    }

    return (
        <div>
            <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
            <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="h6" component="div">
                UVCE MARVEL
                </Typography>
                <div>
                    { authUser?.id ?
                        <Button clickable variant='rounded-avatar' className={classes.usnChip}
                        startIcon={<Avatar alt={authUser?.name} src={authUser?.profilePic} 
                        sx={{height : 25, width : 25}}/>} style={{marginRight : '20px'}}
                        label={authUser?.name}>{authUser?.name}</Button>
                        : <> </>
                    }
                    { !authUser?.id ? 
                    <GoogleLogin
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} 
                        variant="contained" >
                        Log in
                        </Button>)}
                    onSuccess={googleSuccess} onFailure={googleError} 
                    cookiePolicy="single_host_origin" isSignedIn={true}/>
                    :
                    <GoogleLogout
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} 
                        variant="rounded-outlined" color='primary' >
                        Logout
                        </Button>
                    )}
                    onLogoutSuccess={logout} onFailure={googleError}/>
                    }
                </div>
            </Toolbar>
            </AppBar>
            </Slide>
        </div>
    )
}

export default Navbar
