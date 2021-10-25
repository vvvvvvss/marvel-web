import { Button, CircularProgress, DialogTitle, useScrollTrigger } from "@mui/material";
import { Slide, AppBar, Toolbar, Typography, Chip, Avatar
      } from "@mui/material";
import { useState } from "react";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {auth} from '../../actions/auth.js'
import useStyles from './styles.js';

const Navbar = () => {
    const trigger = useScrollTrigger();
    const dispatch = useDispatch();
    const history = useHistory();
    const {authUser, isAuthLoading} = useSelector((state)=> state.auth);
    const styles = useStyles();

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
                <span className={styles.uvce}>UVCE&nbsp;</span>
                <span className={styles.marvel}>MARVEL</span>
                </Typography>

                {isAuthLoading ? <CircularProgress/> : 
                <div className={styles.righttoolbar}>
                    { authUser?.id ?
                         <Avatar alt={authUser?.name} src={authUser?.profilePic} 
                        style={{marginRight:'20px'}}/>
                        : <> </>
                    }
                    <div>
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
                    <div className={styles.logout}>
                    <GoogleLogout 
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} 
                        variant='rounded-outlined' className={styles.logoutbutton}>
                        Logout
                        </Button>
                    )}
                    onLogoutSuccess={logout} onFailure={googleError}/>
                    </div>
                    }
                    </div>
                </div>}
            </Toolbar>
            </AppBar>
            </Slide>
        </div>
    )
}

export default Navbar
