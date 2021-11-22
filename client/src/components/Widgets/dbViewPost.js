import { Dialog, Typography, IconButton,AppBar,Toolbar, CircularProgress, Chip, Avatar, Link, Divider, Button, Card} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { getPost } from "../../actions/dashboard.js";
import { useEffect } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';

const DbViewPost = () => {
    const {viewPostOpen, viewPostId, viewPostType, viewPost, isViewLoading} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const {authUser} = useSelector(state => state.auth)
    useEffect(() => {
        if(!viewPost || viewPost?.slug !== viewPostId){
            dispatch(getPost(viewPostType,viewPostId));
        }
    }, [])

    const colorDecide = (status) => {
        if(status==='PENDING') return 'warning';
        else if (status==='FLAGGED') return 'error';
        else if (status==='APPROVED' || 'FEATURED') return 'success';
    }
    const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
    const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

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
                src={viewPostType==='BLOG'? viewPost?.coverPhoto : viewPostType==='pr' ? pr_legend : rsa_legend} />

                <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%', background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',borderRadius:'16px',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                <Typography style={{padding: '20px 30px 0px 30px'}} variant='h4' fontWeight='600'>{viewPost?.title}</Typography><br/>
                <span style={{display:'flex',alignItems:'center',padding: '0px 30px 20px 30px',justifyContent:'space-between'}} >
                    <span style={{display:'flex',alignItems: 'center',justifyContent:'flex-start'}}>
                        <Avatar src={viewPost?.authorImage} alt={viewPost?.authorName} sx={{height:'30px',width:'30px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500'> 
                        &nbsp;&nbsp;&nbsp;&nbsp;{viewPost?.authorName}
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
            <Typography component='div' variant='body2' color='#c4c4c4'>Approval status :&nbsp;&nbsp;
            <Chip label={viewPostType==='RSA' ? 'PUBLIC' : viewPost?.reviewStatus } color={viewPostType==='RSA'?'success': colorDecide(viewPost?.reviewStatus)} variant='filled'/> 
            </Typography>
            <br/>
            { (authUser?.currentRole==='INS' && viewPost?.authorId !== authUser?.id) &&
            <>
            <Button variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}>
                <Typography variant='button' fontWeight='600' >Approve</Typography>
                <Typography variant='caption' >It becomes public. Student can share with anybody and it appears in their profile page.</Typography>
            </Button>
            <Button variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}>
                <Typography variant='button' fontWeight='600' >Approve</Typography>
                <Typography variant='caption' >It becomes public. Student can share with anybody and it appears in their profile page.</Typography>
            </Button>
            <Button variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}>
                <Typography variant='button' fontWeight='600' >Approve</Typography>
                <Typography variant='caption' >It becomes public. Student can share with anybody and it appears in their profile page.</Typography>
            </Button>
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
