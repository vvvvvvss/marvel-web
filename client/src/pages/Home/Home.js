import { Paper, Alert, Typography, Grow} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import { useSelector } from 'react-redux';
import {Box, maxHeight} from '@mui/system'

const Home = () => {
    const authUser = useSelector(state => state.auth.authUser);
return (
    //entire screen
    <Paper square sx={{minHeight:'100vh', display:'flex',justifyContent:'center',maxWidth:'100vw',overflowX:'hidden',backgroundColor:'#031117'}}>
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
    <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',md:'1fr 1fr'}, gridTemplateRows:{xs:'1fr 1fr',md:'1fr'}, backgroundColor:'#3C1C55', margin:'90px -20px 0px -20px', gap:'20px', maxHeight:'450px'}} >
        <img src="https://res.cloudinary.com/marvelweb/image/upload/v1642877223/Subtract2_r6bxco.png"
        style={{objectFit:'cover',width:'100%', height:'100%' }} />
        <Box sx={{padding:'60px 50px 30px 30px', overflowY:'scroll'}}  >
            <Typography variant='subtitle1' sx={{color:'secondary.light'}} >
            <span style={{fontSize:'60px', lineHeight:'0px', fontWeight:'400'}} >M</span>akerspace for Advanced Research, Vital Education and Learning or simply, MARVEL at University Visvesvaraya College of Engineering is being set up at the KR Circle campus with support from the UVCE Graduates Association. Having a determined aim in mind, we hope to turn UVCE into a hub of research and innovation through MARVEL, with encouragement from the college.
            <br/><br/>
            MARVEL is poised to spur genuine passion in every learner, inspire decisive action, and redefine conventional education. The goal of MARVEL is to set the ball rolling, perpetuate a sense of innovation in students and help them eventually birth ground-breaking ideas that will change the world.
            <h3>G O A L S</h3>
              <li>Encourage students to learn on the current trending topics apart from the regular academics and work on projects/experiments to understand them in a practical manner.</li>
              <li>Initiate collaboration among students of different branches, but with similar interests.</li>
              <li>Build an ecosystem in the college where the next generation of innovators can be moulded.</li>
              <li>Develop a plan to make MARVEL sustainable for a long-time with limited resources. Build an independent structure, document every outcome and create a brand for showcasing the talent.</li>
              <li>With the help of alumni and faculty, work on industry and academia collaboration for setting up specific R&amp;D hubs as part of MARVEL.</li>
            </Typography>
        </Box>
    </Box>
    </Box>
    </Paper>
)
}

export default Home;
