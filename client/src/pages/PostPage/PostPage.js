import { Paper, Typography, IconButton, Chip, Avatar, Link, Divider, Button, Skeleton, 
    CircularProgress} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/dashboard.js";
import { useEffect } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';
import { useParams, useHistory, Link as Rlink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import { Box } from "@mui/system";
import {getSearchFeed} from '../../actions/other.js';
import ShareIcon from '@mui/icons-material/Share';
import PostCard from "../../components/PostCard.js";
import DbEditPost from "../../components/Widgets/dbEditPost.js";

const PostPage = ({viewPostType}) => {
    const { viewPost, isViewLoading, editPostOpen} = useSelector(state => state.dashboard);
    const { feed, isFeedLoading} = useSelector(state => state.other);
    const dispatch = useDispatch();
    const history = useHistory();
    const {authUser} = useSelector(state => state.auth);
    const {id} = useParams();

    useEffect(() => {
        dispatch(getPost( viewPostType ,id, 'page',history));
    }, [dispatch,id]);

    useEffect(() => {
        dispatch(getSearchFeed(viewPostType, null, null, null, null, viewPost?.tags?.join(','), 1, 'rec'));
        return () => {
            dispatch({type:'CLEAR_FEED'});
        }
    }, [id, dispatch,viewPostType]);

    const handleShare = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        } catch (error) {
            alert("Coud'nt copy link to clipboard :(");
        }
    };

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
            <Skeleton variant="rectangular" animation='wave' sx={{width:{xs:"100%",md:'650px'},borderRadius:'12px',height:'300px'}}/><br/>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',borderRadius:'12px',height:'24px'}}/>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',borderRadius:'12px',height:'24px',marginTop:'5px'}}/>
        </div> 
        :
        <>
        <div style={{height:{xs:'auto',lg:'350px'}, width: '100%',position:'relative',backgroundColor:'#000000',maxWidth:'650px',borderRadius:'12px',border:'1px solid #D3FFFF'}}>
            <img width='100%' style={{objectFit:'cover', minWidth:'100%', aspectRatio:'16 / 9',borderRadius:'12px'}} 
            src={viewPostType==='blog'? viewPost?.coverPhoto : viewPostType==='pr' ? pr_legend :viewPostType==='rsa'? rsa_legend:''} />
            
            <IconButton onClick={handleShare}
            sx={{position:'absolute',top:'10px',right:'10px',color:'primary.light',zIndex:'100',
            backgroundColor:'rgba(0,0,0,0.5)',":hover":{backgroundColor:'rgba(0,0,0,0.5)'}}}>
            <ShareIcon/></IconButton>
            
            <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',borderRadius:'12px'}}>
            <Typography sx={{padding: '20px 30px 0px 30px',fontWeight:{xs:'500',lg:'600',fontSize:{xs:'24px',lg:'45px'}}}} variant='h4'>{viewPost?.title}</Typography><br/>
                <span style={{display:'flex',alignItems:'center',padding: '0px 30px 20px 30px',justifyContent:'space-between'}} >
                    <span style={{display:'flex',alignItems: 'center',justifyContent:'flex-start'}}>
                        <Avatar src={viewPost?.authorImage} alt={viewPost?.authorName} sx={{height:'30px',width:'30px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500'> 
                        <Rlink style={{textDecoration:'none',color:'inherit'}} to={`/profile/${viewPost?.authorSlug}`}>&nbsp;&nbsp;&nbsp;&nbsp;{viewPost?.authorName}&nbsp;&nbsp;</Rlink>
                        {["rsa","pr"].includes(viewPostType) && <span>&#8226;&nbsp;&nbsp;{viewPost?.courseCode}</span>}
                        {viewPostType==='pr'&&<span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;{`Level ${viewPost?.level}`}</span>}
                        </Typography>
                    </span>
                    <Typography variant='caption' color='#a1a1a1'> 
                    &nbsp;&nbsp;{moment(viewPost?.createdAt).fromNow()}
                    </Typography>
                </span>
            </div>
        </div>
        <br/>
        <Divider/>
        <br/>
        <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'32px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',justifyContent:'start',maxWidth:'650px'}} 
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
        <div style={{display:'flex',justifyContent:'flex-start',maxWidth:'650px'}}>
                { viewPost?.tags?.map((tag)=>(
            <Chip label={tag} key={tag} variant='outlined' size='medium' color='primary' style={{margin : '4px 8px 4px 0px'}}/>
        ))}
        </div>
        <br/>
        <Divider/>
        <br/>
        { authUser?.id===viewPost?.authorId &&
        <Button variant='contained' color='secondary' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
        onClick={()=>{dispatch({type:'SET_EDIT_ID',payload:{id:viewPost?.slug, type: viewPostType.toUpperCase()}});dispatch({type:'OPEN_EDIT'})}}>
            <Typography variant='button' fontWeight='600' >Edit</Typography>
            {authUser?.currentRole!=='INS' &&
            <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
            }
        </Button>}
        </>
        }
        {/* end of left part  */}
        </Box>
        {/* right part  */}
        <Box sx={{justifySelf:{xs:'flex-start',lg:'flex-start'},width:'100%'}}>
            <Typography variant="widget-heading" component='div' sx={{width:'100%'}}>
                Similar {`${viewPostType==='pr'?'Project Reports':viewPostType==='blog'?'Blog Posts':viewPostType==='rsa'?'Resource Articles':''}`}:
            </Typography>
        <br/>
        <Box sx={{display:'grid', gridTemplateColumns:'1fr',gap:'20px'}}>
            {isFeedLoading ? <CircularProgress/> : 
            feed?.length===0 ? 
            <Typography variant="h6" fontWeight='600' color='#808080'>We found nothing</Typography>: 
            feed?.map((p)=>(p?.slug !== id &&
                <PostCard post={p} variant='media' type={viewPostType} scope='else'  />
            ))}
        </Box>
        </Box>
        </Box>
        {editPostOpen && <DbEditPost/>}
        </Paper>
    )
}

export default PostPage;

