import { Button, Chip, CircularProgress, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useScrollTrigger, Collapse } from "@mui/material";
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
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BookIcon from '@mui/icons-material/AutoStories';
import InfoIcon from '@mui/icons-material/Info';
import Dashboard from "@mui/icons-material/Dashboard";
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Navbar = () => {
    const trigger = useScrollTrigger();
    const dispatch = useDispatch();
    const history = useHistory();
    const {authUser, isAuthLoading} = useSelector((state)=> state.auth);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const styles = useStyles();
    const [crsListOpen, setCrsListOpen] = useState(false);

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
                <Typography variant="h6" component="div" onClick={()=>(history.push('/'))} sx={{cursor:'pointer'}}>
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
            <Drawer open={drawerOpen} onClose={()=>(setDrawerOpen(false))} variant='temporary'
            anchor='left'>
            <Box style={{padding:'30px 0px 0px 0px', height:'100%', width:'100%'}}>
                {authUser?.id && 
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <Avatar src={authUser?.profilePic} sx={{width: '70px',height:'70px',marginBottom:'5px'}}/>
                    <Typography variant='body1' sx={{marginBottom:'8px'}}>{authUser?.name}</Typography>
                    {authUser?.enrollmentStatus!=='UNKNOWN' && <Chip label={authUser?.currentRole==='STU' ? 'STUDENT':authUser?.currentRole==='INS'? 'INSTRUCTOR' :''} variant='outlined' color='primary' size='small'/>}
                    <br/>
                </div>}
                <List>
                {(authUser?.id && authUser?.enrollmentStatus!=='UNKNOWN') &&
                <>
                <Divider/>
                <ListItemButton onClick={()=>(history.push(`/profile/${authUser?.slug}`))}>
                    <ListItemIcon><FaceIcon/></ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </ListItemButton>
                { authUser?.currentRole==='STU' ? 
                <ListItemButton onClick={()=>(console.log('profile'))}>
                    <ListItemIcon><BookIcon/></ListItemIcon>
                    <ListItemText>My Course
                    </ListItemText>
                </ListItemButton> 
                : 
                <>
                <ListItemButton onClick={()=>(setCrsListOpen((p)=>(!p)))}>
                <ListItemIcon>
                  <BookIcon/>
                </ListItemIcon>
                <ListItemText primary="My Courses" />
                {crsListOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={crsListOpen}  timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{backgroundColor:'#001C28'}}>
                  {authUser?.currentInsCourse?.map((c)=>(
                      <ListItemButton key={c} onClick={()=>(history.push(`/course/${c}#rsa`))}>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primaryTypographyProps={{variant:'body2'}} >{c}</ListItemText>
                      </ListItemButton>
                  ))}
                </List>
              </Collapse> </>}
                <ListItemButton onClick={()=>(history.push('/dashboard'))}>
                    <ListItemIcon><Dashboard/></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
                <Divider/></>}
                <ListItemButton onClick={()=>(history.push("/search"))}>
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText>Search</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={()=>(console.log('coming soon'))}>
                    <ListItemIcon><AutoAwesomeIcon/></ListItemIcon>
                    <ListItemText>Explore (coming soon)</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={()=>(console.log('profile'))}>
                    <ListItemIcon><NewspaperIcon/></ListItemIcon>
                    <ListItemText>Blog</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={()=>(history.push("/about"))}>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText>About</ListItemText>
                </ListItemButton>
                </List>
            <footer>
                <Divider/>
                <GoogleLogout 
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                <ListItemButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <ListItemIcon><LogoutIcon color='primary'/></ListItemIcon>
                            <ListItemText primaryTypographyProps={{color:'#FFD7EA'}} >Logout</ListItemText>
                </ListItemButton>
                    )}
                    onLogoutSuccess={logout} onFailure={googleError}/>
                
            </footer>
            </Box>
            
            </Drawer>
            </AppBar>
            </Slide>
        </div>
    )
}

export default Navbar
