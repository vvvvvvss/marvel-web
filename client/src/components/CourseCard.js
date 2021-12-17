import { Card, Typography, Divider, Button, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';

const CourseCard = ({course}) => {
    const history = useHistory();
    return (
        <div>
            <Card variant='outlined' sx={{width:'400px',height:'max-content',position:'relative',padding:'16px 20px 10px 20px'}}>
            <IconButton onClick={()=>{try {
                navigator.clipboard.writeText(`${window.origin}/course/${course}`);
                alert("Link copied to clipboard.");
            } catch (error) { }}}
          sx={{position:'absolute',top:'10px',right:'10px'}}>
              <ShareIcon sx={{color:'secondary.light'}} />
            </IconButton>
            <Typography variant='h4' color='secondary' fontWeight={'600'}>{course?.courseCode}</Typography>
            <Typography variant='caption' sx={{display:'flex',alignItems:'center',color:'secondary.light'}}>
              {course?.courseDuration}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;{course?.totalLevels}&nbsp;Levels
            </Typography>
            <Divider sx={{marginTop:'10px'}} />
            <Typography variant='body2' sx={{margin:'10px 0px 10px 0px'}}>{course?.caption}</Typography>
            <Divider sx={{marginBottom:'10px'}} />
            <Button color='secondary' onClick={()=>(history.push(`/course/${course?.courseCode}`))}>view</Button>
          </Card>
        </div>
    )
}

export default CourseCard
