import { Paper } from '@mui/material';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';
import DbForm from '../../components/Widgets/dbForm.js';
import Dial from '../../components/SpeedDial.js';
import DbToReview from '../../components/Widgets/dbToReview.js';
import AcceptSwitch from '../../components/Widgets/dbAcceptSwitch';
import {Box} from "@mui/system";
import DbViewPost from '../../components/Widgets/dbViewPost.js';
import useHashParams from '../../utils/hooks/useHashParams.js';

const InsDashboard = () => {
    const params = useHashParams();
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
        {params?.mode=='form'&&<DbForm/>}
        {params?.mode=='view'&&<DbViewPost/>}
        <Dial/>
        </>
    )
}

export default InsDashboard;
