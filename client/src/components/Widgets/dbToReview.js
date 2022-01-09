import { Paper, Typography, Tab, Tabs, Skeleton, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getToReview} from '../../actions/dashboard.js';
import PostCard from '../PostCard.js';

const DbToReview = () => {
    const dispatch = useDispatch();
    const { toReview, isToReviewLoading } = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const [tab, setTab] = useState('pr');
    const [page, setPage] = useState(1);
    const [courseFilter, setCourseFilter] = useState([]);

    useEffect(() => {
        dispatch(getToReview(tab, page, courseFilter));
    }, [tab, page, courseFilter]);
    
    return (
        <div>
        <Paper variant="widget" height="420px">
            <Typography variant="widget-heading">review</Typography>
            <br/><br/>
            <Tabs variant='fullWidth' textColor='inherit' value={tab} onChange={(e, value)=>(setTab(value))}>
            <Tab label="Project reports" value='pr'/>
            <Tab label="Blog posts" value='blog'/>
            </Tabs>
            <br/>
            {isToReviewLoading ? 
            <div>
                <Skeleton variant='rectangular' height='100px' animation='wave' style={{borderRadius: '8px'}}/><br/>
                <Skeleton variant='rectangular' height='100px' animation='wave' style={{borderRadius: '8px'}}/><br/>
                <Skeleton variant='rectangular' height='100px' animation='wave' style={{borderRadius: '8px'}}/><br/>
            </div> 
            : 
            <div style={{display:'flex', flexDirection:'column'}}>
            { !toReview?.posts.length ? 
            <Typography variant='caption' >
                There are no submissions to Review for now!
            </Typography>
            :
            <div style={{display:'grid', gridTemplateColumns:'1fr',gap:'15px'}}>
            {toReview?.posts?.map((sub, i)=>(
                <PostCard post={sub} scope='ins-dashboard' type={tab} varaint='smol' key={i} />
            ))}
            </div>}
            <br/>
            { toReview?.posts?.length !==0 && <Pagination count={toReview?.total} variant="outlined" page={page} 
            color="secondary" onChange={(e, page)=>(setPage(page))}
            style={{alignSelf:'center'}}/>}
            </div>
            }
            
        </Paper>
        </div>
    )
}

export default DbToReview;
