import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Paper, IconButton, Card, Tab, Tabs, Chip, Button, Pagination, CircularProgress} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {getSubmissionsStu} from '../../actions/dashboard.js';
import moment from 'moment';

const DbSubmissions = () => {
    const {submissions, isSubLoading} = useSelector(state => state.dashboard);
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
        { isSubLoading ? <CircularProgress/> :

        <div style={{display:'grid', gridTemplateColumns:'1fr',gap:'15px'}}>
        {tab==='pr' ? 
        <> 
        {!submissions?.prs?.length ? 
        <Typography variant='caption' >You have not submitted any project reports for this level</Typography> :
        <div>
        {submissions?.prs?.map((sub)=>(
        <div key={sub?.slug}> <Card variant='outlined'>
            <Typography variant='body1'>{sub?.title}</Typography>
            <br style={{height:'5px'}} />
            <Typography style={{color:'#c4c4c4'}} variant='caption'>
                <span>{`Level ${sub?.level}`}</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span>{moment(sub?.createdAt).fromNow()}</span>
            </Typography>
            <br/><br/>
            <span style={{display:'flex',justifyContent:'space-between'}}>
                <Chip label={sub?.reviewStatus} color='success' size='small' variant='filled' />
                <div>
                <Button variant='text' color='secondary' size='small' >view</Button>&nbsp;&nbsp;
                <Button variant='text' color='secondary' size='small' >edit</Button>
                </div>
                </span>
        </Card> <br/> </div>
        ))} </div>}
        </>
         : 
        <> 
        { !submissions?.blogs?.length ? 
        <Typography variant='caption' >You dont have any blog post submissions</Typography>
         :
        <div>
        {submissions?.blogs?.map((sub)=>(
            <div key={sub?.slug}><Card variant='outlined'>
            <Typography variant='body1'>{sub?.title}</Typography>
            <br style={{height:'5px'}} />
            <Typography style={{color:'#c4c4c4'}} variant='caption'>
                <span>{moment(sub?.createdAt).fromNow()}</span>
            </Typography>
            <br/><br/>
            <span style={{display:'flex',justifyContent:'space-between'}}>
                <Chip label={sub?.reviewStatus} color='success' size='small' variant='filled' />
                <div>
                <Button variant='text' color='secondary' size='small' >view</Button>&nbsp;&nbsp;
                <Button variant='text' color='secondary' size='small' >edit</Button>
                </div>
                </span>
            </Card> <br/></div>
        ))}</div>}
        </>}
        
        {tab==='blog' && 
        <Pagination count={submissions?.total} variant="outlined" page={page} 
        color="secondary" onChange={(e, page)=>(setPage(page))}
        style={{justifySelf:'center'}}/>}
        </div>}
        
        </Paper>
    )
}

export default DbSubmissions;
