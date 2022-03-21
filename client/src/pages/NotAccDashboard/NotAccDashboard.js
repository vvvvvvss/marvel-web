import { Paper} from '@mui/material'
import DbProfile from '../../components/Widgets/dbProfile.js';
import Dial from '../../components/Widgets/SpeedDial.js';
import DbForm from '../../components/Widgets/dbForm.js';
import { Box } from '@mui/system';
import DbViewPost from '../../components/Widgets/dbViewPost.js';

const NotAccDashboard = () => {
    return (
        <>
        <Paper variant='window' sx={{padding: "85px 20px 75px 20px", display: "flex", justifyContent: "center"}}>
            <Box sx={{ display: "grid", maxWidth: "1580px", height: "max-content", 
            gridTemplateColumns:{xs:'1fr'}, gap: "20px", justifyContent: "space-evenly", 
            alignItems: "flex-start"}}>
            <DbProfile/>
            </Box>
            <DbForm/>
            <Dial/>
        </Paper>
        <DbViewPost/>
        </>
    )
}

export default NotAccDashboard;
