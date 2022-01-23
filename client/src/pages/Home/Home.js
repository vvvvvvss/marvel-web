import { Paper, Alert, Typography, Grow} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useSelector } from 'react-redux';
import {Box} from '@mui/system';
import { Helmet } from 'react-helmet';

const Home = () => {
    const authUser = useSelector(state => state.auth.authUser);
return (
    //entire screen
    <Paper square sx={{minHeight:'100vh', display:'flex',justifyContent:'center',maxWidth:'100vw',overflowX:'hidden',backgroundColor:'#031117'}}>
    <Helmet>
          <title>Marvel 🚀🌘</title>
          <meta name='description' content='UVCE Marvel | Makerspace for Advanced Research, Vital Education and Learning.' />
          <meta property="og:title" content="Marvel 🚀🌘" />
    </Helmet>
    <Navbar/>
    {/* entire page  */}
    <Box sx={{width: '100%',maxWidth:'1300px',padding: '120px 20px 20px 20px'}}>
        { authUser?.enrollmentStatus==='UNKNOWN' &&
            <Alert severity="warning" fontSize='12px' icon={false}>
            Thankyou for showing interest in UVCE Marvel. You can continue to explore
            our Blogs, Stories, Syllabus etc. If you are expecting Dashboard access, contact us.
            </Alert>
        }
       <br/>
    <Box sx={{display:'flex',flexDirection:{xs:'column-reverse',md:'row'},justifyContent:'center', alignItems:'center', height:'min-content'}} >
        <Box sx={{width: 'fit-content'}} >
        <Typography sx={{paddingLeft:{xs:'4px',sm:'29px'}, fontSize:'14px', letterSpacing:'0.23em', fontWeight:'500', margin:{xs:'20px 0px 10px 0px',sm:'0px'}}} >UVCE's</Typography>
        <Typography sx={{maxWidth:'700px',paddingLeft:{xs:'0px',sm:'25px'}, typography:{xs:'h4',sm:'h2'}}} >Makerspace for Advanced Research, Vital Education and Learning.</Typography>
        <Typography sx={{paddingLeft:{xs:'4px',sm:'29px'}, fontSize:'14px', letterSpacing:'0.23em', fontWeight:'400', marginTop:{xs:'10px',sm:'8px'}, color:'secondary.light'}}>
            <span style={{color:'#a1a1a1'}} >AKA</span>&nbsp;MARVEL
        </Typography>
        </Box>
        <Grow in timeout={1500} >
        <img src="https://res.cloudinary.com/marvelweb/image/upload/v1642871840/Subtract_kt3kxv.png"
        style={{width:'100%', alignSelf:'center', maxWidth:'400px', objectFit:'cover', height:'400px', "&:hover":{}}} />
        </Grow>
    </Box>
    {/* <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',md:'1fr 1fr'}, gridTemplateRows:{xs:'1fr 1fr',md:'1fr'}, margin:'70px -20px 0px -20px', gap:'20px', maxHeight:'600px'}} >
        <img src="https://res.cloudinary.com/marvelweb/image/upload/v1642877223/Subtract2_r6bxco.png"
        style={{objectFit:'cover',width:'90%', alignSelf:'center', justifySelf:'center' }} />
        
    </Box> */}
    </Box>
    </Paper>
)
}

export default Home;
