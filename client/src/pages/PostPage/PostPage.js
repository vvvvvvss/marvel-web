import { Paper, Typography, IconButton, Chip, Avatar, Link, Divider, Button, Skeleton, 
    CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPost, deletePost } from "../../actions/dashboard.js";
import { useEffect, useState } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';
import { useParams, Link as Rlink, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import { Box } from "@mui/system";
import {getSearchFeed} from '../../actions/other.js';
import ShareIcon from '@mui/icons-material/Share';
import PostCard from "../../components/PostCard.js";
import DbEditPost from "../../components/Widgets/dbEditPost.js";

const PostPage = () => {
    const { viewPost, isViewLoading, isCreateLoading} = useSelector(state => state.dashboard);
    const { feed, isFeedLoading} = useSelector(state => state.other);
    const dispatch = useDispatch();
    const location = useLocation();
    const viewPostType = location.pathname?.split("/")?.[1];
    const authUser = useSelector(state => state.auth.authUser);
    const {id} = useParams();
    const [delConfirm, setDelConfirm] = useState(false);

    useEffect(() => {
            dispatch(getPost( viewPostType ,id, 'page'));
        return () => {
            dispatch({type:"CLEAR_DASHBOARD"});
        }
    }, [dispatch,id]);

    useEffect(() => {
        if(viewPost?.slug){
            dispatch(getSearchFeed(viewPostType, null, null, null, null, viewPost?.tags?.join(','), 1, 'rec'));
        }
        return () => {
            dispatch({type:'CLEAR_FEED'});
        }
    }, [id, dispatch, viewPost?.slug]);

    const handleShare = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        } catch (error) {
            alert("Coud'nt copy link to clipboard :(");
        }
    };

    const handleDelete = ()=>{
        dispatch(deletePost(viewPost?.slug, viewPostType ,'page'));
    }

    const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
    const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

    return (
        //entire screen
        <Paper variant="window" square sx={{width:'100vw',minHeight:'100vh',display:'flex',justifyContent:"center",backgroundColor:'#121212'}} >
        <Navbar/>
        {/* entire page  */}
        <Box sx={{width:'max-content',maxWidth:'1580px',marginTop:'90px',display:'grid',gridTemplateColumns:{xs:'1fr',lg:'3fr 2fr'} ,gap:'30px',padding:'0px 20px 30px 20px',justifyContent:'center'}} >
        {/* left part  */}
        <Box sx={{maxWidth:'650px', justifySelf:{xs:'center',lg:'flex-end'},width:'100%'}}>
        {/* TOP HERO  */}
        {isViewLoading ? 
        <div style={{display:'flex',flexDirection:'column',alignItems:'center', width:'100%'}}>
            <Skeleton variant="rectangular" animation='wave' sx={{width:{xs:"100%",md:'650px'},borderRadius:'12px',height:'300px',minWidth:'300px'}}/><br/>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',borderRadius:'12px',height:'24px'}}/>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',borderRadius:'12px',height:'24px',marginTop:'5px'}}/>
        </div> 
        : viewPost?.status===404 ? 
        <Typography variant="h1" fontWeight={600} color='#313131' sx={{marginTop:'100px',transform:{xs:'translate(0px,0px)',md:'translate(90px,0px)'}}} >404</Typography>
        :
        viewPost?.slug &&
        <>
        <div style={{height:{xs:'auto',lg:'350px'}, width: '100%',position:'relative',backgroundColor:'#000000',maxWidth:'650px',borderRadius:'12px',border:'1px solid #D3FFFF'}}>
           <img width='100%' style={{objectFit:'cover', minWidth:'100%', aspectRatio:'16 / 9',borderRadius:'12px',minHeight:'100%'}} 
            src={viewPostType==='blog'? viewPost?.coverPhoto : viewPostType==='pr' ? pr_legend :viewPostType==='rsa'? rsa_legend:''} />
            
            <IconButton onClick={handleShare}
            sx={{position:'absolute',top:'10px',right:'10px',color:'primary.light',zIndex:'100',
            backgroundColor:'rgba(0,0,0,0.5)',":hover":{backgroundColor:'rgba(0,0,0,0.5)'}}}>
            <ShareIcon/></IconButton>
            
            <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',borderRadius:'12px'}}>
            <Typography sx={{padding:{xs:'20px 12px 0px 12px',md:'20px 30px 0px 30px'} ,fontWeight:{xs:'500',lg:'600'},fontSize:{xs:'22px',sm:'45px'}}} >{viewPost?.title}</Typography><br/>
                <Box sx={{display:'flex',alignItems:'center',padding:{xs:'0px 12px 12px 12px',md:'0px 30px 20px 30px'},justifyContent:'space-between'}} >
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-start',maxWidth:{xs:'70%',md:'100%'}}}>
                        <Avatar src={viewPost?.authorImage} alt={viewPost?.authorName} sx={{height:'30px',width:'30px',marginRight:'10px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500' > 
                        <Rlink style={{textDecoration:'none',color:'inherit'}} to={`/profile/${viewPost?.authorSlug}`}>
                            {viewPost?.authorName}&nbsp;&nbsp;
                        </Rlink>
                        {["rsa","pr"].includes(viewPostType) && 
                        <Rlink style={{textDecoration:'none',color:'inherit'}} to={`/course/${viewPost?.courseCode}`} >&#8226;&nbsp;&nbsp;{viewPost?.courseCode}</Rlink>
                        }
                        {viewPostType==='pr'&&<span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;{`Level ${viewPost?.level}`}</span>}
                        </Typography>
                    </Box>
                    <Typography variant='caption' color='#a1a1a1' > 
                    &nbsp;&nbsp;{moment(viewPost?.createdAt).fromNow()}
                    </Typography>
                </Box>
            </div>
        </div>
        <br/>
        <Divider/>
        <br/>
        <Typography sx={{fontSize:'14px', lineHeight:'36px'}} >
        <Markdown style={{display:'grid',gridTemplateColumns:'1fr',gap:'10px',justifyContent:'start',maxWidth:'650px'}} 
            options={
            {wrapper : 'p'},
            { overrides: {
                p :{ component: Typography , props: {variant : 'body1'}}, 
                a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'} },
                img : { props : {width : '100%',height:'300px',style:{justifySelf:'center',objectFit:'cover'} }},
                iframe : { props : {width : '100%', height : '300', frameBorder : '0',style:{justifySelf:'center'} }},
                code : { component:Typography ,props : { variant:'code-small' }},
                blockquote : {props : { style:{backgroundColor:'#001C28',borderRadius:'16px', padding:'20px 20px 20px 20px',margin:'0px'}}}
            },
        }}>
        { he.decode(`${viewPost?.content}`) }
        </Markdown>
        </Typography>
        <br/>
        <Divider/>
        <br/>
        <Box style={{maxWidth:'650px', whiteSpace: 'pre-wrap'}}>
                { viewPost?.tags?.map((tag)=>(
            <Chip label={tag} key={tag} variant='outlined' size='medium' color='primary' style={{margin : '4px 8px 4px 0px'}}/>
        ))}
        </Box>
        <br/>
        <Divider/>
        <br/>
        { authUser?.id===viewPost?.authorId &&
        <>
        <Button variant='contained' color='secondary' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
        onClick={()=>{dispatch({type:'SET_EDIT_ID',payload:{id:viewPost?.slug, type: viewPostType.toUpperCase()}});dispatch({type:'OPEN_EDIT'})}}>
            <Typography variant='button' fontWeight='600' >Edit</Typography>
            {authUser?.currentRole!=='INS' &&
            <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
            }
        </Button>
        <br/>
        { viewPostType!=='pr'&& 
        <Button variant='contained' fullWidth sx={{textTransform:'none', display:'flex',flexDirection:'column',backgroundColor:'error.dark'}}
        onClick={()=>{setDelConfirm(true);}}>
            <Typography variant='button' fontWeight='600'>Delete</Typography>
        </Button>}
        </>
        }
        </>
        }
        {/* end of left part  */}
        </Box>
        {/* right part  */}
        {viewPost?.status !==404 && 
        <Box sx={{justifySelf:{xs:'flex-start',lg:'flex-start'},width:'100%'}}>
            <Typography variant="widget-heading" component='div' sx={{width:'100%'}}>
                Similar {`${viewPostType==='pr'?'Project Reports':viewPostType==='blog'?'Blog Posts':viewPostType==='rsa'?'Resource Articles':''}`}:
            </Typography>
        <br/>
        <Box sx={{display:'grid', gridTemplateColumns:'1fr',gap:'20px'}}>
            {isFeedLoading||isViewLoading ? 
            <>
            <Skeleton sx={{width:'100%', height:'220px',borderRadius:'14px'}} variant="rectangular" animation="wave"/>
            <Skeleton sx={{width:'100%', height:'220px',borderRadius:'14px'}} variant="rectangular" animation="wave"/>
            <Skeleton sx={{width:'100%', height:'220px',borderRadius:'14px'}} variant="rectangular" animation="wave"/>
            </>
            : 
            feed?.length===0 ? 
            <Typography variant="h6" fontWeight='600' color='#808080'>We found nothing</Typography>: 
            feed?.map((p, i)=>(p?.slug !== id &&
                <PostCard post={p} variant='media' type={viewPostType} scope='else' key={i} />
            ))}
        </Box>
        </Box>}
        </Box>

        {/* editmodal */}
        <DbEditPost/>

        <Dialog
        open={delConfirm}
        onClose={()=>{setDelConfirm(false);}}
      >
        <DialogTitle>
          {'Are you sure?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You're about to DELETE this 
            ${viewPostType==='blog'?'Blog post' : 'Resource Article'}. This CANNOT be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setDelConfirm(false);}} color='secondary' 
            variant='outlined' disabled={isCreateLoading}>Disagree
          </Button>
          <Button onClick={handleDelete} 
            variant='contained' sx={{backgroundColor:'error.dark'}}
            disabled={isCreateLoading} >
            {isCreateLoading ? <CircularProgress/> : 'agree'}
          </Button>
        </DialogActions>
      </Dialog>
        </Paper>
    )
}
export default PostPage;

