import { Card, IconButton, CardMedia, CardContent, Typography, CardActions, Button, Chip } from "@mui/material"
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

const PostCard = ({type, post, variant, scope}) => {
    const navigate = useNavigate();
    const handleShare = () => {
        try {
          navigator.clipboard.writeText(`${window.location.origin}/${type}/${post?.slug}`);
          alert("Link Copied to clipboard!");
        } catch (error) { }
    };

    return (
        <>
        <Card variant='outlined' 
        sx={{margin:{xs:'0px 20px 0px 20px',sm:["dashboard","ins-dashboard"].includes(scope)?'0px 20px 0px 20px':'0px'},height:'max-content',position:'relative',justifySelf:'center',
        width:{xs:`${(variant==="media"&&type==='blog')?'85%':'93%'}`,md:["dashboard","ins-dashboard"].includes(scope)?'93%':'400px'},
        opacity:`${["PENDING","FLAGGED"].includes(post?.reviewStatus)&&!["ins-dashboard","dashboard"].includes(scope) ? '0.4':'1'}`}}>
          {(type==='blog' && variant==='media') && 
          <CardMedia
           sx={{objectFit:'cover', borderRadius:'4px', aspectRatio:'2 / 1'}}
          image={post?.coverPhoto}
          alt={post?.title}
      />
         }
          
          <CardContent sx={{padding:'10px'}} >
            <Typography variant={["ins-dashboard","dashboard"].includes(scope) ? 'body1' : 'h6'} fontWeight={["ins-dashboard","dashboard"].includes(scope)?'500':''}
            sx={{overflow: 'hidden',textOverflow:'ellipsis',wordWrap:'break-word',whiteSpace:'nowrap',maxWidth:'95%',fontSize:{xs:'18px',md:'auto'},lineHeight:'32px'}}>
              {post?.title}
            </Typography>
            <Typography sx={{color:'#c4c4c4',marginTop:["ins-dashboard","dashboard"].includes(scope)?'8px':'0px',textOverflow:'ellipsis'}} variant='caption' component='div'>
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
              {(["pr","rsa","blog"].includes(type)&&(!["dashboard","ins-dashboard"].includes(scope))) && 
               <Button variant='text' color='secondary' size='small' onClick={handleShare}> 
                Share
              </Button>}&nbsp;&nbsp;
              {["ins-dashboard","dashboard"].includes(scope) ? 
              <Button variant='text' color='secondary' size='small' 
              onClick={()=>(navigate({hash:`#mode=view&type=${type}&slug=${post?.slug}`}))}>
                READ
              </Button>
              :
              <Link style={{textDecoration:'none'}} to={`/${type}/${post?.slug}`} >
              <Button variant='text' color='secondary' size='small' >
                READ
              </Button>
              </Link>
              }&nbsp;&nbsp;
              </CardActions>
          </Card>
        </>
    )
}

export default PostCard;
