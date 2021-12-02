import { Button, Chip, CircularProgress, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useScrollTrigger } from "@mui/material";
import { Slide, AppBar, Toolbar, Typography, Avatar, Box
      } from "@mui/material";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {auth} from '../../actions/auth.js'
import useStyles from './styles.js';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import FaceIcon from '@mui/icons-material/Face';

const Navbar = () => {
    const trigger = useScrollTrigger();
    const dispatch = useDispatch();
    const history = useHistory();
    const {authUser, isAuthLoading} = useSelector((state)=> state.auth);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const styles = useStyles();

    const googleSuccess = (res)=> {
        dispatch(auth(res, history));
    }

    const logout = ()=>{
        dispatch({type : 'LOGOUT'});
        window.location.reload();
    }
    const googleError = (err) => {
        console.log(err.message);
    }

    return (
        <div>
            <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
            <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', justifyContent:'flex-start',alignItems:'center'}}>
                <IconButton size='small' onClick={()=>(setDrawerOpen(true))}><MenuIcon/></IconButton>
                <Typography variant="h6" component="div">
                <span className={styles.uvce}>UVCE&nbsp;</span> <span className={styles.marvel}>MARVEL</span>
                </Typography>
                </div>
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
                        variant="rounded-outlined" >
                        Login
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

            {/*Drawer starts here*/}
            <Drawer open={drawerOpen} onClose={()=>(setDrawerOpen(false))} variant='temporary' color='primary'
            anchor='left' >
            <Box style={{paddingTop:'30px', height:'100%', width:'100%'}}>
                {authUser?.id && <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <Avatar src={authUser?.profilePic} sx={{width: '60px',height:'60px'}}/>
                    <br/>
                    <Chip label={authUser?.currentRole==='STU' ? 'STUDENT': 'INSTRUCTOR'} variant='outlined' color='primary' size='small'/>
                    <br/>
                    <GoogleLogout 
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} 
                        color='secondary' variant='contained'>
                        Logout
                        </Button>
                    )}
                    onLogoutSuccess={logout} onFailure={googleError}/>
                    <br/>
                    <List>
                        <ListItem button onClick={()=>(console.log('profile'))}>
                            <ListItemIcon><FaceIcon/></ListItemIcon>
                            <ListItemText>My profile</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>(console.log('profile'))}>
                            <ListItemIcon><FaceIcon/></ListItemIcon>
                            <ListItemText>Course page</ListItemText>
                        </ListItem>
                    </List>
                </div>}
            </Box>
            </Drawer>
            </AppBar>
            </Slide>
        </div>
    )
}

export default Navbar
