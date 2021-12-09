import { Typography, Paper } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileData } from "../../actions/dashboard.js";

const ProfilePage = () => {
    const location = useLocation();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {overview, isOverviewLoading} = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(getProfileData(id, 'page'));
    }, [id])

    return (
    <div>
    <Navbar/>
    <Paper square elevation={0} sx={{display:'flex',justifyContent:'center', width:'100vw',backgroundColor:'#121212',minHeight:'100vh'}}>
        <Paper square elevation={0} sx={{backgroundColor: '#2B0F12', padding:'85px 20px 20px 30px', position:'relative', display:'flex',maxHeight:'350px',maxWidth:'1300px',width:'100%'}}>
        <Typography variant='h1'>{id}</Typography>
        </Paper>
    </Paper>
        </div>
    )
}

export default ProfilePage;
