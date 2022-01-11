import { Dialog, Typography, IconButton,AppBar,Toolbar, CircularProgress, Chip, Avatar, Link, Divider, Button, Card, TextField, DialogActions,DialogContent,DialogContentText, DialogTitle} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { getPost, deletePost } from "../../actions/dashboard.js";
import { useEffect, useState } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';
import { submitFB, approve } from "../../actions/dashboard.js";
import { Box } from "@mui/system";

const DbViewPost = () => {
    const {viewPostOpen, viewPostId, viewPostType, viewPost, isViewLoading, viewPostScope, isCreateLoading} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const {authUser} = useSelector(state => state.auth);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [delConfirm, setDelConfirm] = useState(false);

    useEffect(() => {
        if(!viewPost || viewPost?.slug !== viewPostId){
            dispatch(getPost(viewPostType,viewPostId, viewPostScope));
        }
    }, [ viewPostScope, viewPostType, dispatch]);

    const colorDecide = (status) => {
        if(status==='PENDING') return 'warning';
        else if (status==='FLAGGED') return 'error';
        else if (status==='APPROVED' || 'FEATURED') return 'success';
    }
    const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
    const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

    const submitFeedback = () => {
        dispatch(submitFB(feedback, viewPost?.slug, viewPostType));
    };

    const handleApprove = ()=>{
        dispatch(approve(viewPost?.slug, viewPostType));
    };

    const handleDelete = ()=>{
        dispatch(deletePost(viewPost?.slug, viewPostType ,'db'));
    }

    console.log(viewPost);

    return (
        <Dialog open={viewPostOpen} fullScreen onClose={()=>(dispatch({type:'CLOSE_VIEW'}))} >
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>{dispatch({type:'CLOSE_VIEW'});}} ><CloseIcon/></IconButton>
            <Typography variant='h6' >
                {`${viewPostType==='PR'?'Project Report' : viewPostType==='BLOG' ? 'Blog post' : 'Resource Article'}`}
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{display:'flex',justifyContent:'center',padding: '0px 20px 30px 20px'}} >
        <div style={{paddingTop:'90px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',maxWidth:'650px'}}>
        
        {isViewLoading ? <CircularProgress/> :
         <div>
            <div style={{ minWidth: '100%',position:'relative',backgroundColor:'#000000', borderRadius:'12px'}}>
                <img width='100%' style={{objectFit:'cover', borderRadius:'12px', minWidth:'100%', aspectRatio:'16 / 9',maxHeight:'350px'}} 
                src={viewPostType==='BLOG'? viewPost?.coverPhoto : viewPostType==='PR' ? pr_legend : rsa_legend} />

                <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%', background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',borderRadius:'12px',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                <Typography sx={{padding:{xs:'20px 12px 0px 12px',md:'20px 30px 0px 30px'},fontWeight:{xs:'500',lg:'600'},fontSize:{xs:'22px',sm:'45px'}}}>{viewPost?.title}</Typography><br/>
                <Box sx={{display:'flex',alignItems:'center',padding:{xs:'0px 12px 12px 12px',md:'0px 30px 20px 30px'},justifyContent:'space-between'}} >
                    <Box sx={{display:'flex',alignItems: 'center',justifyContent:'flex-start',maxWidth:{xs:'70%',md:'100%'}}}>
                        <Avatar src={viewPost?.authorImage} alt={viewPost?.authorName} sx={{height:'30px',width:'30px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500'> 
                        &nbsp;&nbsp;&nbsp;&nbsp;{viewPost?.authorName}&nbsp;&nbsp;{viewPostType==='PR' && <span>&#8226;&nbsp;&nbsp;{`Lv ${viewPost?.level}`}</span>}
                        {viewPostType==='RSA' && <span>&#8226;&nbsp;&nbsp;{viewPost?.courseCode}</span>}
                        </Typography>
                    </Box>
                    <Typography variant='caption' color='#a1a1a1'> 
                    &nbsp;&nbsp;{moment(viewPost?.createdAt).fromNow()}
                    </Typography>
                </Box>
                </div>
            </div>
            <br/>
            { (viewPost?.feedback && authUser?.currentRole==='STU') &&
            <Card>
                <Typography variant='button' >Feedback :</Typography><br/>
                <Typography variant='body2' >{viewPost?.feedback}</Typography>
            </Card>
            }
            <br/>
            <Divider/>
            <br/>
            <Typography component={'div'} lineHeight={'26px'}>
            <Markdown style={{fontSize: '14px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',justifyContent:'start'}} 
                options={
                {wrapper : 'div'},
                { overrides: {
                    p :{ component: Typography , props: {variant : 'body1'}}, 
                    a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer', sx:{color:'primary.light'}} },
                    img : { props : {width : '100%',height:'300px',style:{justifySelf:'center',objectFit:'cover'} }},
                    iframe : { props : {width : '100%', height : '300', frameBorder : '0',style:{justifySelf:'center'} }},
                    code : { component:Typography ,props : { variant:'code-small' }},
                    blockquote : {component:Typography ,props : { sx:{backgroundColor:'#132222',borderRadius:'8px', padding:'20px 20px 20px 20px',color:'secondary.light'} }},
                    table : {props:{style : {border : '1px solid #D3FFFF'}}},
                    hr : {props : {style : {width:'100%'}}}
                },
            }}>
            { he.decode(`${viewPost?.content}`) }
            </Markdown>
            </Typography>
            <br/>
            <Divider/>
            <br/>
            <div style={{display:'flex',justifyContent:'flex-start'}}>
                 { viewPost?.tags?.map((tag)=>(
                <Chip label={tag} key={tag} variant='outlined' size='medium' color='primary' style={{margin : '4px 8px 4px 0px'}}/>
            ))}
            </div>
            <br/>
            <Divider/>
            <br/>
            { authUser?.currentRole==='STU' && <Typography component='div' variant='body2' color='#c4c4c4'>Approval status :&nbsp;&nbsp;
            <Chip label={viewPostType==='RSA' ? 'PUBLIC' : viewPost?.reviewStatus } color={viewPostType==='RSA'?'success': colorDecide(viewPost?.reviewStatus)} variant='filled'/> 
            </Typography>}
            <br/>
            { (authUser?.currentRole==='INS' && viewPost?.authorId !== authUser?.id) &&
            <>
            <Button disabled={feedbackOpen} variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
            onClick={()=>(setConfirm(true))}>
                <Typography variant='button' fontWeight='600' >{`Approve ${(viewPost?.totalLevels===viewPost?.level&&viewPostType==='pr') ? 'and Award Certificate':''}`}</Typography>
                <Typography variant='caption'>{viewPost?.totalLevels===viewPost?.level&&viewPostType==='PR' ? 'Certificate will be awarded for Course completion.' : viewPostType==='PR'? 'Student proceeds to next level and report becomes public.' : 'Blog becomes public'}</Typography>
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
            { authUser?.id===viewPost?.authorId &&
            <>
            <Button variant='contained' color='secondary' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
            onClick={()=>{dispatch({type:'SET_EDIT_ID',payload:{id:viewPost?.slug, type: viewPostType}});dispatch({type:'OPEN_EDIT'})}}>
                <Typography variant='button' fontWeight='600' >Edit</Typography>
                {authUser?.currentRole!=='INS' &&
                <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
                }
            </Button><br/>
            { viewPostType!=='PR'&& 
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
            {confirm ? `By approving, the ${viewPost?.level===viewPost?.totalLevels&&viewPostType==='PR' ? 
            "Student will be awarded the certificate of course completion and their course session will be completed.":
            viewPostType==='PR' ? 
            "Student will proceed to next level and this Project report will become public. ":
            "Blog post will become public for others to see. "}
            This action CANNOT be undone.` : 
            delConfirm ? `You're about to DELETE this 
            ${viewPostType==='BLOG'?'Blog post' : 'Resource Article'}. This CANNOT be undone.`:''}
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
