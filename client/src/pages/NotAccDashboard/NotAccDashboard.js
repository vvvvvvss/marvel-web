import { Paper} from '@mui/material'
import Navbar from '../../components/Navbar/Navbar.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import Dial from '../../components/SpeedDial.js';
import DbForm from '../../components/Widgets/dbForm.js';
import { useSelector} from 'react-redux';
import { Box } from '@mui/system';

const NotAccDashboard = () => {
    const {formOpen} = useSelector(state => state.dashboard);

    return (
        <>
        <Navbar/>
        <Paper variant='window' sx={{padding: "85px 20px 75px 20px", display: "flex", justifyContent: "center"}}>
            <Box sx={{ display: "grid", maxWidth: "1580px", height: "max-content", 
            gridTemplateColumns:{xs:'1fr'}, gap: "20px", justifyContent: "space-evenly", 
            alignItems: "flex-start"}}>
            <DbProfile/>
            </Box>

            { formOpen && <DbForm/>}

            <Dial/>
        </Paper>
        </>
    )
}

export default NotAccDashboard;
