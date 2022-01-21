import { Paper } from '@mui/material';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';
import DbForm from '../../components/Widgets/dbForm.js';
import Dial from '../../components/SpeedDial.js';
import { useSelector } from 'react-redux';
import DbToReview from '../../components/Widgets/dbToReview.js';
import AcceptSwitch from '../../components/Widgets/dbAcceptSwitch';
import {Box} from "@mui/system";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const InsDashboard = () => {
    const {formOpen} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch({type:'CLEAR_DASHBOARD'});
        }
    }, []);

    return (
        <>
        <Paper variant='window' sx={{padding: "85px 20px 75px 20px", display: "flex", justifyContent: "center"}}>
            <Box sx={{ display: "grid", maxWidth: "1580px", height: "max-content", 
            gridTemplateColumns:{xs:'1fr', lg:'1fr 1fr 1fr',xl:'1fr 2fr 1fr'} , gap: "20px", justifyContent: "space-evenly", 
            alignItems: "flex-start"}}>
            <DbToReview/>
            <Box sx={{ display: "grid",height: "max-content", 
            gridTemplateColumns:{xs:'1fr',xl:'1fr 1fr'} , gap: "20px", justifyContent: "space-evenly", 
            alignItems: "flex-start"}}>
            <AcceptSwitch/>
            <DbSubmissions/>
            </Box>
            <DbProfile/>
            </Box>
        </Paper>

        {formOpen &&  <DbForm/> }

        <Dial/>
        </>
    )
}

export default InsDashboard;
