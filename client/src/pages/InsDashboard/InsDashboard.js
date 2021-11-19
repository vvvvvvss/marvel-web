import { Typography, Paper } from '@mui/material';
import styles from './dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar.js';
import DbProfile from '../../components/Widgets/dbProfile';

const InsDashboard = () => {
    return (
        <div>
            <>
        <Navbar/>
        <Paper variant='window' className={styles.window}>
            <div className={styles.grid}>
            <DbProfile/>
            </div>
        </Paper>
        
        </>
        </div>
    )
}

export default InsDashboard;
