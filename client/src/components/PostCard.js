import { Card, IconButton, CardMedia, CardContent, Typography, CardActions, Button, Chip } from "@mui/material"
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

const PostCard = ({type, post, variant, scope}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleShare = () => {
        try {
          navigator.clipboard.writeText(`${window.location.origin}/${type}/${post?.slug}`);
          alert("Link Copied to clipboard!");
        } catch (error) { }
    };

    const handleOpen = () => {
      try {
        if(["ins-dashboard","dashboard"].includes(scope)){
          dispatch({type:'SET_VIEW_ID',payload:{id: post?.slug, type: type?.toUpperCase()}});dispatch({type:'OPEN_VIEW'});
        }else {
          history.push(`/${type}/${post?.slug}`);
        }
      } catch (error) { }
    }

    return (
        <div>
        <Card variant='outlined' 
        sx={{width:`${["ins-dashboard","dashboard"].includes(scope)?'100%':'400px'}`,padding:'0px',height:'max-content',position:'relative',
        opacity:`${["PENDING","FLAGGED"].includes(post?.reviewStatus)&&!["ins-dashboard","dashboard"].includes(scope) ? '0.4':'1'}`}}>
          {(type==='blog' && variant==='media') && <>
          <IconButton onClick={handleShare}
          sx={{position:'absolute',top:'10px',right:'10px',color:'primary.light',backgroundColor:'rgba(0,0,0,0.5)',":hover":{backgroundColor:'rgba(0,0,0,0.5)'}}}><ShareIcon/></IconButton>
              <CardMedia
              component="img"
              height="100%" sx={{maxHeight:'150px',objectFit:'cover'}}
              image={post?.coverPhoto}
              alt={post?.title}
          /></>}
          <CardContent>
            <Typography variant={["ins-dashboard","dashboard"].includes(scope) ? 'body1' : 'h6'} fontWeight={["ins-dashboard","dashboard"].includes(scope)?'500':''}
            sx={{overflow: 'hidden',textOverflow:'ellipsis',wordWrap:'break-word',whiteSpace:'nowrap'}}>
              {post?.title}
            </Typography>
            <Typography sx={{color:'#c4c4c4',marginTop:["ins-dashboard","dashboard"].includes(scope)?'8px':'0px'}} variant='caption' component='div'>
                {scope!=='dashboard'&&<span>{post?.authorName}&nbsp;&nbsp; &#8226; &nbsp;&nbsp;</span>}
                {(type==='pr' || type==='rsa') && 
                <><span>{`${type==='pr'?'Level':''} ${post?.[type==='pr' ? 'level' : 'courseCode']}`}</span>
                &nbsp;&nbsp; &#8226; &nbsp;&nbsp;</>}
                <span>{moment(post?.[scope==='dashboard'?'createdAt':'updatedAt']).fromNow()}</span>
            </Typography>
          </CardContent>
              <CardActions sx={{paddingTop: '0px',display:'flex',justifyContent: 'flex-end', position:'relative'}}>
              {((type==='pr'||type==='blog')&&(scope==='dashboard')) &&
              <Chip label={post?.reviewStatus} 
              color={post?.reviewStatus==='PENDING'?'warning':post.reviewStatus==='FLAGGED'?'error':post.reviewStatus==='APPROVED'?'success':'default'}
               sx={{position:'absolute',left:'12px',bottom:'12px'}} size='small' variant='filled'/> 
              }
              {(["pr","rsa"].includes(type)&&(scope!=='dashboard')) && 
               <Button variant='text' color='secondary' size='small' onClick={handleShare}> 
                Share
              </Button>}&nbsp;&nbsp;
              <Button variant='text' color='secondary' size='small' onClick={handleOpen} >
                READ
              </Button>&nbsp;&nbsp;
              </CardActions>
          </Card>
        </div>
    )
}

export default PostCard;
