import { Paper, Alert, Typography, Grow, Link, Button, Skeleton} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import {Box} from '@mui/system';
import { Helmet } from 'react-helmet';
import useAuth from "../../utils/hooks/useAuth.js";
import { Link as Rlink}  from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSearchFeed } from '../../API/index.js';
import CourseCard from '../../components/CourseCard.js';

const Home = () => {
    const {authUser} = useAuth();
    const {data, isLoading:isFeedLoading} = useQuery(
        [{nature:'feed', place:'home'}],
      ()=>getSearchFeed( "course", "", '', '', '', '', '', 'search'),{onerror:()=>(alert("Something went wrong"))} );

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
    <Box sx={{width: '100%',maxWidth:'1300px',padding: '120px 0px 0px 0px'}}>
        { authUser?.enrollmentStatus==='UNKNOWN' &&
            <Alert severity="warning" fontSize='12px' icon={false}>
            Thankyou for showing interest in UVCE Marvel. You can continue to explore
            our Blogs, Stories, Syllabus etc. If you are expecting Dashboard access, contact us.
            </Alert>
        }
       <br/>
    <Box sx={{display:'flex',flexDirection:{xs:'column-reverse',md:'row'},justifyContent:'center', alignItems:'center', height:'min-content', padding:'0px 25px'}} >
        <Box sx={{width: 'fit-content'}} >
        <Typography sx={{paddingLeft:{xs:'4px',sm:'29px'}, fontSize:'14px', letterSpacing:'0.23em', fontWeight:'500', margin:{xs:'30px 0px 0px 0px',sm:'0px'}}} >UVCE's</Typography>
        <Typography sx={{maxWidth:'700px',paddingLeft:{xs:'0px',sm:'25px'}, typography:{xs:'h5',sm:'h2'}}} >Makerspace for Advanced Research, Vital Education and Learning.</Typography>
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
        <Box sx={{display:'flex',flexDirection:{xs:'column',md:'row'},
        maxWidth:'800px',overflow:'hidden',
        justifyContent:'space-between',background:'linear-gradient(81.08deg, #2F2835 29.85%, #1E3236 99.51%)',
        borderRadius:'12px',boxShadow:'0px 0px 20px #000'}} >
            
            <img src="https://res.cloudinary.com/marvelweb/image/upload/v1651086776/image2mrvl-min_sh7yax.png"
            style={{ objectFit:'cover',maxHeight:'350px' }} />

            <Box sx={{padding:'30px',maxHeight:'min-content',display:'flex',flexDirection:'column',justifyContent:'space-between'}} >
            
            <Typography variant='body1' sx={{color:'secondary.light'}}>
                MARVEL at University Visvesvaraya College of Engineering is poised to spur genuine passion in every learner and 
            redefine conventional education. 
            The goal is to set the ball rolling, perpetuate a sense of innovation in students. 
            With support from the&nbsp;
            <Link href='https://uvcega.org/' rel='noopener norefferer' target='_blank' >UVCE Graduates Association</Link>, 
            we hope to turn UVCE into a hub of research and innovation through MARVEL, 
            with encouragement from the college.
            </Typography>
            <Rlink to='/about' style={{textDecoration:'none'}} >
                <Button sx={{justifySelf:'start',alignSelf:'top',margin:'30px 20px 0px 0px'}} variant='outlined'
                color='secondary' >
                    Learn more
                </Button>
            </Rlink>
            </Box>
        </Box>
    </Box>

    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',paddingBottom:'60px',
    background:'linear-gradient(84.81deg, #1E3236 -0.41%, #2F2835 99.7%)'}} >
        <Typography sx={{maxWidth:'650px',textAlign:'center',fontWeight:'300',margin:'30px',
        fontSize:{xs:'24px',md:'32px'}}} variant='h3'>
            Explore Courses across various Domains
        </Typography>
        <Box sx={{display:'flex', overflowX:'scroll',margin:'20x',maxWidth:{xs:'100vw',md:'900px'}}} >
        {isFeedLoading ? 
        <>
            <Skeleton width={'100%'} height='300px' animation='wave' sx={{minWidth:'300px', margin:'20px'}} />
            <Skeleton width={'100%'} height='300px' animation='wave' sx={{minWidth:'300px', margin:'20px'}} />
        </>
            :
            <>
            {data?.feed?.map((c,i)=>(
                <Box sx={{padding:'10px',minWidth:'300px'}} >
                    <CourseCard course={c} key={i} />
                </Box>
            ))}
            </>
        }
        </Box>
    </Box>

    <Box sx={{width:'100%',position:'relative',display:'flex', 
    maxHeight:{xs:'max-content',md:'500px'},backgroundColor:'#000',
    flexDirection:{xs:'column',md:'row'}, }} >
        <Box sx={{padding:'40px 40px 0px 40px'}} >
            <Typography variant='h3' sx={{fontSize:{xs:'24px',md:'42px'},color:'#fafafa',fontWeight:'200'}} >
                Signin with Registered account to 
                access your Dashboard, Resource articles and much more.
            </Typography>
            <Rlink to={'/dashboard'} style={{textDecoration:'none'}} >
            <Button variant='outlined' color='secondary' sx={{marginTop:'30px'}} >
                Dashboard
            </Button>
            </Rlink>
            
        </Box>
        <img src="https://res.cloudinary.com/marvelweb/image/upload/v1651170242/dbshot-min_vwc2ig.png"
            style={{maxWidth:'600px',maxHeight:'100%',objectFit:'contain',padding:'40px 30px 0px 30px'}} />
    </Box>
    <Box component={'footer'} sx={{backgroundColor:'#121212',padding:'30px',display:'grid',
    gridTemplateColumns:{xs:'1fr',md:'1fr 1fr 1fr'},justifyItems:'center'}} >
            <a href='https://uvce.ac.in/' target='_blank' rel="noopener norefferer" style={{margin:'30px'}} >
            <img src='https://uvce.ac.in/img/logo_2x.png' width='180px' alt="UVCE" />
            </a>
            <a href='https://uvcega.org/' target='_blank' rel="noopener norefferer" style={{margin:'30px'}}>
            <img src='https://uvcega.org/images/uvcega_logo.png' width='180px' alt="UVCE Graduates Association" />
            </a>
            <a href='http://www.visionuvce.in/' target='_blank' rel="noopener norefferer" style={{margin:'30px'}}>
            <img src='http://www.visionuvce.in/wp-content/uploads/2016/01/vu_logo.png' alt="Vision UVCE" width='180px' style={{backgroundColor:'#6b99d6'}} />
            </a>
    </Box>
    </Box>
    </Paper>
)
}

export default Home;
