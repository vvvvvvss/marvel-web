import { Paper, Typography, Stepper, Step, StepLabel, Skeleton, Alert } from "@mui/material";
import { useQuery } from "react-query";
import { hasSubmittedPr, getCourseData } from "../../API/index.js";
import useAuth from "../../utils/hooks/useAuth.js";

const DbProgress = () => {
    const {authUser} = useAuth();

    const {data:courseData, isLoading} = useQuery([{courseCode:authUser?.currentStuCourse, scope:'levels'}], 
        ()=>(getCourseData(authUser?.currentStuCourse, 'levels')),
        {
            onError:()=>{
                alert("Something went wrong while fetching syllabus.");
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
    const hasSubmitted = metaDataOfSubmission?.meta;

    const Message = ()=>{
        if(hasSubmitted?.[authUser?.currentLevel]){
            return <Alert variant="outlined" sx={{fontSize:'12px', borderRadius:'8px'}} severity="success" >You have submitted your project report for current level. Waiting for approval.</Alert>
        }else if(!hasSubmitted?.[authUser?.currentLevel]){
            return <Alert variant="outlined" sx={{fontSize:'12px', borderRadius:'8px'}} severity="info" >{`You can submit project report for level ${authUser?.currentLevel}.`}</Alert>
        }
    };

    return (
        <>
        <Paper variant='widget' style={{height:'max-content', display:'flex',flexDirection:'column', position:'relative'}}>
        <Typography variant='widget-heading'>Progress</Typography>
        <br/><br/>
        {hasSubmittedPrLoading || isLoading ? 
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
