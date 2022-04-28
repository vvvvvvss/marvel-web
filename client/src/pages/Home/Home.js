import { Paper, Alert, Typography, Grow, Link, Button} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import {Box} from '@mui/system';
import { Helmet } from 'react-helmet';
import useAuth from "../../utils/hooks/useAuth.js";
import { Link as Rlink}  from 'react-router-dom';

const Home = () => {
    const {authUser} = useAuth();
    const {data, isLoading:isFeedLoading} = useQuery(
        [{nature:'feed', place:'home'}],
      ()=>getSearchFeed(
        "course",
        "",
        '',
        '',
        searchParams.get("authorName") || '',
        searchParams.get("tags") || '',
        pageParam, 
        'search'),
      {
        
      }
      );

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
    <Box sx={{display:'flex', justifyContent:'center', margin:'90px 25px'}} >
        <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',md:'2fr 3fr'}, transition:'300ms' ,
        gridTemplateRows:{xs:'2fr 3fr',md:'1fr'},maxWidth:'800px',gap:'0px',overflow:'hidden',
        justifyContent:'center',background:'linear-gradient(81.08deg, #2F2835 29.85%, #1E3236 99.51%)',
        borderRadius:'12px',boxShadow:'0px 0px 50px 0px #000'}} >
            
            <img src="https://res.cloudinary.com/marvelweb/image/upload/v1651086776/image2mrvl-min_sh7yax.png"
            style={{ objectFit:'cover',maxWidth:'100%' }} />

            <Box sx={{padding:'30px',maxHeight:'min-content',position:'relative'}} >
            
            <Typography variant='body1' sx={{color:'secondary.light'}}>
                MARVEL at University Visvesvaraya College of Engineering is poised to spur genuine passion in every learner and 
            redefine conventional education. 
            The goal is to set the ball rolling, perpetuate a sense of innovation in students. 
            With support from the&nbsp;
            <Link href='https://uvcega.org/' rel='noopener norefferer' target='_blank' >UVCE Graduates Association</Link>, 
            we hope to turn UVCE into a hub of research and innovation through MARVEL, 
            with encouragement from the college.
            </Typography>
            <Rlink to='/about' >
                <Button sx={{position:'absolute',bottom:'20px'}} variant='outlined'
                color='secondary' >
                    Read more
                </Button>
            </Rlink>
            </Box>
        </Box>
    </Box>

    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}} >
        <Typography sx={{maxWidth:'650px',textAlign:'center',fontWeight:'300'}} variant='h4'>
            Explore Courses across various Domains
        </Typography>
        <Box>

        </Box>
    </Box>
    </Box>
    </Paper>
)
}

export default Home;
