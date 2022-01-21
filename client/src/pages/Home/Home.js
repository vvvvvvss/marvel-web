import { Paper, Alert} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Box} from '@mui/system'

const Home = () => {
    const navigate = useNavigate();
    console.log("i rendered");
    const authUser = useSelector(state => state.auth.authUser);
return (
    //entire screen
    <Paper square sx={{minHeight:'100vh', display:'flex',justifyContent:'center',maxWidth:'100vw',overflowX:'hidden'}}>
    <Navbar/>
    {/* entire page  */}
    <Box sx={{width: '100%',maxWidth:'1300px',padding: '90px 20px 20px 20px',display:'flex',flexDirection:'column',alignItems:'center'}}>
        { authUser?.enrollmentStatus==='UNKNOWN' &&
            <Alert severity="warning" fontSize='12px' icon={false}>
            Thankyou for showing interest in UVCE Marvel. You can continue to explore
            our Blogs, Stories, Syllabus etc. If you are expecting Dashboard access, contact us.
            </Alert>
        }
       <br/>
    </Box>
    </Paper>
)
}

export default Home;
