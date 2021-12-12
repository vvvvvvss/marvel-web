import { Paper, Typography, IconButton, Chip, Avatar, Link, Divider, Button, Skeleton} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/dashboard.js";
import { useEffect } from "react";
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import he from 'he';
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import { Box } from "@mui/system";

const PostPage = ({viewPostType}) => {
    const { viewPost, isViewLoading} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const location = useLocation();
    const {authUser} = useSelector(state => state.auth);
    const {id} = useParams();
    console.log(viewPostType);
    useEffect(() => {
            dispatch(getPost( viewPostType ,id, 'page'));
    }, [dispatch,id]);

    const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
    const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

    return (
        <Paper variant="window" square sx={{width:'100vw',minHeight:'100vh',display:'flex',justifyContent:"center",backgroundColor:'#121212'}} >
        <Navbar/>
        <Box sx={{width:'100%',maxWidth:'650px',marginTop:'90px'}} >
        {/* TOP HERO  */}
        {isViewLoading ? 
        <div style={{display:'flex',justifyContent :'center', width:'100%'}}>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',maxWidth:'650px',borderRadius:'18px',height:'300px'}}/>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',maxWidth:'650px',borderRadius:'18px',height:'16px'}}/>
            <Skeleton variant="text" animation='wave' sx={{width:'100%',maxWidth:'650px',borderRadius:'18px',height:'16px'}}/>
        </div> 
        :
        <div style={{height:'350px', width: '100%',position:'relative',backgroundColor:'#000000',maxWidth:'650px',borderRadius:'18px'}}>
            <img width='100%' height='350px' style={{objectFit:'cover', minWidth:'100%', aspectRatio:'16 / 9',borderRadius:'18px'}} 
            src={viewPostType==='blog'? viewPost?.coverPhoto : viewPostType==='pr' ? pr_legend :viewPostType==='rsa'? rsa_legend:''} />

            <div style={{position:'absolute',left:'0px',bottom:'0px',width: '100%',height:'100%',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',borderRadius:'18px'}}>
            <Typography sx={{padding: '20px 30px 0px 30px'}} variant='h4' fontWeight='600'>{viewPost?.title}</Typography><br/>
                <span style={{display:'flex',alignItems:'center',padding: '0px 30px 20px 30px',justifyContent:'space-between'}} >
                    <span style={{display:'flex',alignItems: 'center',justifyContent:'flex-start'}}>
                        <Avatar src={viewPost?.authorImage} alt={viewPost?.authorName} sx={{height:'30px',width:'30px'}} />
                        <Typography variant='body2' color='#c4c4c4' fontWeight='500'> 
                        &nbsp;&nbsp;&nbsp;&nbsp;{viewPost?.authorName}&nbsp;&nbsp;
                        {["rsa","pr"].includes(viewPostType) && <span>&#8226;&nbsp;&nbsp;{viewPost?.courseCode}</span>}
                        {viewPostType==='pr'&&<span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;{`Level ${viewPost?.level}`}</span>}
                        </Typography>
                    </span>
                    <Typography variant='caption' color='#a1a1a1'> 
                    &nbsp;&nbsp;{moment(viewPost?.createdAt).fromNow()}
                    </Typography>
                </span>
            </div>
        </div>}
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
        { authUser.id===viewPost?.authorId &&
        <Button variant='contained' color='secondary' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
        onClick={()=>{dispatch({type:'SET_EDIT_ID',payload:{id:viewPost?.slug, type: viewPostType}});dispatch({type:'OPEN_EDIT'})}}>
            <Typography variant='button' fontWeight='600' >Edit</Typography>
            {authUser?.currentRole!=='INS' &&
            <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
            }
        </Button>}
        </Box>
        </Paper>
    )
}

export default PostPage;

