import { Paper, Dialog} from '@mui/material'
import {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar.js';
import Syllabus from '../../components/Widgets/dbLandT.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbProgress from '../../components/Widgets/dbProgress.js';
import Dial from '../../components/SpeedDial.js';
import DbForm from '../../components/Widgets/dbForm.js';
import styles from './dashboard.module.css';
import { useSelector} from 'react-redux';
import DbSubmissions from '../../components/Widgets/dbSubmissions.js';

const StuDashboard = () => {
    const {formOpen} = useSelector(state => state.dashboard);

    return (
        <>
        <Navbar/>
        <Paper variant='window' className={styles.window}>
            <div className={styles.grid}>
            <Syllabus/>
            <div className={styles.singlegrid} >
            <DbProgress/>
            <DbSubmissions />
            </div>
            <DbProfile/>
            </div>

            { formOpen && <DbForm/>}

            <Dial/>
        </Paper>
        
        </>
    )
}

export default StuDashboard
