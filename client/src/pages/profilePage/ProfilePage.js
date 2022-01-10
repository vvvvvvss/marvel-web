import { Typography, Paper, Divider, Avatar, Chip, IconButton, AppBar, Toolbar, Tabs, Tab, Button, CircularProgress, TextField, Skeleton, Pagination} from "@mui/material";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileData } from "../../actions/dashboard.js";
import {getProfileFeed} from "../../actions/other.js"
import { Box, minWidth } from "@mui/system";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import PostCard from "../../components/PostCard";

const ProfilePage = () => {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location?.search);
    const {id} = useParams();
    const dispatch = useDispatch();
    const {authUser} = useSelector(state => state.auth);
    const {overview, isOverviewLoading,feed, isFeedLoading, totalFeedPages} = useSelector(state => state.other);
    const [tab, setTab] = useState(['#pr','#blog','#cert','#rsa'].includes(location?.hash) ? location?.hash?.slice(1) : 'blog');
    const [page, setPage] = useState(query.get('page')||1);
    const [searchTitle, setSearchTitle] = useState("");
    const [titleField, setTitleField] = useState("");

    useEffect(() => {
        dispatch(getProfileData(id, 'page'));
        return ()=>{
            dispatch({type:'CLEAR_OVERVIEW'});
        }
    }, [id])

    useEffect(()=>{
        dispatch(getProfileFeed(id, tab, page, searchTitle));
        return ()=>{
            dispatch({type:'CLEAR_FEED'});
        }
    }, [id, tab, page, searchTitle]);

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
    <Navbar/>
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
            
            {isOverviewLoading ?
            <Skeleton animation='wave' sx={{width:{xs:'300px',md:'400px'}, borderRadius:'12px', height:'250px',margin:{xs:'0px',md:'0px 20px 0px 0px'}}}/> :
            <Box sx={{padding:{xs:'0px',md:'0px 20px 0px 0px'}, maxWidth:'400px', display:'grid', gridTemplateColumns:'1fr 4fr', gap:'10px', width:'100%', position:'relative'}}> 
            <IconButton onClick={()=>handleShare()} sx={{position:'absolute',right:'20px'}} ><ShareIcon/></IconButton>
            <Avatar src={overview?.profilePic} sx={{width: '60px', height:'60px'}}/> 
            <div>
                <Typography variant="h6">{overview?.name}</Typography> 
                {overview?.currentRole==='STU' ? 
                <>
                <Typography variant='caption' sx={{color: 'primary.light'}}>STUDENT</Typography>
                <br/><br/><Divider/><br/>
                <Link to={`/course/${overview?.currentStuCourse}`} style={{textDecoration:'none'}} >
                <Chip label={overview?.currentStuCourse} variant="outlined" color='secondary' size='small' clickable/>
                </Link>
                </>
                : overview?.currentRole==='INS' ? 
                <>
                <Typography variant='caption' sx={{color: 'primary.light'}}>INSTRUCTOR</Typography>
                <br/><br/><Divider/><br/>
                <span>
                {overview?.currentInsCourse?.map((c)=>(
                <Link key={c} to={`/course/${c}`} style={{textDecoration:'none',  marginTop:'8px'}}>
                <Chip label={c} key={c} variant="outlined" color='secondary' size='small' clickable/>&nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
                ))}
                </span>
                </>
                :<></>
                }<br/><br/>
                <Divider/><br/>
            <span>
                <IconButton href={overview?.gitHub} target="_blank" rel="noopener noreferrer" disabled={overview?.gitHub===""||!overview?.gitHub ? true:false}  sx={{color:'primary.main'}}><GitHubIcon/></IconButton>&nbsp;&nbsp;
                <IconButton href={overview?.linkedIn} target="_blank" rel="noopener noreferrer" disabled={overview?.linkedIn===""||!overview?.linkedIn ? true:false}  sx={{color:'primary.main'}}><LinkedInIcon/></IconButton>&nbsp;&nbsp;
                <IconButton href={overview?.website} target="_blank" rel="noopener noreferrer" disabled={overview?.website===""||!overview?.website ? true:false}  sx={{color:'primary.main'}}><LanguageIcon/></IconButton>
            </span>
            </div>
            </Box >}

            <Divider orientation="vertical" flexItem sx={{justifySelf:'center',display:{xs:'none',md:'block'}}}/>

            {isOverviewLoading ? 
            <Skeleton animation='wave' sx={{width:{xs:'300px',md:'400px'}, borderRadius:'12px', height:'250px',margin:{xs:'0px',md:'0px 0px 0px 20px'}}}/> :
            <Box sx={{padding:{xs:'0px',md:'0px 0px 0px 20px'}, width:'100%', maxWidth:"400px"}} >
                <div style={{padding:'20px', position:'relative',display:'flex',justifyContent: 'center'}}>
                <Typography variant="h2" lineHeight='0px' sx={{color:'secondary.light', position:'absolute', left:'0px',top:'0px',fontFamily:'Source Code Pro'}} >&ldquo;</Typography>
                <Typography variant='body2' sx={{color:'secondary.light'}}>{overview?.bio===''||!overview?.bio ? <em style={{color:'#a1a1a1'}}>{["Zilch", "nada","N/A","nihil"][Math.ceil(Math.random()*3)]}</em> : overview?.bio}</Typography>
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
            {authUser?.id && <Tab label="Res Articles" value='rsa'/>}
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
        {isFeedLoading ? <CircularProgress/> : feed?.length===0 ? 
        <Typography variant="h6" fontWeight='600' color='#808080'>We found nothing.</Typography> :
        <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',lg:'1fr 1fr',xl:'1fr 1fr 1fr'},gap:'20px'}}>
        {["blog","pr","rsa"].includes(tab) &&
        <>
        {feed?.map((p)=>( 
        <PostCard post={p} type={tab} variant='media' scope='else'/>
        ))}
        </>  
        // : Certificates map
        }
        </Box>
        }
        <br/><br/>
        <Pagination count={totalFeedPages} variant="outlined" page={page} 
        color="secondary" onChange={(e, page)=>(setPage(page))}
        style={{justifySelf:'center'}}/>
        </Box>
    </Box>
    </Paper>
    </>
    )
}

export default ProfilePage;
