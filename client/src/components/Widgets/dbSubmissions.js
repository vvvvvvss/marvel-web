import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Paper, IconButton, Card, Tab, Tabs, Chip, Button, Pagination} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {getSubmissionsStu} from '../../actions/dashboard.js'

const DbSubmissions = () => {
    const {submissions} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const [tab, setTab] = useState('pr');
    const [page , setPage] = useState(1);

    useEffect(() => {
        dispatch(getSubmissionsStu(tab, page));
    }, [tab, page]);

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
        {tab==='blog' && 
        <Pagination count={5} variant="outlined" page={page} 
        color="secondary" onChange={(e, page)=>(setPage(page))}
        style={{justifySelf:'center'}}/>}
        </div>
        
        </Paper>
    )
}

export default DbSubmissions;
