import { IconButton, Paper, Typography, Divider, Link, Tabs, Tab } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseData } from '../../actions/dashboard.js';
import { useDispatch, useSelector } from 'react-redux';
import {getRsaFeedByCourse} from '../../actions/other.js';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Markdown from 'markdown-to-jsx';

const CoursePage = () => {
    const {id} = useParams();
    const {authUser} = useSelector(state => state.auth);
    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();
    const dispatch = useDispatch();
    const {syllabus, isSyllabusLoading} = useSelector((state)=>(state.dashboard));
    const {isFeedLoading, feed, isOverviewLoading, overview} = useSelector((state)=>(state.other));
    const [tab, setTab] = useState(query.get('v')==='overview'? 'levels' : query.get('v')==='rsa'&&authUser?.enrollmentStatus!=='UNKNOWN' ? 'rsa' : 'levels');
    const [page, setPage] = useState(Number(query.get('page'))||1);
    const [searchTitle, setSearchTitle] = useState("");
    
    useEffect(()=>{
            dispatch(getCourseData(id.trim(), 'overview'));
    },[id]);

    useEffect(() => {
        if(tab==='rsa'){
            dispatch(getRsaFeedByCourse(id, page, searchTitle))
        }else if(tab==='levels'){
            dispatch(getCourseData(id?.trim(), 'levels'));
        }
    }, [tab, page, searchTitle]);

    return (
        <div>
        <Navbar/>
        <Paper square elevation={0} sx={{display:'flex',justifyContent:'center', width:'100vw',backgroundColor:'#111111'}}>
        <div>
        {/* HERO STARTS HERE */}
        <Paper square elevation={0} sx={{maxWidth:'1300px', display:'grid', gridTemplateColumns: '1fr 1fr',width:'100%'}}>
            <Paper square elevation={0} sx={{backgroundColor: '#2B0F12', padding:'85px 20px 20px 30px', position:'relative', display:'flex', alignItems:'center'}}>
            <div>   
                <IconButton sx={{position:'absolute',right :'20px',top:'90px',color:'primary.light'}} ><ShareIcon/></IconButton>
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
            </div>
            </Paper>
            <Paper square elevation={0} sx={{padding:'85px 20px 20px 20px', maxHeight:'350px',overflowY:'scroll'}}>
            <Typography variant='body2' lineHeight='26px' component='span' sx={{color:'secondary.light'}}>
            <Markdown style={{display:'grid',gridTemplateColumns:'1fr',gap:'10px'}} 
                options={
                {wrapper : 'p'},
                { overrides: {
                    p :{ component: Typography , props: {variant : 'body1', sx:{color:'secondary.light'}}}, 
                    a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'}},
                    img : { props : {width : '100%',height:'20px',style:{justifySelf:'center',objectFit:'cover'} }},
                    iframe : { props : {width : '100%', height : '300', frameborder : '0',style:{justifySelf:'center'} }},
                    code : { component:Typography ,props : { variant:'code-small' }},
                    blockquote : {props : { style:{backgroundColor:'#112020',borderRadius:'16px', padding:'20px 20px 20px 20px'} }}
                },
            }}>
            {`${overview?.intro}`}
            </Markdown></Typography>
            </Paper>
        </Paper>
        <Divider/>
        { authUser?.enrollmentStatus!=='UNKNOWN'&&
        <div style={{width:'100%', display:'flex',justifyContent:'center'}}> 
        <Tabs textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        <Tab label="Levels" value='levels'/>
        <Tab label="Res Articles" value='rsa'/> 
        </Tabs>
        </div>}
        </div>
        </Paper>
        </div>
    )
}

export default CoursePage
