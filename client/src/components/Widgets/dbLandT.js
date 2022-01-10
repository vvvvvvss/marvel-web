import {Paper, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Link, CircularProgress} from '@mui/material';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCourseData} from '../../actions/dashboard.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Markdown from 'markdown-to-jsx';

const DbLandT = () => {
    const {authUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {syllabus, isSyllabusLoading} = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(getCourseData(authUser?.currentStuCourse,'dashboard'));
        return()=>{
            dispatch({type:"CLEAR_SYLLABUS"});
        }
    }, []);

    return (
    <Paper variant='widget' style={{height:'max-content',maxWidth:'400px', display:'flex',flexDirection:'column'}}>
        <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
        <Typography variant='widget-heading'>levels & tasks&nbsp;</Typography>
        <Chip label={syllabus?.courseCode} variant='outlined' color='primary' size='small'/>
        </div>
       
      {isSyllabusLoading ? <CircularProgress sx={{justifySelf:'center',marginTop:'90px'}} /> : 
       <>
        { syllabus?.levels?.map((lvl, lvIndex)=>(
            <div key={lvIndex}>
            <br/>
            <Typography variant='heading' component='div'>&nbsp;&nbsp;
                    {`Level  ${lvIndex+1}`}
            </Typography>
            { lvl.tasks.map((tsk)=>{
                return(
                    <Accordion key={tsk?.taskNo}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography variant='subtitle2'>{`Task  ${tsk?.taskNo}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'24px'}} 
                            options={{wrapper : 'p'},{
                                            overrides: {
                                                p :{
                                                    component: Typography
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
            </div>
        ))}
        </>}
    </Paper>
    )
}

export default DbLandT;
