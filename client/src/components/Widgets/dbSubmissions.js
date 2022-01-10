import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Paper, Tab, Tabs, Pagination, CircularProgress} from "@mui/material";
import {getSubmissions} from '../../actions/dashboard.js';
import DbViewPost from "./dbViewPost.js";
import DbEditPost from "./dbEditPost.js";
import { Box } from "@mui/system";
import PostCard from '../PostCard.js'

const DbSubmissions = () => {
    const {submissions, isSubLoading, viewPostOpen, editPostOpen} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [tab, setTab] = useState(authUser?.currentRole==='STU' ? 'pr' : 'rsa');
    const [page , setPage] = useState(1);
    
    useEffect(() => {
        dispatch(getSubmissions(tab, page));
    }, [tab, page]);

    return (
    <>
        <Paper variant='widget'  >
        <Typography variant='widget-heading'>submissions</Typography>
        <br/><br/>
        <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
        {(authUser?.currentRole==='STU'||authUser?.enrollmentStatus==="INACTIVE") && 
        <Tab label="Project reports" value='pr'/>
        }
        {(authUser?.currentRole==='INS'||authUser?.enrollmentStatus==="INACTIVE") && 
         <Tab label="Res Articles" value='rsa'/>
         }
        <Tab label="Blog posts" value='blog'/>
        </Tabs>
        <br/>
        { isSubLoading ? <CircularProgress/> :

        <div style={{display:'grid', gridTemplateColumns:'1fr',gap:'15px'}}>

        {!submissions?.[tab==='pr' ? 'prs' : 'others']?.length ? 
        <Typography variant='caption'>
        {`You have not submitted any ${tab==='pr' ? 'Project Reports' : tab==='blog' ? 'Blog Posts' : 'Resource Articles'}${((tab==='pr' || tab==='rsa')&&authUser?.enrollmentStatus==='ACTIVE') ? ' for this Course' : ''}.`}
        </Typography> :
        <Box sx={{display:'grid', gridTemplateColumns: '1fr', gap:'15px'}}  >
        {submissions?.[tab==='pr' ? 'prs' : 'others']?.map((sub, i)=>(
            <PostCard type={tab} post={sub} scope='dashboard' variant='smol' key={i} />
        ))} </Box>}
         
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
