import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Paper, Card, Tab, Tabs, Chip, Button, Pagination, CircularProgress} from "@mui/material";
import {getSubmissions} from '../../actions/dashboard.js';
import DbViewPost from "./dbViewPost.js";
import moment from 'moment';
import DbEditPost from "./dbEditPost.js";

const DbSubmissions = () => {
    const {submissions, isSubLoading, viewPostOpen, editPostOpen} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [tab, setTab] = useState(authUser?.currentRole==='STU' ? 'pr' : 'rsa');
    const [page , setPage] = useState(1);
    
    useEffect(() => {
        dispatch(getSubmissions(tab, page, authUser?.currentRole));
    }, [tab, page, authUser]);

    const colorDecide = (status) => {
        if(status==='PENDING') return 'warning';
        else if (status==='FLAGGED') return 'error';
        else if (status==='APPROVED' || 'FEATURED') return 'success';
    }
    return (
    <>
        <Paper variant='widget'  >
        <Typography variant='widget-heading'>submissions</Typography>
        <br/><br/>
        <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        {authUser?.currentRole==='STU' ?
         <Tab label="Project reports" value='pr'/> : 
         <Tab label="Res Articles" value='rsa'/> 
         }
        <Tab label="Blog posts" value='blog'/>
        </Tabs>
        <br/>
        { isSubLoading ? <CircularProgress/> :

        <div style={{display:'grid', gridTemplateColumns:'1fr',gap:'15px'}}>

        {!submissions?.[`${tab}s`]?.length ? 
        <Typography variant='caption'>
        {`You have not submitted any ${tab==='pr' ? 'Project Reports' : tab==='blog' ? 'Blog Posts' : 'Resource Articles'}${(tab==='pr' || tab==='rsa') ? ' for this Course' : ''}.`}
        </Typography> :
        <div>
        {submissions?.[`${tab}s`]?.map((sub)=>(
        <div key={sub?.slug}> 
        <Card variant='outlined'>
            <Typography variant='body1'>{sub?.title}</Typography>
            <br style={{height:'5px'}} />
            <Typography style={{color:'#c4c4c4'}} variant='caption'>
                {(tab==='pr' || tab==='rsa') && 
                <><span>{`${tab==='pr'?'Level':''} ${sub?.[tab==='pr' ? 'level' : 'courseCode']}`}</span>
                &nbsp;&nbsp; | &nbsp;&nbsp;</>}
                <span>{moment(sub?.createdAt).fromNow()}</span>
            </Typography>
            <br/><br/>
            <span style={{display:'flex',justifyContent:'space-between'}}>
            {(tab==='pr'||tab==='blog') ? 
            <Chip label={sub?.reviewStatus} color={colorDecide(sub?.reviewStatus)} size='small' variant='filled'/> 
            :
            <Chip label={'PUBLIC'} color={'success'} size='small' variant='filled'/>}
            <div>
            <Button variant='text' color='secondary' size='small' 
            onClick={()=>{dispatch({type:'SET_VIEW_ID',payload:{id: sub?.slug, type: tab.toUpperCase()}});dispatch({type:'OPEN_VIEW'});}}>
                view
            </Button>&nbsp;&nbsp;
            <Button variant='text' color='secondary' size='small' 
            onClick={()=>{dispatch({type:'SET_EDIT_ID',payload:{id: sub?.slug, type: tab.toUpperCase()}});dispatch({type:'OPEN_EDIT'})}}
            >
                edit
            </Button>
            </div>
            </span>
        </Card> <br/> 
        </div>
        ))} </div>}
         
        {(tab==='blog'|| tab==='rsa') && 
        <Pagination count={submissions?.total} variant="outlined" page={page} 
        color="secondary" onChange={(e, page)=>(setPage(page))}
        style={{justifySelf:'center'}}/>}
        </div>} 
        </Paper>
        {viewPostOpen && <DbViewPost/>}
        {editPostOpen && <DbEditPost/>}
    </>
    )
}

export default DbSubmissions;
