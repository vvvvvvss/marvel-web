import {Paper, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Skeleton, Link} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useQuery} from 'react-query';
import {getCourseData} from "../../API/index.js";
import useAuth from "../../utils/hooks/useAuth.js";
import RenderMarkdown from '../RenderMarkdown.js';

const DbLandT = () => {
    const {authUser} = useAuth();
    const {data, isLoading} = useQuery([{courseCode:authUser?.currentStuCourse, scope:'levels'}], 
        ()=>(getCourseData(authUser?.currentStuCourse, 'levels')),
        {
            onError:()=>{
                alert("Something went wrong while fetching syllabus.");
            }
        }
    );

    return (
    <Paper variant='widget' style={{height:'max-content',maxWidth:'400px', display:'flex',flexDirection:'column'}}>
        <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
        <Typography variant='widget-heading'>levels & tasks&nbsp;</Typography>
        <Chip label={ isLoading ? "Loading..." : data?.course?.courseCode} variant='outlined' color='primary' size='small'/>
        </div>
       
      {isLoading ? 
      <>
      <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
      <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
      <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
      </>
       : 
       <>
        { data?.course?.levels?.map((lvl, lvIndex)=>(
            <div key={lvIndex}>
            <br/>
            <Typography variant='heading' component='div'>&nbsp;&nbsp;
                    {`Level  ${lvIndex+1}`}
            </Typography>
            { lvl?.tasks?.map((tsk, i)=>{
                return(
                    <Accordion key={i}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography variant='subtitle2'>{`Task  ${i+1}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <RenderMarkdown content={tsk?.description} />
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
