import {Paper, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Skeleton, Link} from '@mui/material';
import {useSelector} from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Markdown from 'markdown-to-jsx';
import {useQuery} from 'react-query';
import {getCourseData} from "../../API/index.js";

const DbLandT = () => {
    const {authUser} = useSelector(state => state.auth);

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
                            <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'24px'}} 
                            options={{wrapper : 'div',
                                overrides: {
                                    p :{ component: Typography , props: {variant : 'body2'}}, 
                                    a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'}, sx:{color:'primary.light'}},
                                    img : { props : {width : '100%',height:'20px',style:{justifySelf:'center',objectFit:'cover'} }},
                                    iframe : { props : {width : '100%', height : '300', frameBorder : '0',style:{justifySelf:'center'} }},
                                    code : { component:Typography ,props : { variant:'code-small' }},
                                    blockquote : {props : { style:{backgroundColor:'#112020',borderRadius:'12px', padding:'20px 20px 20px 20px', margin:"10px"} }}
                                }
                            }}>
                            {tsk?.description}
                            </Markdown>
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
