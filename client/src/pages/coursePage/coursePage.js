import { Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseData } from '../../actions/dashboard.js';
import { useDispatch, useSelector } from 'react-redux';
import {getRsaFeedByCourse} from '../../actions/other.js'

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

    console.log(syllabus, feed, overview, isOverviewLoading);

    return (
        <div>
        <Navbar/>
        <Paper square elevation={0} variant='window' sx={{display:'flex',justifyContent:'center', width:'100vw'}}>
        {/* HERO STARTS HERE */}
        <Paper square elevation={0} sx={{maxWidth:'1300px', display:'grid', gridTemplateColumns: '1fr 1fr',width:'100%'}}>
            <Paper square elevation={0} sx={{backgroundColor: '#230E10', padding:'85px 20px 20px 20px'}}>
            <Typography variant='h2' fontWeight='600' sx={{color:'primary.main'}}>AI-ML-001</Typography>
            </Paper>
            <Paper square elevation={0} sx={{padding:'85px 20px 20px 20px'}}>
            
            </Paper>
        </Paper>
        </Paper>
        </div>
    )
}

export default CoursePage
