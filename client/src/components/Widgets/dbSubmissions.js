import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Paper, IconButton, Card, Tab, Tabs, Chip, Button, Divider} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {getSubmissionsStu} from '../../actions/dashboard.js'

const DbSubmissions = () => {
    const {submissions} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const [tab, setTab] = useState('pr');

    useEffect(() => {
        dispatch(getSubmissionsStu(tab));
    }, [tab]);

    return (
        <Paper variant='widget'  >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='widget-heading'>submissions</Typography>
        <IconButton size='small'><RefreshIcon color='secondary' /></IconButton>
        </div>
        <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        <Tab label="Project reports" value='pr'/>
        <Tab label="Blog posts" value='blog'/>
        </Tabs>
        <br/>
        <div style={{display:'grid', gridTemplateColumns:'1fr',gap:'15px'}}>
           <Card variant='outlined'>
            {/* <span style={{display : 'flex', justifyContent: 'space-between'}}>
                <Typography variant='code-small'>Project Report</Typography>
                <Chip size='small' variant='outlined' label='Level 1' />
            </span> */}
            <Typography variant='body1'>Medium sized blog heading that will extend 2 lines for sure</Typography>
            <br style={{height:'5px'}} />
            <Typography style={{color:'#c4c4c4'}} variant='caption'>
                <span>level 1</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span>3 days ago</span>
            </Typography>
            <br/><br/>
            <span style={{display:'flex',justifyContent:'space-between'}}>
                <Chip label='PENDING' color='success' size='small' variant='filled' />
                <div>
                <Button variant='text' color='secondary' size='small' >view</Button>&nbsp;&nbsp;
                <Button variant='text' color='secondary' size='small' >edit</Button>
                </div>
                </span>
        </Card> 
        <Card variant='outlined'>
            <span style={{display : 'flex', justifyContent: 'space-between'}}>
                <Typography variant='code-small'>Project Report</Typography>
                <Chip size='small' variant='outlined' label='Level 1' />
            </span>
            <br/>
            <Typography variant='body1'>Medium sized blog heading that will extend 2 lines for sure</Typography>
            <br/>
            <Typography style={{color:'#c4c4c4'}} variant='caption'>
                <span>mohammed rayan sailani</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span>3 days ago</span>
            </Typography>
            <br/><br/>
            <span style={{display:'flex',justifyContent:'space-between'}}>
                <Chip label='PENDING' color='success' size='small' variant='filled' />
                <div>
                <Button variant='text' color='secondary' size='small' >view</Button>&nbsp;&nbsp;
                <Button variant='text' color='secondary' size='small' >edit</Button>
                </div>
                </span>
        </Card> 
        <Card variant='outlined'>
            <span style={{display : 'flex', justifyContent: 'space-between'}}>
                <Typography variant='code-small'>Project Report</Typography>
                <Chip size='small' variant='outlined' label='Level 1' />
            </span>
            <br/>
            <Typography variant='body1'>Medium sized blog heading that will extend 2 lines for sure</Typography>
            <br/>
            <Typography style={{color:'#c4c4c4'}} variant='caption'>
                <span>mohammed rayan sailani</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span>3 days ago</span>
            </Typography>
            <br/><br/>
            <span style={{display:'flex',justifyContent:'space-between'}}>
                <Chip label='PENDING' color='success' size='small' variant='filled' />
                <div>
                <Button variant='text' color='secondary' size='small' >view</Button>&nbsp;&nbsp;
                <Button variant='text' color='secondary' size='small' >edit</Button>
                </div>
                </span>
        </Card> 

        </div>
        
        </Paper>
    )
}

export default DbSubmissions;
