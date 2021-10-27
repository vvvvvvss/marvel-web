import {Paper, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Link, Button, CircularProgress} from '@mui/material';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCourseData} from '../../actions/dashboard.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Markdown from 'markdown-to-jsx';

const DbLandT = () => {
    const {authUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseData(authUser?.currentStuCourse,'dashboard'));
    }, []);

    const {syllabus, isSyllabusLoading} = useSelector(state => state.dashboard);

    return (
    <Paper variant='widget' style={{height:'max-content'}}>
        <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
        <Typography variant='widget-heading'>levels & tasks&nbsp;</Typography>
        <Chip label={syllabus?.courseCode} variant='outlined' color='primary' size='small'/>
        </div>
       
      {isSyllabusLoading ? <CircularProgress/> : 
       <>
        { syllabus?.levels?.map((lvl)=>(
            <>
            <br/>
            <Typography variant='heading' component='div' key={lvl.levelNo}>&nbsp;&nbsp;
                    {`Level  ${lvl?.levelNo}`}
            </Typography>
            { lvl.tasks.map((tsk)=>{
                return(
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography variant='subtitle2'>{`Task  ${tsk?.taskNo}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'24px'}} options={{wrapper : 'p'},{
                                            overrides: {
                                                p :{
                                                    component: Typography,
                                                },
                                                a :{
                                                    component : Link,
                                                    props : {target : '_blank',rel:'noopener noreferrer'}
                                                }
                                            },
                                        }}>
                            {tsk?.description}
                            </Markdown >
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            </>
        ))}
        </>}
    </Paper>
    )
}

export default DbLandT;
