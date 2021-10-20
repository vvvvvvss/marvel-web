import { Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import useStyles from './styles.js';

const Home = () => {
    const classes = useStyles();

    return (
        <div square className={classes.window}>
            <Navbar/>
            <div style={{marginTop : '60px', backgroundColor : '#313131', height : '1000px'}}>
                
            </div>
        </div>
    )
}

export default Home;
