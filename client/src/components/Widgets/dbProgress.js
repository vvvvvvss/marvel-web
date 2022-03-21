import { Paper, Typography, Stepper, Step, StepLabel, Skeleton, Alert } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getCourseData, hasSubmittedPr } from "../../API/index.js";

const DbProgress = () => {
    const {authUser} = useSelector(state => state.auth);

    const {data:courseData, isLoading} = useQuery([{courseCode:authUser?.currentStuCourse, scope:'subStatus'}],
        ()=>(getCourseData(authUser?.currentStuCourse, 'subStatus')),
        {
            onerror : ()=>{
                alert("Something went wrong");
            }
        }
    );

    const {data:metaDataOfSubmission, isLoading:hasSubmittedPrLoading} = useQuery(['hasSubmittedPr', {authUser:authUser?.id}],
        ()=>(hasSubmittedPr()),
        {
            onerror : ()=>{
                alert("Something went wrong");
            }
        }
    );
    const subStatus = courseData?.course.submissionStatus;
    const hasSubmitted = metaDataOfSubmission?.meta;

    const Message = ()=>{
       if(subStatus?.isAccepting){
           if(hasSubmitted?.[authUser?.currentLevel]&&subStatus?.forLevel===authUser?.currentLevel){
            return <Alert variant="outlined" sx={{fontSize:'12px', borderRadius:'8px'}} severity="success" >You have submitted your project report for the current level.</Alert>
        }else if(!hasSubmitted?.[authUser?.currentLevel] && subStatus?.forLevel===authUser?.currentLevel){
            return <Alert variant="outlined" sx={{fontSize:'12px', borderRadius:'8px'}} severity="info" >Submissions are open for level 1.</Alert>
        }else{
            return <Alert variant="outlined" sx={{fontSize:'12px', borderRadius:'8px'}} severity="warning">{`Submissions are open for level ${subStatus?.forLevel} but you can't submit because you are still in ${authUser?.currentLevel}. Contact your coordinator to see how you can catchup.`}</Alert>
        }
       }else{
           return  <Alert variant="outlined" sx={{fontSize:'12px', borderRadius:'8px'}} severity="info" >Not accepting PR Submissions now</Alert>
       }
    };

    return (
        <>
             <Paper variant='widget' style={{height:'max-content', display:'flex',flexDirection:'column', position:'relative'}}>
                <Typography variant='widget-heading'>Progress</Typography>
                <br/><br/>
                {isLoading || hasSubmittedPrLoading ? 
                <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
                :
                <>
                <Stepper activeStep={Number(authUser?.currentLevel)-1}>
                {[...Array.from({length:courseData?.course?.totalLevels},(_,i)=>(i+1))].map((lvIndex, _) => (
                    <Step key={lvIndex}>
                    <StepLabel>{`Lvl ${lvIndex+1}`}</StepLabel>
                    </Step>
                ))}
                </Stepper>
                <br/>
                {Message()}
                </>}
            </Paper>
        </>
    )
}

export default DbProgress;
