import { Paper, Typography, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const DbProgress = () => {
    const { syllabus, isSyllabusLoading, submissions} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const Message = ()=>{
        if(submissions?.prs?.some((i)=>(i?.level===authUser?.currentLevel))){
            return <Typography variant='caption'><em>You have submitted your Project report for current level.</em></Typography>
        }else if(syllabus?.submissionStatus?.isAccepting){
            return <Typography variant='caption'><em>{`Submissions are open for level ${syllabus?.submissionStatus?.forLevel} Project report.`} </em></Typography>
        }else return <Typography variant='caption'><em>Submissions are'nt open for this level</em></Typography>
    };
    return (
        <>
             <Paper variant='widget' style={{height:'max-content'}}>
                <Typography variant='widget-heading'>Progress</Typography>
                <br/><br/><br/>

                {isSyllabusLoading ? <CircularProgress/> :
                <>
                <Stepper activeStep={Number(authUser?.currentLevel -1 )}>
                {syllabus?.levels?.map((level, lvIndex) => (
                    <Step key={lvIndex}>
                    <StepLabel>{`Lvl ${lvIndex}`}</StepLabel>
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
