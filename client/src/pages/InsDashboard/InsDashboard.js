import { Paper } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';
import DbForm from '../../components/Widgets/dbForm.js';
import Dial from '../../components/SpeedDial.js';
import { useSelector } from 'react-redux';
import DbToReview from '../../components/Widgets/dbToReview.js';
import AcceptSwitch from '../../components/Widgets/dbAcceptSwitch';
import {Box} from "@mui/system";

const InsDashboard = () => {
    const {formOpen} = useSelector(state => state.dashboard);

    return (
        <div>
        <Navbar/>
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
        </div>
    )
}

export default InsDashboard;
