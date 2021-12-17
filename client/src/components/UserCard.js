import { Card, Avatar, Typography, Divider, Button, Chip } from "@mui/material";
import { useHistory } from "react-router-dom";

const UserCard = ({user}) => {
    const history = useHistory();
    return (
        <div>
            <Card variant='outlined' sx={{width:'400px',height:'max-content',position:'relative',display:'grid',gridTemplateColumns: '1fr 4fr',gap:'10px',padding:'16px 20px 10px 20px'}}>
            <Avatar src={user?.profilePic} alt={user?.name} sx={{height:'60px',width:'60px',justifySelf:'start'}}/>
            <div>
              <Typography variant='h6' sx={{overflow: 'hidden',textOverflow:'ellipsis',wordWrap:'break-word',whiteSpace:'nowrap'}}>{user?.name}</Typography>
              <Typography variant='caption' sx={{color:'secondary.light'}}>{user?.currentRole==='STU'?'STUDENT':user?.currentRole==='INS'?'INSTRUCTOR':''}</Typography>
              
              {user?.currentRole==='STU'?
                <div>
            <Divider sx={{marginTop:'8px'}}/>
            <Chip label={user?.currentStuCourse} variant="outlined" color='secondary' size='small' sx={{margin:'10px 0px 10px 0px'}}/>&nbsp;&nbsp;
                </div>
                :
                user?.currentRole==='INS' ?
                <>
                <Divider sx={{margin:'8px 0px 10px 0px'}}/>
                {user?.currentInsCourse.map((c)=>(
                <Chip label={c} variant="outlined" color='secondary' size='small' sx={{margin:'0px 8px 8px 0px'}}/>
                ))}  
                </>
                :
                <>
                <Typography>No courses</Typography>
                </> 
            }
              <Divider/>
              <Button variant='text' color='secondary' sx={{marginTop : '10px'}}
              onClick={()=>(history.push(`/profile/${user?.slug}`))}>view</Button>
            </div>
          </Card>
        </div>
    )
}

export default UserCard;
