import { CircularProgress, Paper, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import InsDashboard from "./InsDashboard/InsDashboard";
import NotAccDashboard from "./NotAccDashboard/NotAccDashboard";
import StuDashboard from "./StuDashboard/StuDashboard";
import { Helmet } from "react-helmet";
import useAuth from "../utils/hooks/useAuth";

const DbStage = () => {
    const {authUser, isLoading:isAuthLoading} = useAuth();
    return( 
    <>
    <Helmet>
          <title>Dashboard | UVCE MARVEL 🚀🌘</title>
          <meta name='description' content='Your Dashboard.' />
          <meta property="og:title" content="Dashboard | UVCE MARVEL 🚀🌘" />
    </Helmet>

    <Navbar/>
    {isAuthLoading ? 
    <Paper variant="window" sx={{padding: "85px 20px 75px 20px", display: "flex", justifyContent: "center", alignItems:'center', height:'70vh', flexDirection:'column'}} >
    <Typography variant="subtitle1" sx={{color:'#a1a1a1', fontWeight:'400'}} >
        Please wait while we log you in
    </Typography>
    <CircularProgress/>
    </Paper> : 
    !authUser?.id ? 
    <Paper variant="window" sx={{padding: "85px 20px 75px 20px", display: "flex", justifyContent: "center", alignItems:'center', height:'70vh'}} >
    <Typography variant="subtitle1" sx={{color:'#a1a1a1', fontWeight:'400'}}>
        Login to access your Dashboard
    </Typography>
    </Paper> : 
    authUser?.enrollmentStatus==='UNKNOWN' ? 
    <Navigate to="/" />
    : 
    authUser?.currentRole==='STU' ?
    <StuDashboard/>
    :
    authUser?.currentRole==='INS' ? 
    <InsDashboard/>
    :
    authUser?.enrollmentStatus==="INACTIVE"&&authUser?.currentRole==="NA" ?
    <NotAccDashboard/>
    :
    <Navigate to="/" />
    }
    </>
    )
};

export default DbStage;