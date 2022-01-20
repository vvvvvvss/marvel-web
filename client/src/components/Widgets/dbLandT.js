import {Paper, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Skeleton} from '@mui/material';
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
        <Chip label={ isSyllabusLoading ? "Loading..." : syllabus?.courseCode} variant='outlined' color='primary' size='small'/>
        </div>
       
      {isSyllabusLoading ? 
      <>
      <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
      <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
      <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
      </>
       : 
       <>
        { syllabus?.levels?.map((lvl, lvIndex)=>(
            <div key={lvIndex}>
            <br/>
            <Typography variant='heading' component='div'>&nbsp;&nbsp;
                    {`Level  ${lvIndex+1}`}
            </Typography>
            { lvl.tasks.map((tsk, i)=>{
                return(
                    <Accordion key={i}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography variant='subtitle2'>{`Task  ${i+1}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body2' lineHeight={"24px"} component={'div'} >
                            <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'24px'}} 
                            options={{wrapper : 'div'},{
                                a :{ props : {target : '_blank',rel:'noopener noreferrer', style:{overflowWrap:'break-word',
                                wordBreak:"break-word", 
                                wordWrap: 'break-word',
                                msWordBreak:"break-all"}} },
                                img : { props : {width : '100%',height:'300px',style:{objectFit:'cover'} }},
                                iframe : { props : {width : '100%', height : '315', frameBorder : '0'}},
                                code : { component:Typography ,props : { variant:'code-small' }},
                                blockquote : {component:Typography ,props : { sx:{backgroundColor:'#132222',borderRadius:'8px', padding:'20px 20px 20px 20px',color:'secondary.light'}}}
                                }}>
                            {tsk?.description}
                            </Markdown >
                            </Typography>
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
