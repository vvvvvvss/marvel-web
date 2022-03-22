import { Typography, Paper, Divider, Avatar, Chip, IconButton, AppBar, Toolbar, Tabs, Tab, Button, CircularProgress, TextField, Skeleton, 
        Snackbar, Slide, Alert} from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import  {useSelector} from "react-redux";
import { useState, useMemo } from "react";
import { Box } from "@mui/system";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import PostCard from "../../components/PostCard";
import { Helmet } from "react-helmet";
import { useInfiniteQuery, useQuery } from "react-query";
import { getProfileFeed, getProfileData } from "../../API/index.js";

const ProfilePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const {authUser} = useSelector(state => state.auth);
    const [tab, setTab] = useState(['#pr','#blog','#cert','#rsa'].includes(location?.hash) ? location?.hash?.slice(1) : 'blog');
    const [searchTitle, setSearchTitle] = useState("");
    const [titleField, setTitleField] = useState("");
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});

    const {data:profileData, isLoading:isProfileLoading} = useQuery([{profileSlug:authUser?.slug, scope:'display'}],
    ()=>getProfileData(id, 'display'),
    {
        onSuccess:(response)=>{
            if(["404","403","400","BRUH"].includes(response?.status)){
                navigate({pathname:'/404'});
            }
        },
        onError:()=>(navigate({pathname:'/404'}))
    }
    );
    const profile = profileData?.profile;
    const {data:feedData, isLoading:isFeedLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        [{nature:'feed',place:'profile',profileSlug:id,postType:tab,authUser:authUser,search:searchTitle}],
        ({pageParam=1})=>(getProfileFeed(id, tab,pageParam,searchTitle)),
        {
            getNextPageParam: (lastPage, pages)=>{
                if(lastPage?.feed?.length<6){
                    return undefined;
                }else{
                    return pages?.length+1;
                }
            },
            onError:()=>(setAlertInfo({open:true, message:'Something went wrong while fetching feed.', severity:'error'}))
        }
    )
    const bioo = useMemo(() => ["Zilch", "nada","N/A","nihil"][Math.floor(Math.random()*4)], []);

    const handleShare = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            alert("Profile Link copied to clipboard successfully.!");
        } catch (error) {
            alert("Coud'nt copy link to clipboard :(");
        }
    }

    return (
    <>
    <Helmet>
        <title>{`${profile?.name || "Profile"} | UVCE MARVEL 🚀🌘`}</title>
        <meta name='description' content={`Checkout ${profile?.name || 'Profile'} on Marvel 🚀🌘`} />
        <meta property="og:title" content={`Checkout ${profile?.name || 'Profile'} on Marvel 🚀🌘`} />
    </Helmet>
    <Navbar/>
    {alertInfo?.open && 
    <Snackbar open={alertInfo?.open} autoHideDuration={6000} 
        TransitionComponent={(props)=><Slide direction="up" {...props}/>}
        anchorOrigin={{vertical:'bottom',horizontal:'center'}} 
        onClose={()=>(setAlertInfo({...alertInfo, open:false}))}>
        <Alert variant="filled" onClose={()=>(setAlertInfo({...alertInfo, open:false}))} severity={alertInfo?.severity}>
            {alertInfo?.message}
        </Alert>
    </Snackbar>}
    {/* entire screen */}
    <Paper square elevation={0} sx={{display:'flex',justifyContent:'center', width:'100vw',backgroundColor:'#121212',minHeight:'100vh',minWidth:'100vw'}}>
    {/* ENTIRE WEBSITE */}
    <Box sx={{maxWidth:'1580px',width:'100%'}}>
    {/*top hero*/}
    <Paper square elevation={0} 
    sx={{backgroundColor: '#2B0F12', padding:{md:'85px 20px 20px 20px',xs:'150px 20px 60px 20px'}, minHeight:'300px',
        display:'flex',maxHeight:'350px', justifyContent:'center',alignItems:'center',maxWidth: '1580px'}}>
        {/* hero grid  */}
        <Box sx={{display:"grid",gridTemplateColumns:{md:'10fr 1fr 10fr',xs:'1fr'},justifyContent:'center',alignItems:'center',gridTemplateRows:{xs:'10fr 10fr',md:'1fr'}}}>
            
            {isProfileLoading ?
            <Skeleton animation='wave' sx={{width:{xs:'300px',md:'400px'}, borderRadius:'12px', height:'250px',margin:{xs:'0px',md:'0px 20px 0px 0px'}}}/> :
            <Box sx={{padding:{xs:'0px',md:'0px 20px 0px 0px'}, maxWidth:'400px', display:'grid', gridTemplateColumns:'1fr 4fr', gap:'10px', width:'100%', position:'relative'}}> 
            <Avatar src={profile?.profilePic} sx={{width: '60px', height:'60px'}}/> 
            <div>
                <Typography variant="h6" sx={{marginRight:'20px'}} >{profile?.name}</Typography> 
                {profile?.currentRole==='STU' ? 
                <>
                <Typography variant='caption' sx={{color: 'primary.light'}}>STUDENT</Typography>
                <br/><br/><Divider/><br/>
                <Link to={`/course/${profile?.currentStuCourse}`} style={{textDecoration:'none'}} >
                <Chip label={profile?.currentStuCourse} variant="outlined" color='secondary' size='small' clickable/>
                </Link>
                </>
                : profile?.currentRole==='INS' ? 
                <>
                <Typography variant='caption' sx={{color: 'primary.light'}}>INSTRUCTOR</Typography>
                <br/><br/><Divider/><br/>
                <span>
                {profile?.currentInsCourse?.map((c)=>(
                <Link key={c} to={`/course/${c}`} style={{textDecoration:'none',  marginTop:'8px'}}>
                <Chip label={c} key={c} variant="outlined" color='secondary' size='small' clickable sx={{margin:'6px 8px 6px 0px'}} />
                </Link>
                ))}
                </span>
                </>
                :<></>
                }<br/><br/>
                <Divider/><br/>
            <span>
                <IconButton href={profile?.gitHub} target="_blank" rel="noopener noreferrer" disabled={profile?.gitHub===""||!profile?.gitHub ? true:false}  sx={{color:'primary.main'}}><GitHubIcon/></IconButton>&nbsp;&nbsp;
                <IconButton href={profile?.linkedIn} target="_blank" rel="noopener noreferrer" disabled={profile?.linkedIn===""||!profile?.linkedIn ? true:false}  sx={{color:'primary.main'}}><LinkedInIcon/></IconButton>&nbsp;&nbsp;
                <IconButton href={profile?.website} target="_blank" rel="noopener noreferrer" disabled={profile?.website===""||!profile?.website ? true:false}  sx={{color:'primary.main'}}><LanguageIcon/></IconButton>
                <IconButton onClick={()=>handleShare()} sx={{color:'primary.main'}} ><ShareIcon/></IconButton>
            </span>
            </div>
            </Box >}

            <Divider orientation="vertical" flexItem sx={{justifySelf:'center',display:{xs:'none',md:'block'}}}/>

            {isProfileLoading ? 
            <Skeleton animation='wave' sx={{width:{xs:'300px',md:'400px'}, borderRadius:'12px', height:'250px',margin:{xs:'0px',md:'0px 0px 0px 20px'}}}/> :
            <Box sx={{padding:{xs:'0px',md:'0px 0px 0px 20px'}, width:'100%', maxWidth:"400px"}} >
                <div style={{padding:'20px', position:'relative',display:'flex',justifyContent: 'center'}}>
                <Typography variant="h2" lineHeight='0px' sx={{color:'secondary.light', position:'absolute', left:'0px',top:'0px',fontFamily:'Source Code Pro'}} >&ldquo;</Typography>
                <Typography variant='body2' sx={{color:'secondary.light'}}>{profile?.bio===''||!profile?.bio ? <em style={{color:'#a1a1a1'}}>{bioo}</em> : profile?.bio}</Typography>
                <Typography variant="h2" lineHeight='0px' sx={{color:'secondary.light', position:'absolute', right:'0px',bottom:'0px',fontFamily:'Source Code Pro'}} >&rdquo;</Typography>
                </div>
            </Box>}
        </Box>
        {/* end of grid */}
        </Paper> {/*end of hero*/} 
        <Divider/>
        <AppBar position="sticky" sx={{background:'#1a1a1a',width:'100%'}}>
        <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'end'}}>
            <Tabs textColor='inherit' value={tab} variant="scrollable" scrollButtons='auto' onChange={(e, value)=>setTab(value)}>
            <Tab label="Blog" value='blog' />
            <Tab label="PRs" value='pr'/>
            {(authUser?.enrollmentStatus!=='UNKNOWN'&&authUser?.id) && <Tab label="Res Articles" value='rsa'/>}
            <Tab label="Certificates" value='cert'/>
            </Tabs>  
        </Toolbar>
        </AppBar>
        <Box sx={{padding:'20px 0px 60px 0px', display:'flex', flexDirection:'column', alignItems:'center', maxWidth: '100%'}}>
        <span style={{display:'flex'}}>
        <TextField placeholder='Search by Title' value={titleField} onChange={(e)=>(setTitleField(e.target.value))}/>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={(e)=>(setSearchTitle(titleField))} variant='outlined'><SearchIcon/></Button>
        </span>
        <br/><br/>
        {isFeedLoading ? <CircularProgress/> : feedData?.pages?.[0]?.feed?.length===0 ? 
        <Typography variant="h6" fontWeight='600' color='#808080'>We found nothing.</Typography> :
        <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',lg:'1fr 1fr',xl:'1fr 1fr 1fr'},gap:'20px'}}>
        {["blog","pr","rsa"].includes(tab) &&
        <>
        {feedData?.pages?.map((page, i)=>(
            page?.feed?.map((p, j)=>(
                <PostCard post={p} type={tab} variant='media' scope='else' key={`${i}${j}`}/>
            )) 
        ))}
        </>  
        // : Certificates map
        }
        </Box>
        }
        <br/><br/>
        <Button disabled={(!hasNextPage || isFetchingNextPage)||isFeedLoading}
         onClick={()=>(fetchNextPage())} >
            {(!hasNextPage) ? "That's it" : "load more"}
        </Button>
        </Box>
    </Box>
    </Paper>
    </>
    )
}

export default ProfilePage;
