import { Dialog, Typography, IconButton,AppBar,Toolbar, CircularProgress, Chip, Avatar, Link, Divider} from "@mui/material";
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

    useEffect(() => {
        dispatch(getPost(viewPostType,viewPostId));
    }, [])

    console.log(isViewLoading, viewPost);
    return (
        <Dialog open={viewPostOpen} fullScreen onClose={()=>(dispatch({type:'CLOSE_VIEW'}))} >
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>{dispatch({type:'CLOSE_VIEW'});}} ><CloseIcon/></IconButton>
            <Typography variant='h6' >{`${viewPostType} Review`}</Typography>
        </Toolbar>
        </AppBar>
        <div style={{display:'flex',justifyContent:'center',padding: '0px 20px 0px 20px'}} >
        <div style={{paddingTop:'90px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',maxWidth:'650px'}}>
        
        {isViewLoading ? <CircularProgress/> :
         <div>
            <div style={{height:'350px', width: '100%',position:'relative',backgroundColor:'#000000', borderRadius:'16px'}}>
                <img width='100%' height='350px' style={{objectFit:'cover', borderRadius:'16px'}} src={viewPost?.coverPhoto} />
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
                    code : { component:Typography ,props : { variant:'code-small' }}
                },
            }}>
                { he.decode(viewPost?.content) }
            </Markdown>
            <br/>
            <Divider/>
        </div>
        }
        </div>
        </div>
        </Dialog>
    )
}

export default DbViewPost;
