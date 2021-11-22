import { Paper, Typography, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DbToReview = () => {
    const dispatch = useDispatch();
    const { toReview, isToReviewLoading } = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const [tab, setTab] = useState('pr');
    const [page, setPage] = useState(1);
    const [courseFilter, setCourseFilter] = useState('none');

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
            {toReview?.list.map((sub)=>(
                <div>
                    
                </div>
            ))}
        </Paper>
        </div>
    )
}

export default DbToReview
