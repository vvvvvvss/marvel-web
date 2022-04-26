import { Paper} from '@mui/material'
import Syllabus from '../../components/Widgets/dbLandT.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbProgress from '../../components/Widgets/dbProgress.js';
import Dial from '../../components/Widgets/SpeedDial.js';
import DbForm from '../../components/Widgets/dbForm.js';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';
import { Box } from '@mui/system';
import DbViewPost from '../../components/Widgets/dbViewPost.js';

const StuDashboard = () => {

    return (
        <>
        <Paper variant='window' sx={{padding: "85px 20px 75px 20px", display: "flex", justifyContent: "center"}}>
            <Box sx={{ display: "grid", maxWidth: "1580px", height: "max-content", 
            gridTemplateColumns:{xs:'1fr', lg:'1fr 1fr 1fr',xl:'1fr 2fr 1fr'}, gap: "20px", justifyContent: "space-evenly", 
            alignItems: "flex-start"}}>
            <Syllabus/>
            <Box sx={{ display: "grid",height: "max-content", 
            gridTemplateColumns:{xs:'1fr',xl:'1fr 1fr'}, gap: "20px",
            alignItems: "flex-start"}} >
            <DbProgress/>
            <DbSubmissions/>
            </Box>
            <DbProfile/>
            </Box>

            <DbForm/>
            <DbViewPost/>
            <Dial/>
        </Paper>
        </>
    )
}

export default StuDashboard;
