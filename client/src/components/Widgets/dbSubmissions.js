import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const DbSubmissions = () => {

    const {submissions} = useSelector(state => state.dashboard);
    return (
        <Paper variant='widget'>
        <Typography variant='widget-heading'>submissions</Typography>
        </Paper>
    )
}

export default DbSubmissions;
