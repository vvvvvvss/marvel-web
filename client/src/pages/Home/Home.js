import { Button, Paper, Typography} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import useStyles from './styles.js';
import {Link} from 'react-router-dom';

const Home = () => {
    const classes = useStyles();

    return (
        <div square className={classes.window}>
            <Navbar/>
            <div style={{marginTop : '60px', backgroundColor : '#313131', height : '1000px'}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'200px'}}>
                <Link to='/dashboard' style={{textDecoration : 'none'}}>
                <Button variant='outlined'>
                    Go to Dashboard
                </Button>
                </Link>
                
                </div>
            </div>
        </div>
    )
}

export default Home;
