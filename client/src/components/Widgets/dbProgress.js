import { Paper, Typography, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const DbProgress = () => {
    const {profile, syllabus, isProfileLoading} = useSelector(state => state.dashboard);

    return (
        <>
             <Paper variant='widget' style={{height:'max-content'}}>
                <Typography variant='widget-heading'>Progress</Typography>
                <br/><br/><br/>

                {isProfileLoading ? <CircularProgress/> :
                <>
                <Stepper activeStep={Number(profile?.currentLevel -1 )}>
                {syllabus?.levels?.map((level) => (
                    <Step key={level?.levelNo}>
                    <StepLabel>{`Lvl ${level?.levelNo}`}</StepLabel>
                    </Step>
                ))}
                </Stepper>
                <br/>
                {syllabus?.submissionStatus?.isAccepting ?
                <Typography variant='caption'>
                    <em>
                    {`Submissions are open for level ${syllabus?.submissionStatus?.forLevel} Project report.`}
                    </em>
                </Typography>
                :
                <Typography variant='caption'>
                    <em>
                    {`Submissions are'nt open for project reports right now.`}
                    </em>
                </Typography>
                }
                </>}
            </Paper>
        </>
    )
}

export default DbProgress;
