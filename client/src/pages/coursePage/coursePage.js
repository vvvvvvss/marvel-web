import { Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import useStyles from './styles.js';
import { useParams, useHistory } from 'react-router-dom';

const CoursePage = () => {
    const styles = useStyles();
    const {id} = useParams();
    const history = useHistory();
    return (
        <div>
        <Navbar/>
        <Paper variant='window' sx={{padding: '85px', maxWidth:'1300px'}}>
        {/* HERO STARTS HERE */}
        <Paper sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', maxHeight:'100vh'}}>
            <Paper sx={{backgroundColor: '#350006'}}>
            <Typography>AI-ML-001</Typography>
            </Paper>
            <Paper>

            </Paper>
        </Paper>
        </Paper>
        </div>
    )
}

export default CoursePage
