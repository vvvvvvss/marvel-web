import { Button, Paper, Typography, Alert} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar.js';
import useStyles from './styles.js';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const {authUser} = useSelector(state => state.auth);

    return (
        <div className={classes.window}>
            <Navbar/>
            <Paper square style={{padding : '60px 15px 0px 15px',height : '1000px', }}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'200px'}}>

                <div>
                { authUser?.enrollmentStatus==='UNKNOWN' &&
                    <Alert severity="warning" fontSize='12px' icon={false}>
                    Thankyou for showing interest in UVCE Marvel. You can continue to explore
                    our Blogs, Stories, Syllabus etc. If you are expecting Dashboard access, contact us.
                  </Alert>
                }
                { ((authUser?.currentRole==='STU')||(authUser?.currentRole==='INS')) &&
               <Button variant='contained' color='primary' onClick={()=>(history.push('/dashboard'))}>
                    Go to Dashboard
                </Button>
                }
                </div>
                

                </div>
            </Paper>
        </div>
    )
}

export default Home;
