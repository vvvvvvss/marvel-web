import { Button, DialogTitle, useScrollTrigger } from "@mui/material";
import { Slide, AppBar, Toolbar, Typography, Dialog, DialogContent, DialogActions,
     DialogContentText } from "@mui/material";
import { useState } from "react";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import tokenRefresher from '../../utils/functions/refresher.js';
import {useDispatch} from 'react-redux';

const Navbar = () => {
    const trigger = useScrollTrigger();
    const dispatch = useDispatch();

    const googleSuccess = (res)=> {
        console.log('initial token recieved');
        tokenRefresher(res);
        dispatch(auth(res.tokenId));
    }

    const googleError = (err) => {
        // console.log(err.message);
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
                    <GoogleLogin
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        variant="contained"
                        >
                        Log in
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    isSignedIn={true}
                    />
                </div>
            </Toolbar>
            </AppBar>
            </Slide>
        </div>
    )
}

export default Navbar
