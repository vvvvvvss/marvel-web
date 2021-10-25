import { Chip, Paper, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar.js';
import Syllabus from '../../components/Widgets/Syllabus.js';
import styles from './dashboard.module.css';

const StuDashboard = () => {
    return (
        <>
        <Navbar/>
        <div className={styles.window}>
            <div className={styles.grid}>
            <Syllabus/>
            <Paper variant='widget' style={{height:'250px'}}>
                <Typography>Student dashboard</Typography>
            </Paper>
            <Paper variant='widget' style={{height:'100px'}}>
                <Typography>Student dashboard</Typography>
            </Paper>
            <Paper variant='widget' style={{height:'500px'}}>
                <Typography>Student dashboard</Typography>
            </Paper>
            </div>
        </div>
            
        </>
    )
}

export default StuDashboard
