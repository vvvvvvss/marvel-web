import { Typography, Paper } from "@mui/material"
import RenderMarkdown from "../../components/RenderMarkdown"

const AboutContent = () => {
  return (
    <>
    <Paper sx={{maxWidth: '1000px'}} >
        <Typography variant="widget-heading" sx={{letterSpacing:'0.3em'}} >ABOUT</Typography>
        <RenderMarkdown content={
            `
            Makerspace for Advanced Research, Vital Education and Learning or simply, 
            MARVEL at University Visvesvaraya College of Engineering is being set up 
            at the KR Circle campus with support from the UVCE Graduates Association. 
            Having a determined aim in mind, we hope to turn UVCE into a hub of research
            and innovation through MARVEL, with encouragement from the college.
            \n
            
            MARVEL is poised to spur genuine passion in every learner, inspire decisive action, 
            and redefine conventional education. The goal of MARVEL is to set the ball rolling, 
            perpetuate a sense of innovation in students and help them eventually birth 
            ground-breaking ideas that will change the world.
    
            ##Goals
             - Encourage students to learn on the current trending topics apart from the regular academics and work on projects/experiments to understand them in a practical manner.
             - Initiate collaboration among students of different branches, but with similar interests.
             - Build an ecosystem in the college where the next generation of innovators can be moulded.
             - Develop a plan to make MARVEL sustainable for a long-time with limited resources. Build an independent structure, document every outcome and create a brand for showcasing the talent.
             - With the help of alumni and faculty, work on industry and academia collaboration for setting up specific R&D hubs as part of MARVEL.
    
            `
        } >
        
            
        </RenderMarkdown>
    </Paper>
    </>
  )
}

export default AboutContent