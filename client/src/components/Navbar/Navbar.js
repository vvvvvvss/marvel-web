import { Button, Chip, CircularProgress, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useScrollTrigger, Collapse } from "@mui/material";
import { Slide, AppBar, Toolbar, Typography, Avatar, Box
      } from "@mui/material";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {useNavigate, useLocation} from 'react-router-dom';
import useStyles from './styles.js';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import FaceIcon from '@mui/icons-material/Face';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/AutoStories';
import InfoIcon from '@mui/icons-material/Info';
import Dashboard from "@mui/icons-material/Dashboard";
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import tokenRefresher from "../../utils/functions/refresher.js";
import useAuth from "../../utils/hooks/useAuth.js";
import { useQueryClient } from "react-query";

const Navbar = () => {
    const trigger = useScrollTrigger();
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const styles = useStyles(); 
    const [crsListOpen, setCrsListOpen] = useState(false);
    const {authUser, isLoading:isAuthLoading, fetchAuth} = useAuth();

    const googleSuccess = (res)=> {
        sessionStorage.setItem('deez', res.tokenId);
        fetchAuth();
        tokenRefresher(res);
    }

    const logout = ()=>{
        sessionStorage.clear();
        queryClient.removeQueries(['auth'], {exact:true})
    }
    
    const googleError = (err) => {
        console.log(err);
        if(err.error !== 'popup_closed_by_user'){
            alert("Looks like login did'nt go well :(. Please try again.");
        }
    }
    return (
        <>
            <Slide appear={false} direction="down" in={!trigger} sx={{maxWidth: '100%'}} >
            <AppBar variant={location?.pathname==='/'?'transparent':''} >
            <Toolbar style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                <span style={{display:'flex', justifyContent:'flex-start',alignItems:'center'}}>
                <IconButton size='small' onClick={()=>(setDrawerOpen(true))}><MenuIcon/></IconButton>
                {location?.pathname!=='/'&&
                <Typography variant="h6" onClick={()=>(navigate('/'))} sx={{cursor:'pointer'}}>
                <span className={styles.uvce}>UVCE&nbsp;</span><span className={styles.marvel}>MARVEL</span>
                </Typography>}
                </span>
                {isAuthLoading ? <CircularProgress sx={{color:location?.pathname!=='/'?"primary.dark":''}} /> : 
                <div className={styles.righttoolbar}>
                    { authUser?.id ?
                         <Avatar alt={authUser?.name} src={authUser?.profilePic} onClick={()=>{if(authUser?.enrollmentStatus!=='UNKNOWN')navigate(`/profile/${authUser?.slug}`)}}
                        style={{marginRight:'20px'}}/>
                        : <> </>
                    }
                    <div>
                    { !authUser?.id &&
                    <GoogleLogin
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} 
                        variant="rounded-outlined" >
                        Login
                        </Button>)}
                    onSuccess={googleSuccess} onFailure={googleError} 
                    cookiePolicy="single_host_origin" isSignedIn={true}/>
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
                    {authUser?.enrollmentStatus!=='UNKNOWN' && <Chip label={authUser?.currentRole==='STU' ? 'STUDENT':authUser?.currentRole==='INS'? 'INSTRUCTOR' :'INACTIVE'} variant='outlined' color='primary' size='small'/>}
                    <br/>
                </div>}
                <List>
                {(authUser?.id && authUser?.enrollmentStatus!=='UNKNOWN') &&
                <>
                <Divider/>
                <ListItemButton onClick={()=>(navigate(`/profile/${authUser?.slug}`))}>
                    <ListItemIcon><FaceIcon/></ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </ListItemButton>
                { (authUser?.currentRole==='STU'&&authUser?.enrollmentStatus==="ACTIVE") ? 
                <ListItemButton onClick={()=>(navigate(`/course/${authUser?.currentStuCourse}`))}>
                    <ListItemIcon><BookIcon/></ListItemIcon>
                    <ListItemText>My Course
                    </ListItemText>
                </ListItemButton> 
                : (authUser?.currentRole==='INS'&&authUser?.enrollmentStatus==="ACTIVE")?
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
                      <ListItemButton key={c} onClick={()=>(navigate(`/course/${c}`))}>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primaryTypographyProps={{variant:'body2'}} >{c}</ListItemText>
                      </ListItemButton>
                  ))}
                </List>
              </Collapse> </> : <></>}
                <ListItemButton onClick={()=>(navigate('/dashboard'))}>
                    <ListItemIcon><Dashboard/></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
                <Divider/></>}
                <ListItemButton onClick={()=>(navigate("/search"))}>
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText>Search</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={()=>(console.log('coming soon'))}>
                    <ListItemIcon><AutoAwesomeIcon/></ListItemIcon>
                    <ListItemText>Explore (coming soon)</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={()=>{}}>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText>About (coming soon)</ListItemText>
                </ListItemButton>
                </List>
            <footer>
                <Divider/>
                { authUser?.id && <GoogleLogout
                    clientId="458191598671-bhk0llnoseb7phles000g4mccnvepv20.apps.googleusercontent.com"
                    render={(renderProps) => (
                <ListItemButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <ListItemIcon><LogoutIcon color='primary'/></ListItemIcon>
                            <ListItemText primaryTypographyProps={{color:'#FFD7EA'}} >Logout</ListItemText>
                </ListItemButton>
                    )}
                    onLogoutSuccess={logout} onFailure={googleError}/>}
                
            </footer>
            </Box>
            
            </Drawer>
            </AppBar>
            </Slide>
        </>
    )
}

export default Navbar
