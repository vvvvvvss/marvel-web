import { IconButton, Paper, Typography, Divider, Tabs, Tab, AppBar, Toolbar,Button,  TextField, CircularProgress, Pagination, Skeleton } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getRsaFeedByCourse, getCourseData } from '../../API/index.js';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import PostCard from '../../components/PostCard.js';
import LandTPage from './LandTPage.js';
import { Helmet } from 'react-helmet';
import { useQuery, useInfiniteQuery } from 'react-query';
import useAuth from "../../utils/hooks/useAuth.js";
import Intro from './Intro.js'

const CoursePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {authUser} = useAuth();
    const hashParam = useLocation()?.hash;
    const [tab, setTab] = useState(hashParam==='#overview'? 'levels' : hashParam==='#rsa'&&authUser?.enrollmentStatus!=='UNKNOWN' ? 'rsa' : 'levels');
    const [searchTitle, setSearchTitle] = useState("");
    const [titleField, setTitleField] = useState("");

    const {data, isLoading:isOverviewLoading} = useQuery([{courseCode:id, scope:'overview'}], 
        ()=>(getCourseData(id, 'overview')),
        {
            onSuccess:(response)=>{
                if(["404","403","401","BRUH"].includes(response?.status)){
                    navigate({pathname:"/404"});
                }
            },
            onError:()=>{
                alert("Something went wrong while fetching syllabus.");
            }
        }
    );
    const overview = data?.course;
    const {data:feedData, isLoading:isFeedLoading, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery(
        [{nature:'feed',place:'course',postType:'rsa', courseCode:id, search:searchTitle}], 
        ({pageParam=1})=>(getRsaFeedByCourse(id, pageParam, searchTitle)),
        {
            onError:()=>{
                alert("Something went wrong while fetching syllabus.");
            },
            getNextPageParam:(lastPage, pages)=>{
                if(lastPage?.feed?.length<6){
                    return undefined;
                }else{
                    return pages?.length+1;
                }
            },
            enabled:!!authUser?.enrollmentStatus!=='UNKNOWN'
        }
    );

    const handleShare = () => {
        try {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
        } catch (error) {
            alert("Coud'nt copy link to clipboard :(");
        }
    }

    return (
        <>
        <Helmet>
          <title>{`${overview?.courseCode || 'Course'} | ${overview?.caption} | Marvel 🚀🌘`}</title>
          <meta name='description' content={overview?.caption || "..."} />
          <meta property="og:title" content={`${overview?.courseCode || 'Course'} | UVCE MARVEL 🚀🌘`} />
        </Helmet>

        <Navbar/>
        <Paper square elevation={0} sx={{display:'flex',justifyContent:'center', minWidth:'100vw',backgroundColor:'#121212',minHeight:'100vh'}}>
        <div>
        {/* HERO STARTS HERE */}
        <Paper square elevation={0} sx={{maxWidth:'1580px', display:'grid', gridTemplateColumns: {md:'1fr 1fr',xs:'1fr'},width:'100vw',gridTemplateRows:{xs:'1fr 1fr',md:'1fr'}}}>
            <Paper square elevation={0} sx={{backgroundColor: '#2B0F12', padding:'85px 20px 20px 30px', position:'relative', display:'flex', alignItems:'center',maxHeight:{xs:'450px',sm:'350px'}}}>
            { isOverviewLoading ? <>
                <Skeleton variant='rectangular' height='350px' animation='wave' sx={{borderRadius:'12px', width:{xs:'100%'},minWidth:{md:'600px',xs:'300px'}}} />
            </> :
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
                    &nbsp;&nbsp;&#8226;&nbsp;&nbsp;{overview?.totalLevels} {`Level${overview?.totalLevels >1 ? 's':''}`}
                </Typography>
                </span>
                <br/>
                <Divider/>
                <br/>
                <Typography variant='body2' sx={{paddingLeft: '10px',color:'primary.light'}}>{overview?.caption}</Typography>
            </div>}
            </Paper>
            {/* intro content right side  */}
            <Intro intro={overview?.intro} isOverviewLoading={isOverviewLoading} />
        </Paper>
        <Divider/>
        { ((authUser?.id)&&(authUser?.enrollmentStatus!=='UNKNOWN'))&&
        <AppBar position='sticky' sx={{background:'#181818', overflowX:'auto'}}> 
        <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'end'}}>
        <Tabs textColor='inherit' value={tab} onChange={(e, value)=>{navigate({hash:value==='levels'?'#overview':"#rsa"});setTab(value)}}>
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
        <span style={{maxWidth:'1000px',display:'flex'}}>
            <TextField placeholder='Search by Title' value={titleField} onChange={(e)=>(setTitleField(e.target.value))} fullWidth />&nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={(e)=>(setSearchTitle(titleField))} variant='outlined'><SearchIcon/></Button>
        </span><br/>
        {isFeedLoading ?
        <CircularProgress/>
         : feedData?.pages[0]?.feed?.length===0 ? 
        <Typography variant="h6" fontWeight='600' color='#808080'>We found nothing.</Typography> :
        <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',lg:'1fr 1fr',xl:'1fr 1fr 1fr'},gap:'20px',justifyContent:'center', minWidth:{xs:'100%',sm:'max-content'}, maxWidth:{xs:'400px',sm:'max-content'}}}>
        {feedData?.pages?.map((page, i)=>(
            page?.feed?.map((p, j)=>(
                <PostCard type='rsa' post={p} scope='else' variant='media' key={`${i}${j}`}/>
            ))
        ))}
        </Box>}
        <br/><br/>
        <Button disabled={(!hasNextPage || isFetchingNextPage)||isFeedLoading}
         onClick={()=>(fetchNextPage())} >
            {(!hasNextPage) ? "That's it" : "load more"}
        </Button>
        </Box>}
        <br/><br/><br/>
        </div>
        </Paper>
        </>
    )
}

export default CoursePage;
