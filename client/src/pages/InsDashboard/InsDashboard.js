import { Typography, Paper } from '@mui/material';
import styles from './dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';
import DbForm from '../../components/Widgets/dbForm.js';
import Dial from '../../components/SpeedDial.js';
import { useSelector } from 'react-redux';
import DbToReview from '../../components/Widgets/dbToReview.js';

const InsDashboard = () => {
    const {formOpen} = useSelector(state => state.dashboard);

    return (
        <div>
        <Navbar/>
        <Paper variant='window' className={styles.window}>
            <div className={styles.grid}>
            <DbToReview/>
            <DbSubmissions/>
            <DbProfile/>
            </div>
        </Paper>

        {formOpen &&  <DbForm/> }

        <Dial/>
        </div>
    )
}

export default InsDashboard;
