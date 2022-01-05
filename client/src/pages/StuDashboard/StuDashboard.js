import { Paper} from '@mui/material'
import Navbar from '../../components/Navbar/Navbar.js';
import Syllabus from '../../components/Widgets/dbLandT.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbProgress from '../../components/Widgets/dbProgress.js';
import Dial from '../../components/SpeedDial.js';
import DbForm from '../../components/Widgets/dbForm.js';
import styles from './dashboard.module.css';
import { useSelector} from 'react-redux';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';
import { Box } from '@mui/system';

const StuDashboard = () => {
    const {formOpen} = useSelector(state => state.dashboard);

    return (
        <>
        <Navbar/>
        <Paper variant='window' className={styles.window}>
            <Box sx={{ display: "grid", maxWidth: "1300px", height: "max-content", 
            gridTemplateColumns:{xs:'1fr',md:'1fr 1fr', lg:'1fr 1fr 1fr',xl:'1fr 1fr 1fr 1fr'} , gap: "20px", justifyContent: "space-evenly", 
            alignItems: "flex-start"}}>
            <Syllabus/>
            <div className={styles.singlegrid} >
            <DbProgress/>
            <DbSubmissions />
            </div>
            <DbProfile/>
            </Box>

            { formOpen && <DbForm/>}

            <Dial/>
        </Paper>
        </>
    )
}

export default StuDashboard
