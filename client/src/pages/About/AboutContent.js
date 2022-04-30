import { Typography, Paper, Divider } from "@mui/material";
import {Box} from "@mui/system"

const AboutContent = () => {
  return (
    <>
    <Paper sx={{maxWidth: '700px', display:'flex',flexDirection:'column',padding:'30px'}} >
        <Typography variant="widget-heading" 
        sx={{letterSpacing:'0.3em',color:'#a1a1a1'}} >ABOUT</Typography>
        <br/>
        <Divider/>
        <br/>
        <Typography variant="body1" sx={{lineHeight:'1.6'}} >
        Makerspace for Advanced Research, Vital Education and Learning or simply, 
        MARVEL at University Visvesvaraya College of Engineering is being set up 
        at the KR Circle campus with support from the UVCE Graduates Association. 
        Having a determined aim in mind, we hope to turn UVCE into a hub of research 
        and innovation through MARVEL, with encouragement from the college.
        MARVEL is poised to spur genuine passion in every learner, inspire decisive 
        action, and redefine conventional education. The goal of MARVEL is to set the 
        ball rolling, perpetuate a sense of innovation in students and help them 
        eventually birth ground-breaking ideas that will change the world.
        </Typography>
        <br/>
        <Divider/>
        <br/>
        <Typography variant='h5'  >GOALS</Typography><br/>
        <Typography variant="body1" sx={{lineHeight:'1.6'}}  >
        <li>
          Encourage students to learn on the current trending topics apart from the regular academics and work on projects/experiments to understand them in a practical manner.
        </li><br/>
        <li>
          Initiate collaboration among students of different branches, but with similar interests.
        </li><br/>
        <li>
          Build an ecosystem in the college where the next generation of innovators can be molded.
        </li><br/>
        <li>
        Develop a plan to make MARVEL sustainable for a long-time with limited resources. Build an independent structure, document every outcome and create a brand for showcasing the talent.
        </li><br/>
        <li>
        With the help of alumni and faculty, work on industry and academia collaboration for setting up specific R&D hubs as part of MARVEL.
        </li><br/>
        </Typography>
        <Divider/><br/>
        <Typography variant='h5'  >STRUCTURE</Typography><br/>
        <Typography variant="body1" sx={{lineHeight:'1.6'}}  >
        One Faculty Advisor, Dr P Deepa Shenoy and 2 Faculty 
        Co-Ordinators Dr Triveni and Dr H S Veena 
        along with 2 Alumni Co-Ordinators Satish and Lomesh<br/><br/>
        There will be student co-ordinators for each domain and 
        instructions/schedule will be shared to students.<br/><br/>
        Registrations will be open for students every 6 months 
        once and the batches will be shortlisted by the MARVEL team
        </Typography>
        <br/><br/><br/>
    <Box component={'footer'} sx={{padding:'30px',display:'grid',margin:'-30px',
    gridTemplateColumns:{xs:'1fr',md:'1fr 1fr 1fr'},justifyItems:'center'}} >
            <a href='https://uvce.ac.in/' target='_blank' rel="noopener norefferer" style={{margin:'30px'}} >
            <img src='https://uvce.ac.in/img/logo_2x.png' width='180px' />
            </a>
            <a href='https://uvcega.org/' target='_blank' rel="noopener norefferer" style={{margin:'30px'}}>
            <img src='https://uvcega.org/images/uvcega_logo.png' width='180px' />
            </a>
            <a href='http://www.visionuvce.in/' target='_blank' rel="noopener norefferer" style={{margin:'30px'}}>
            <img src='http://www.visionuvce.in/wp-content/uploads/2016/01/vu_logo.png' width='180px' style={{backgroundColor:'#6b99d6'}} />
            </a>
    </Box>
    </Paper>
    
    </>
  )
}

export default AboutContent