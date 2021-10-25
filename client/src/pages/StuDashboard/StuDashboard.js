import { Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar.js';
import styles from './dashboard.module.css';

const StuDashboard = () => {
    return (
        <>
        <Navbar/>
        <div className={styles.window}>
             <Typography>Student dashboard</Typography>   
        </div>
            
        </>
    )
}

export default StuDashboard
