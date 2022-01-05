import { IconButton, Paper, Typography, Divider, Link, Tabs, Tab, AppBar, Toolbar,Button,  TextField, CircularProgress, Pagination, Skeleton } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseData } from '../../actions/dashboard.js';
import { useDispatch, useSelector } from 'react-redux';
import {getRsaFeedByCourse} from '../../actions/other.js';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Markdown from 'markdown-to-jsx';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import PostCard from '../../components/PostCard.js';
import LandTPage from '../../components/LandTPage.js';

const CoursePage = () => {
    const {id} = useParams();
    const {authUser} = useSelector(state => state.auth);
    const query = new URLSearchParams(useLocation().search);
    const hashParam = useLocation()?.hash;
    const history = useHistory();
    const dispatch = useDispatch();
    const {syllabus, isSyllabusLoading} = useSelector((state)=>(state.dashboard));
    const {isFeedLoading, feed, isOverviewLoading, overview, totalFeedPages} = useSelector((state)=>(state.other));
    const [tab, setTab] = useState(hashParam==='#overview'? 'levels' : hashParam==='#rsa'&&(authUser?.id&&authUser?.enrollmentStatus!=='UNKNOWN') ? 'rsa' : 'levels');
    const [page, setPage] = useState(Number(query.get('page'))||1);
    const [searchTitle, setSearchTitle] = useState("");
    const [titleField, setTitleField] = useState("");
    useEffect(()=>{
        dispatch(getCourseData(id.trim(), 'overview'));
        return () => {
            dispatch({type:'CLEAR_FEED'});
            dispatch({type:'CLEAR_OVERVIEW'});
        }
    },[id]);

    useEffect(() => {
        if(tab==='rsa'){
            dispatch(getRsaFeedByCourse(id, page, searchTitle))
        }else if(tab==='levels'){
            dispatch(getCourseData(id?.trim(), 'levels'));
        }
    }, [tab, page, searchTitle, id]);

    const handleShare = () => {
        try {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard successfully.!")
        } catch (error) {
            alert("Coud'nt copy link to clipboard :(")
        }
    }

    return (
        <div>
        <Navbar/>
        <Paper square elevation={0} sx={{display:'flex',justifyContent:'center', width:'100vw',backgroundColor:'#121212',minHeight:'100vh'}}>
        <div>
        {/* HERO STARTS HERE */}
        <Paper square elevation={0} sx={{maxWidth:'1580px', display:'grid', gridTemplateColumns: {md:'1fr 1fr',xs:'1fr'},width:'100%',gridTemplateRows:{xs:'1fr 1fr',md:'1fr'}}}>
            <Paper square elevation={0} sx={{backgroundColor: '#2B0F12', padding:'85px 20px 20px 30px', position:'relative', display:'flex', alignItems:'center',maxHeight:{xs:'450px',sm:'350px'}}}>
            { isOverviewLoading ? <div>
                <Skeleton variant='text' variant='rectangular' height='350px' width='600px' animation='wave' sx={{borderRadius:'12px'}} />
            </div> :
            <div style={{maxWidth:'600px'}}>   
                <IconButton sx={{position:'absolute',right :'20px',top:'90px',color:'primary.light'}} onClick={handleShare}>
                    <ShareIcon/>
                </IconButton>
                <Typography variant='button' sx={{paddingLeft: '10px',color:'primary.light'}}>course&nbsp;&nbsp;&#8226;&nbsp;&nbsp;{overview?.domainName}</Typography>
                <Typography variant='h2' fontWeight='600' sx={{color:'primary.main'}}>
                    {overview?.courseCode}
                </Typography>
                <span style={{display:'flex', justifyContent:'flex-start',alignItems:'center'}}>
                <AccessTimeIcon sx={{color:'primary.light',height:'20px',alignSelf:'center',paddingLeft: '10px'}}/>
                <Typography variant='overline' sx={{color:'primary.light', alignSelf:'center'}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{overview?.courseDuration}
                    &nbsp;&nbsp;&#8226;&nbsp;&nbsp;{overview?.totalLevels} Levels
                </Typography>
                </span>
                <br/>
                <Divider/>
                <br/>
                <Typography variant='body2' sx={{paddingLeft: '10px',color:'primary.light'}}>{overview?.caption}</Typography>
            </div>}
            </Paper>
            <Paper square elevation={0} sx={{padding:{md:'85px 30px 20px 30px',xs:'30px 30px 20px 30px'}, maxHeight:{xs:'450px',sm:'350px'},overflowY:'auto'}}>
            { isOverviewLoading ? 
            <>
            <Skeleton variant='text' width='100%' height='32px' animation='wave' sx={{borderRadius:'12px'}} />
            <Skeleton variant='text' width='100%' height='32px' animation='wave' sx={{borderRadius:'12px'}} />
            <Skeleton variant='text' height='300px' width='100%' animation='wave' sx={{borderRadius:'12px'}} />
            </>
            :
            <Typography component='div' sx={{color:'secondary.light'}}>
            <Markdown style={{display:'grid',gridTemplateColumns:'1fr',gap:'10px'}} 
                options={
                {wrapper : 'div'},
                { overrides: {
                    p :{ component: Typography , props: {variant : 'body2', sx:{color:'secondary.light'}, lineHeight :'26px'}}, 
                    a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'}},
                    img : { props : {width : '100%',height:'20px',style:{justifySelf:'center',objectFit:'cover'} }},
                    iframe : { props : {width : '100%', height : '300', frameborder : '0',style:{justifySelf:'center'} }},
                    code : { component:Typography ,props : { variant:'code-small' }},
                    blockquote : {props : { style:{backgroundColor:'#112020',borderRadius:'16px', padding:'20px 20px 20px 20px'} }}
                }
            }}>
            {`${overview?.intro}`}
            </Markdown></Typography>}
            </Paper>
        </Paper>
        <Divider/>
        { ((authUser?.id)&&(authUser?.enrollmentStatus!=='UNKNOWN'))&&
        <AppBar position='sticky' sx={{background:'#181818', overflowX:'auto'}}> 
        <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'end'}}>
        <Tabs textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        <Tab label="Levels" value='levels'/>
        <Tab label="Res Articles" value='rsa'/> 
        </Tabs>  
        </Toolbar>
        </AppBar>}
        {tab==='levels' ? 
        <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <LandTPage/> 
        </Box>  
        :
        <Box display='flex' flexDirection='column' alignItems='center' width='100%' paddingTop='20px'>
        <div style={{maxWidth:'1000px',display:'flex'}}>
            <TextField placeholder='Search by Title' value={titleField} onChange={(e)=>(setTitleField(e.target.value))} fullWidth />&nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={(e)=>(setSearchTitle(titleField))} variant='outlined'><SearchIcon/></Button>
        </div><br/>
        {isFeedLoading ?
        <CircularProgress/>
         : feed?.length===0 ? 
        <Typography variant="h6" fontWeight='600' color='#808080'>There are no Resource Articles for this Course yet.</Typography> :
        <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',lg:'1fr 1fr',xl:'1fr 1fr 1fr'},gap:'20px',maxWidth:'1580px',justifyContent:'center'}}>
        {feed?.map((p)=>(
        <PostCard type='rsa' post={p} scope='else' variant='media' key={p?.slug}/>
        ))}
        </Box>}
        <br/><br/>
        <Pagination count={totalFeedPages} variant="outlined" page={page} 
        color="secondary" onChange={(e, page)=>(setPage(page))}
        style={{justifySelf:'center'}}/>
        </Box>}
        <br/><br/><br/>
        </div>
        </Paper>
        </div>
    )
}

export default CoursePage
