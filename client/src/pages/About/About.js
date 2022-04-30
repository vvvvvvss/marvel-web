import { CircularProgress, Paper } from "@mui/material";
import { lazy, Suspense } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
const AboutContent = lazy(()=>(import("./AboutContent.js")));

const About = () => {
  return (
    <>
    <Navbar/>
    <Paper sx={{width:'100vw',minHeight:'100vh',paddingTop:'120px',
   display:'flex',justifyContent:'center'}}>
    <Suspense fallback={<CircularProgress/>} >
    <AboutContent/>
    </Suspense>
    </Paper>
    </>
  )
}

export default About