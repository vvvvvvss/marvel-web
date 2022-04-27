import { Paper, Alert, Typography, Grow, Card} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import {Box} from '@mui/system';
import { Helmet } from 'react-helmet';
import useAuth from "../../utils/hooks/useAuth.js";

const Home = () => {
    const {authUser} = useAuth();
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
    <Box sx={{display:'flex',flexDirection:{xs:'column-reverse',md:'row'},justifyContent:'center', alignItems:'center', height:'min-content', padding:'0px 25px'}} >
        <Box sx={{width: 'fit-content'}} >
        <Typography sx={{paddingLeft:{xs:'4px',sm:'29px'}, fontSize:'14px', letterSpacing:'0.23em', fontWeight:'500', margin:{xs:'20px 0px 10px 0px',sm:'0px'}}} >UVCE's</Typography>
        <Typography sx={{maxWidth:'700px',paddingLeft:{xs:'0px',sm:'25px'}, typography:{xs:'h4',sm:'h2'}}} >Makerspace for Advanced Research, Vital Education and Learning.</Typography>
        <Typography sx={{paddingLeft:{xs:'4px',sm:'29px'}, fontSize:'14px', letterSpacing:'0.23em', fontWeight:'400', marginTop:{xs:'10px',sm:'8px'}, color:'secondary.light'}}>
            <span style={{color:'#a1a1a1'}} >AKA</span>&nbsp;MARVEL
        </Typography>
        </Box>
        <Grow in timeout={1500} >
        <img src="https://res.cloudinary.com/marvelweb/image/upload/v1650566761/home1_g8pqnt.png" loading='eager'
        style={{ alignSelf:'center', maxWidth:'400px',height:'400px',maxWidth:'80vw'}} />
        </Grow>
    </Box>
    {/* <Box sx={{display:'flex', justifyContent:{xs:'space-between',md:'center'},flexDirection:{xs:'column',md:'row'}, margin:'60px 25px'}} >
        <img src="https://res.cloudinary.com/marvelweb/image/upload/v1651089704/6ea9d0_460cc6be6f4642469c3d23c8baf0d7a3_mv2_gs9c0t.jpg"
        style={{ aspectRatio:'1 / 1', padding:{xs:'30px',md:'30px 0px'},
        maxWidth:'400px',objectFit:'cover'}} />
        <Box sx={{padding:'30px',
        maxWidth:'400px',maxHeight:'400px'}} >
            
            <Typography variant='body1' sx={{color:'secondary.light'}}>
                MARVEL is poised to spur genuine passion in every learner and 
            redefine conventional education. 
            The goal is to set the ball rolling, perpetuate a sense of innovation in students. 
            With support from the UVCE Graduates Association, 
            we hope to turn UVCE into a hub of research and innovation through MARVEL, 
            with encouragement from the college.
            </Typography>
        </Box>
    </Box> */}
    {/* <Box sx={{height:'200px'}} >

    </Box> */}
    </Box>
    </Paper>
)
}

export default Home;
