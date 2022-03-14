import { Dialog, Typography, IconButton,AppBar,Toolbar, CircularProgress, Chip, Avatar, Link, Divider, Button, Card, TextField, DialogActions,DialogContent,DialogContentText, DialogTitle} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';
import { Box } from "@mui/system";
import { useQuery, useQueryClient } from "react-query";
import { getPost } from "../../API/index.js";
import useHashParams from "../../utils/hooks/useHashParams.js";
import { useNavigate } from "react-router-dom";
import colorDecide from "../../utils/functions/colorDecide.js";
const isCreateLoading = false;

const DbViewPost = () => {
    const hashParams = useHashParams();
    const viewOpen = hashParams?.mode=='view';
    const slug = hashParams?.slug;
    const postType = hashParams?.type
    const navigate = useNavigate();
    const {authUser} = useSelector(state => state.auth);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [delConfirm, setDelConfirm] = useState(false);
    const queryClient = useQueryClient();
    //getting post
    const {data:postData, isLoading:isPostLoading} = useQuery([postType,slug], 
        ()=>getPost(postType,slug)
    );
    const post = postData?.post; const postStatus = postData?.status;
    if((![undefined, "UNKNOWN"].includes(authUser?.enrollmentStatus)&&postStatus=='401')){
        queryClient.invalidateQueries([postType,slug],{exact:true});
    }

    const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
    const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

    const submitFeedback = () => {
        // dispatch(submitFB(feedback, post?.slug, postType));
    };

    const handleApprove = ()=>{
        // dispatch(approve(post?.slug, postType));
    };

    const handleDelete = ()=>{
        // dispatch(deletePost(post?.slug, postType ,'db'));
    }

    return (
        <Dialog open={viewOpen} fullScreen onClose={()=>navigate({hash:""})} >
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>navigate({hash:""})} ><CloseIcon/></IconButton>
            <Typography variant='h6' >
                {`${postType==='PR'?'Project Report' : postType==='BLOG' ? 'Blog post' : 'Resource Article'}`}
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{display:'flex',justifyContent:'center',padding: '0px 20px 30px 20px'}} >
        <div style={{paddingTop:'90px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',maxWidth:'650px'}}>
        
        {isPostLoading ? <CircularProgress/> :
         <div>
            <Box sx={{height:{xs:'auto',lg:'350px'}, width: '100%',position:'relative',
            background:`url(${postType==='blog'? post?.coverPhoto : postType==='pr' ? pr_legend :postType==='rsa'? rsa_legend:''})`,
            maxWidth:'650px',borderRadius:'12px',border:'1px solid #D3FFFF', aspectRatio:'16 / 9', backgroundSize:'100%'}}>
          
            <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',borderRadius:'12px'}}>
            <Typography sx={{padding:{xs:'12px 12px 0px 12px',sm:'20px 30px 0px 30px'} ,fontWeight:{xs:'500',lg:'600'},fontSize:{xs:'22px',sm:'36px'}}} >
                {post?.title}
            </Typography><br/>
                <Box sx={{display:'flex',alignItems:'center',padding:{xs:'0px 12px 12px 12px',sm:'0px 30px 20px 30px'},justifyContent:'space-between'}} >
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <Avatar src={post?.authorImage} alt={post?.authorName} sx={{height:{xs:'18px',sm:'30px'},width:{xs:'18px',sm:'30px'},marginRight:'10px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500' sx={{fontSize:{xs:'12px',sm:'14px'}}} > 
                            {post?.authorName}&nbsp;&nbsp;
                        {["rsa","pr"].includes(postType) && 
                            <span>&#8226;&nbsp;&nbsp;{post?.courseCode}</span>
                        }
                        {postType==='pr'&&<span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;{`Level ${post?.level}`}</span>}
                        </Typography>
                    </Box>
                    <Typography variant='caption' color='#a1a1a1' > 
                    &nbsp;&nbsp;{moment(post?.createdAt).fromNow()}
                    </Typography>
                </Box>
            </div>
        </Box>
            <br/>
            { (post?.feedback && authUser?.currentRole==='STU') &&
            <Card>
                <Typography variant='button' >Feedback :</Typography><br/>
                <Typography variant='body2' >{post?.feedback}</Typography>
            </Card>
            }
            <br/>
            <Divider/>
            <br/>
            <Typography component={'div'} lineHeight={'26px'}>
            <Markdown style={{fontSize: '14px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',justifyContent:'start'}} 
                options={{
                wrapper : 'div',
                overrides: {
                    p :{ component: Typography , props: {variant : 'body1'}}, 
                    a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer', sx:{color:'primary.light'}}},
                    img : { props : {width : '100%',height:'300px',style:{justifySelf:'center',objectFit:'cover'}}},
                    iframe : { props : {width : '100%', height : '300', frameBorder : '0',style:{justifySelf:'center'}}},
                    code : { component:Typography ,props : { variant:'code-small' }},
                    blockquote : {component:Typography ,props : { sx:{backgroundColor:'#132222',borderRadius:'8px', padding:'20px 20px 20px 20px',color:'secondary.light'}}},
                    table : {props:{style : {border : '1px solid #D3FFFF'}}},
                    hr : {props : {style : {width:'100%'}}}
                }
                }}>
            { he.decode(`${post?.content}`) }
            </Markdown>
            </Typography>
            <br/>
            <Divider/>
            <br/>
            <div style={{display:'flex',justifyContent:'flex-start'}}>
                 { post?.tags?.map((tag)=>(
                <Chip label={tag} key={tag} variant='outlined' size='medium' color='primary' style={{margin : '4px 8px 4px 0px'}}/>
            ))}
            </div>
            <br/>
            <Divider/>
            <br/>
            { authUser?.currentRole==='STU' && <Typography component='div' variant='body2' color='#c4c4c4'>Approval status :&nbsp;&nbsp;
            <Chip label={postType==='RSA' ? 'PUBLIC' : post?.reviewStatus } color={postType==='RSA'?'success': colorDecide(post?.reviewStatus)} variant='filled'/> 
            </Typography>}
            <br/>
            { (authUser?.currentRole==='INS' && post?.authorId !== authUser?.id) &&
            <>
            <Button disabled={feedbackOpen} variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
            onClick={()=>(setConfirm(true))}>
                <Typography variant='button' fontWeight='600' >{`Approve ${(post?.totalLevels===post?.level&&postType==='pr') ? 'and Award Certificate':''}`}</Typography>
                <Typography variant='caption'>{post?.totalLevels===post?.level&&postType==='PR' ? 'Certificate will be awarded for Course completion.' : postType==='PR'? 'Student proceeds to next level and report becomes public.' : 'Blog becomes public'}</Typography>
            </Button> <br/>
            <Button variant='contained' disabled={feedbackOpen} color='warning' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}} onClick={()=>(setFeedbackOpen(true))} >
                <Typography variant='button' fontWeight='600'>Flag and provide feedback</Typography>
                <Typography variant='caption' >write a feedback on how they can improve this and approve when you are satisfied.</Typography>
            </Button>
            <br/>
            { feedbackOpen && 
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                <TextField  value={feedback} onChange={(e)=>(setFeedback(e.target.value))} fullWidth
                variant='outlined' color='secondary' label='Feedback' placeholder='your feedback...' multiline maxRows={5} inputProps={{maxLength : 500}}/>
                <br/>
                <div>
                <Button disabled={isCreateLoading} onClick={()=>(setFeedbackOpen(false))} style={{justifySelf:'flex-end'}} color='secondary' variant='outlined'>
                    cancel
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;    
                <Button disabled={isCreateLoading} onClick={submitFeedback} style={{justifySelf:'flex-end'}} color='secondary' variant='contained'>
                    {isCreateLoading ? <CircularProgress/> :'submit feedback'}
                </Button>
                </div>
            </div>
            }
            </>
            }
           
            <br/>
            { authUser?.id===post?.authorId &&
            <>
            <Button variant='contained' color='secondary' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
            onClick={()=>{}}>
                <Typography variant='button' fontWeight='600' >Edit</Typography>
                {authUser?.currentRole!=='INS' &&
                <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
                }
            </Button><br/>
            { postType!=='PR'&& 
            <Button variant='contained' fullWidth sx={{textTransform:'none', display:'flex',flexDirection:'column',backgroundColor:'error.dark'}}
            onClick={()=>{setDelConfirm(true);}}>
                <Typography variant='button' fontWeight='600'>Delete</Typography>
            </Button>}
            </>}
            
        </div>
        }
        </div>
        <Dialog
        open={confirm || delConfirm}
        onClose={()=>{setConfirm(false);setDelConfirm(false);}}
      >
        <DialogTitle>
          {confirm?"Are you sure you want to Approve?":delConfirm?'Are you sure?':''}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirm ? `By approving, the ${post?.level===post?.totalLevels&&postType==='PR' ? 
            "Student will be awarded the certificate of course completion and their course session will be completed.":
            postType==='PR' ? 
            "Student will proceed to next level and this Project report will become public. ":
            "Blog post will become public for others to see. "}
            This action CANNOT be undone.` : 
            delConfirm ? `You're about to DELETE this 
            ${postType==='BLOG'?'Blog post' : 'Resource Article'}. This CANNOT be undone.`:''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setConfirm(false);setDelConfirm(false);}} color='secondary' 
            variant='outlined' disabled={isCreateLoading}>Disagree
          </Button>
          <Button onClick={confirm ? handleApprove : delConfirm ? handleDelete : ()=>{}} 
            variant='contained' color={delConfirm?'error':'secondary'}
            disabled={isCreateLoading} >
            {isCreateLoading ? <CircularProgress/> : 'agree'}
          </Button>
        </DialogActions>
      </Dialog>
        </div>
        </Dialog>
    )
}

export default DbViewPost;
