import { Chip, Paper, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar.js';
import Syllabus from '../../components/Widgets/dbLandT.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import styles from './dashboard.module.css';

const StuDashboard = () => {
    return (
        <>
        <Navbar/>
        <div className={styles.window}>
            <div className={styles.grid}>
            <Syllabus/>
            <Paper variant='widget' style={{height:'250px'}}>
                <Typography variant='widget-heading'>Student dashboard</Typography>
            </Paper>
            <DbProfile/>
            </div>
        </div>
            
        </>
    )
}

export default StuDashboard
