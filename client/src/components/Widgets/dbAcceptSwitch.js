import { MenuItem, Paper, Typography, Select, Skeleton, Switch, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourseData } from "../../actions/dashboard";

const AcceptSwitch = () => {
    const {authUser} = useSelector(state => state.auth);
    const {syllabus, isSyllabusLoading} = useSelector(state => state.dashboard);
    const [course, setCourse] = useState(authUser?.currentInsCourse?.[0]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseData(course, 'switch'));
    }, [course]);

    const switches = [];
    for (let i = 1; i <= syllabus?.totalLevels; i++) {
        switches.push(
            <div>
            <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant='body2' component='div'>{`Lv ${i}`}</Typography>
            <Switch key={i} checked={syllabus?.submissionStatus?.forLevel===i} 
            disabled={!(syllabus?.submissionStatus?.forLevel===i)} 
            /> 
            </div>
            <Divider/>
            </div>
        )        
    }

    return (
        <div>
            <Paper variant='widget' maxHeight='max-content'>
                <Typography variant='widget-heading'>controls</Typography>
                <br/><br/>
                <Typography variant='caption' >You can open and close Submissions for the different courses that you instruct for.</Typography>
                <br/><br/>
                <Select fullWidth color='secondary'
                value={course}
                onChange={(e)=>(setCourse(e.target.value))}
            >
                {authUser?.currentInsCourse?.map((c)=>(
                    <MenuItem value={c}>{c}</MenuItem>
                ))}
            </Select>
            <br/>
            {isSyllabusLoading ? 
            <Skeleton animation='wave' height='200px' style={{borderRadius: '12px'}} /> : 
            <div>
                <br/>
                <Divider/>
                {switches}
            </div>
            }
            </Paper>
        </div>
    )
}

export default AcceptSwitch;
