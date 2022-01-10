import { Card, Avatar, Typography, Divider, Button, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useHistory } from "react-router-dom";

const UserCard = ({user}) => {
    const history = useHistory();
    return (
        <div>
            <Card variant='outlined' sx={{maxWidth:{xs:'300px',sm:'400px'},height:'max-content',position:'relative',display:'grid',gridTemplateColumns: '1fr 4fr',gap:'10px',padding:'16px 20px 10px 20px'}}>
            <Avatar src={user?.profilePic} alt={user?.name} sx={{height:'60px',width:'60px',justifySelf:'start'}}/>
            <div>
              <Typography variant='h6' sx={{overflow: 'hidden',textOverflow:'ellipsis',wordWrap:'break-word',whiteSpace:'nowrap'}}>{user?.name}</Typography>
              <Typography variant='caption' sx={{color:'secondary.light'}}>{user?.currentRole==='STU'?'STUDENT':user?.currentRole==='INS'?'INSTRUCTOR':''}</Typography>
              
              {user?.currentRole==='STU'?
                <div>
                <Divider sx={{marginTop:'8px'}}/>
                <Link style={{textDecoration:'none',color:'inherit'}} to={`/course/${user?.currentStuCourse}`}>
                <Chip label={user?.currentStuCourse} variant="outlined" color='secondary' size='small' sx={{margin:'10px 0px 10px 0px'}}/>
                </Link>
                </div>
                :
                user?.currentRole==='INS' ?
                <>
                <Divider sx={{margin:'8px 0px 10px 0px'}}/>
                <Box sx={{whiteSpace:'pre-wrap'}} >
                {user?.currentInsCourse.map((c, i)=>(
                <Link style={{textDecoration:'none',color:'inherit'}} to={`/course/${c}`} >
                <Chip label={c} variant="outlined" key={i} color='secondary' size='small' sx={{margin:'0px 8px 8px 0px'}}/>                
                </Link>
                ))}  
                </Box>
                </>
                :
                <>
                <Typography variant='caption' sx={{color:'#b1b1b1'}} ><em>Not active in any course</em></Typography>
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
