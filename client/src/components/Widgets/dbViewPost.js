import { Dialog, Typography, IconButton,AppBar,Toolbar, CircularProgress, Chip, Avatar, Link, Divider, Button, Card, TextField, Grow} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { getPost } from "../../actions/dashboard.js";
import { useEffect, useState } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';

const DbViewPost = () => {
    const {viewPostOpen, viewPostId, viewPostType, viewPost, isViewLoading, viewPostScope} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const {authUser} = useSelector(state => state.auth);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if(!viewPost || viewPost?.slug !== viewPostId){
            dispatch(getPost(viewPostType,viewPostId, viewPostScope));
        }
    }, [viewPost, viewPostId, viewPostScope, viewPostType])

    const colorDecide = (status) => {
        if(status==='PENDING') return 'warning';
        else if (status==='FLAGGED') return 'error';
        else if (status==='APPROVED' || 'FEATURED') return 'success';
    }
    const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
    const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

    const submitFeedback = () => {
        console.log(feedback);
    };

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
            <div style={{height:'350px', minWidth: '100%',position:'relative',backgroundColor:'#000000', borderRadius:'16px'}}>
                <img width='100%' height='350px' style={{objectFit:'cover', borderRadius:'16px', minWidth:'100%', aspectRatio:'16 / 9'}} 
                src={viewPostType==='BLOG'? viewPost?.coverPhoto : viewPostType==='PR' ? pr_legend : rsa_legend} />

                <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%', background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',borderRadius:'16px',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                <Typography style={{padding: '20px 30px 0px 30px'}} variant='h4' fontWeight='600'>{viewPost?.title}</Typography><br/>
                <span style={{display:'flex',alignItems:'center',padding: '0px 30px 20px 30px',justifyContent:'space-between'}} >
                    <span style={{display:'flex',alignItems: 'center',justifyContent:'flex-start'}}>
                        <Avatar src={viewPost?.authorImage} alt={viewPost?.authorName} sx={{height:'30px',width:'30px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500'> 
                        &nbsp;&nbsp;&nbsp;&nbsp;{viewPost?.authorName}&nbsp;&nbsp;{viewPostType==='PR' && <span>&#8226;&nbsp;&nbsp;{`Lv ${viewPost?.level}`}</span>}
                        </Typography>
                    </span>
                    <Typography variant='caption' color='#a1a1a1'> 
                    &nbsp;&nbsp;{moment(viewPost?.createdAt).fromNow()}
                    </Typography>
                </span>
                </div>
            </div>
            <br/><br/>
            <Divider/>
            <br/>
            <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'32px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',justifyContent:'start'}} 
                options={
                {wrapper : 'p'},
                { overrides: {
                    p :{ component: Typography , props: {variant : 'body1'}}, 
                    a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'} },
                    img : { props : {width : '100%',height:'300px',style:{justifySelf:'center',objectFit:'cover'} }},
                    iframe : { props : {width : '100%', height : '300', frameborder : '0',style:{justifySelf:'center'} }},
                    code : { component:Typography ,props : { variant:'code-small' }},
                    blockquote : {props : { style:{backgroundColor:'#001C28',borderRadius:'16px', padding:'20px 20px 20px 20px'} }}
                },
            }}>
            { he.decode(`${viewPost?.content}`) }
            </Markdown>
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
            <Button disabled={feedbackOpen} variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}>
                <Typography variant='button' fontWeight='600' >{`Approve ${viewPost?.totalLevels===viewPost?.level ? 'and Award Certificate':''}`}</Typography>
                <Typography variant='caption' >{viewPost?.totalLevels===viewPost?.level ? 'Certificate will be awarded for Course completion.' :'Post becomes public.'}</Typography>
            </Button> <br/>
            <Button variant='contained' disabled={feedbackOpen} color='warning' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}} onClick={()=>(setFeedbackOpen(true))} >
                <Typography variant='button' fontWeight='600'>Flag and provide feedback</Typography>
                <Typography variant='caption' >write a feedback on how they can improve this and approve when you are satisfied.</Typography>
            </Button>
            <br/>
            { feedbackOpen && <Grow in>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                <TextField  value={feedback} onChange={(e)=>(setFeedback(e.target.value))} fullWidth
                variant='outlined' color='secondary' label='Feedback' placeholder='your feedback...' multiline maxRows={5} inputProps={{maxLength : 360}}/>
                <br/>
                <div>
                <Button onClick={()=>(setFeedbackOpen(false))} style={{justifySelf:'flex-end'}} color='secondary' variant='outlined'>
                    cancel
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;    
                <Button onClick={submitFeedback} style={{justifySelf:'flex-end'}} color='secondary' variant='contained'>
                    submit feedback
                </Button>
                </div>
            </div>
            </Grow>}
            </>
            }
            { (viewPost?.feedback && authUser?.currentRole==='STU') &&
            <Card>
                <Typography variant='button' >Feedback :</Typography><br/>
                <Typography variant='body2' >{viewPost?.feedback}</Typography>
            </Card>
            }
            <br/>
            { authUser.id===viewPost?.authorId &&
            <Button variant='contained' color='secondary' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
            onClick={()=>{dispatch({type:'SET_EDIT_ID',payload:{id:viewPost?.slug, type: viewPostType}});dispatch({type:'OPEN_EDIT'})}}>
                <Typography variant='button' fontWeight='600' >Edit</Typography>
                {authUser?.currentRole!=='INS' &&
                <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
                }
            </Button>}
            
        </div>
        }
        </div>
        </div>
        </Dialog>
    )
}

export default DbViewPost;
