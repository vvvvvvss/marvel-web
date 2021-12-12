import { Button, Paper, Typography, Alert} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Box} from '@mui/system'

const Home = () => {
    const history = useHistory();
    const {authUser} = useSelector(state => state.auth);

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
        { ((authUser?.currentRole==='STU')||(authUser?.currentRole==='INS')) &&
        <Button variant='contained' color='primary' onClick={()=>(history.push('/dashboard'))}>
            Go to Dashboard
        </Button>
        }
        {/* top hero  */}
        <br/>
        {/* logo  */}
        <Box sx={{padding:'30px 30px 30px 30px',width:'100%',position:'relative',maxWidth:'300px'}}>
        <img src={'https://i.imgur.com/SXKFsOc.png'} alt='uvce marvel' style={{maxHeight :'300px',position:'absolute'}}/>
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',padding:'30px 30px 30px 30px',top:'20%'}}>
            <Typography variant="h1" lineHeight='0px' sx={{color:'secondary.light', position:'absolute', left:'0px',top:'20px',fontFamily:'Source Code Pro'}} >&ldquo;</Typography>
            <Typography variant='h4' sx={{color:'secondary.light',fontSize:{xs:'24px',sm:'h1'}}}>Maker's space for advanced research and vital education and learning</Typography>
            <Typography variant="h1" lineHeight='0px' sx={{color:'secondary.light', position:'absolute', right:'30px',bottom:'0px',fontFamily:'Source Code Pro'}} >&rdquo;</Typography>
        </Box>
        </Box>
        {/* something  */}
    </Box>
    </Paper>
)
}

export default Home;
