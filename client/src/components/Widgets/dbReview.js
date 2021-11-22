import { Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DbToReview = () => {
    const dispatch = useDispatch();
    const {toReview, isToReviewLoading, } = useSelector(state => state.dashboard);

    useEffect(() => {
    // dispatch(getToReview());
    }, [])
    
    return (
        <div>
            <Paper variant="widget" height="420px">
                <Typography variant="widget-heading">review</Typography>
                <br/>

            </Paper>
        </div>
    )
}

export default DbToReview
