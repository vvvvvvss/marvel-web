import { Paper,Backdrop,SpeedDial,SpeedDialAction, Dialog, Slide} from '@mui/material'
import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar.js';
import Syllabus from '../../components/Widgets/dbLandT.js';
import DbProfile from '../../components/Widgets/dbProfile.js';
import DbProgress from '../../components/Widgets/dbProgress.js';
import DbForm from '../../components/Widgets/dbForm.js';
import styles from './dashboard.module.css';
import BookIcon from '@mui/icons-material/AutoStories';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector } from 'react-redux';

const StuDashboard = () => {
    const [dial, setDial] = useState(false);
    const {syllabus} = useSelector(state => state.dashboard);
    const [formOpen, setFormOpen] = useState(false);
    const [type, setType] = useState('');

    return (
        <>
        <Navbar/>
        <Paper variant='window' className={styles.window}>
            <div className={styles.grid}>
            <Syllabus/>
            <DbProgress/>
            <DbProfile/>
            </div>

            <Dialog fullScreen open={formOpen} onClose={()=>(setFormOpen(false))}>
                <DbForm setFormOpen={setFormOpen} type={type}/>
            </Dialog>

            <Backdrop open={dial} />
            <SpeedDial
                ariaLabel="start writing"
                sx={{ position: 'fixed', bottom: 25, right: 25  }}
                icon={<><CreateIcon/>&nbsp;&nbsp;write</>} 
                FabProps={{variant:'extended'}}
                onClose={()=>(setDial(false))}
                onOpen={()=>(setDial(true))}
                open={dial}
            >
                <SpeedDialAction
                    tooltipTitle={`Blog`}
                    tooltipOpen sx={{whiteSpace : 'nowrap'}}
                    icon={<BookIcon/>}
                    onClick={()=>{setType('BLOG');setFormOpen(true);}}
                />
                 {syllabus?.submissionStatus?.isAccepting &&
                  <SpeedDialAction
                    tooltipTitle={`Project Report Lvl ${syllabus?.submissionStatus?.forLevel}`}
                    tooltipOpen  sx={{whiteSpace : 'nowrap'}}
                    icon={<AssignmentIcon/>}
                    onClick={()=>{setType('PR');setFormOpen(true);}}
                />}
            </SpeedDial>
        </Paper>
        
        </>
    )
}

export default StuDashboard
