import { Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCourseData } from '../../actions/dashboard.js';
import { useDispatch, useSelector } from 'react-redux';

const CoursePage = () => {
    const {id} = useParams();
    const {authUser} = useSelector(state => state.auth);
    const {v} = new URLSearchParams(useLocation().search);
    const history = useHistory();
    const dispatch = useDispatch();
    const {syllabus} = useSelector((state)=>(state.dashboard));
    const {isFeedLoading, feed} = useSelector((state)=>(state.other));
    const [tab, setTab] = useState(v==='overview'? 'levels' : v==='rsa'&&authUser?.enrollmentStatus!=='UNKNOWN' ? 'rsa' : 'levels');
    
    useEffect(()=>{
            dispatch(getCourseData(id.trim(), 'overview'));
    },[id]);

    useEffect(() => {
            dispatch(getCourseData(id?.trim(), tab));
    }, [tab]);

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
