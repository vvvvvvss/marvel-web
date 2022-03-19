import { Paper, Typography, Stepper, Step, StepLabel, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getCourseData, hasSubmittedPr } from "../../API/index.js";

const DbProgress = () => {
    const {authUser} = useSelector(state => state.auth);

    const {data, isLoading} = useQuery([{courseCode:authUser?.currentStuCourse, scope:'subStatus'}],
        ()=>(getCourseData(authUser?.currentStuCourse, 'subStatus')),
        {
            onerror : ()=>{
                alert("Something went wrong");
            }
        }
    );

    const {data:hasSubmittedPr, isLoading:hasSubmittedPrLoading} = useQuery(['hasSubmittedPr', {authUser:authUser?.id}],
        ()=>(hasSubmittedPr())
    );

    const Message = ()=>{
        if(submissions?.prs?.some((i)=>(i?.level===authUser?.currentLevel))){
            return <Typography variant='caption'><em>You have submitted your Project report for current level.</em></Typography>
        }else if(syllabus?.submissionStatus?.isAccepting){
            return <Typography variant='caption'><em>{`Submissions are open for level ${syllabus?.submissionStatus?.forLevel} Project report.`} </em></Typography>
        }else return <Typography variant='caption'><em>Submissions are'nt open for this level</em></Typography>
    };

    return (
        <>
             <Paper variant='widget' style={{height:'max-content', display:'flex',flexDirection:'column'}}>
                <Typography variant='widget-heading'>Progress</Typography>
                <br/>

                {isSyllabusLoading ? 
                <Skeleton animation='wave' variant='rectangular' sx={{borderRadius:'12px', width:'100%', height:'90px',marginTop:'15px'}} /> 
                :
                <>
                <Stepper activeStep={Number(authUser?.currentLevel)-1}>
                {syllabus?.levels?.map((level, lvIndex) => (
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
