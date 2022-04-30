import { Dialog, Typography, IconButton,AppBar,Toolbar, CircularProgress, Chip, Avatar,
     Divider, Button, Card, TextField, DialogActions,DialogContent,DialogContentText, DialogTitle,
    Alert, Snackbar, Slide} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import moment from 'moment';
import { Box } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPost, deletePost, approve, submitFeedback } from "../../API/index.js";
import useHashParams from "../../utils/hooks/useHashParams.js";
import { useNavigate } from "react-router-dom";
import colorDecide from "../../utils/functions/colorDecide.js";
import DbEditPost from './dbEditPost.js';
import useAuth from "../../utils/hooks/useAuth.js";
import RenderMarkdown from "../RenderMarkdown.js";

const rsa_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/rsa_legend_g6tbkc.png';
const pr_legend = 'https://res.cloudinary.com/marvelweb/image/upload/v1637583504/pr_legend_xaoxm6.png';

const DbViewPost = () => {
    const hashParams = useHashParams();
    const viewOpen = hashParams?.mode==='view';
    const slug = hashParams?.slug;
    const postType = hashParams?.type;
    const navigate = useNavigate();
    const {authUser} = useAuth();

    if((!["pr", "blog", "rsa"].includes(postType)&&viewOpen) ||
      (authUser?.currentRole==="STU"&&postType==='rsa')){ navigate({hash:""}); }

    const [feedbackOpen, setFeedbackOpen] = useState(false);//feedback textfield open and close
    const [feedback, setFeedback] = useState('');
    const [approveConfirm, setApproveConfirm] = useState(false);//approve modal
    const [delConfirm, setDelConfirm] = useState(false);//delete confirm modal
    const [editOpen, setEditOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});
    const queryClient = useQueryClient();
    //getting post
    const {data:postData, isLoading:isPostLoading} = useQuery([postType,slug], 
        ()=>getPost(postType,slug),
        {enabled:viewOpen}
    );
    const post = postData?.post; const postStatus = postData?.status;
    

    const {mutate:sendFeedback, isLoading:isFeedbackLoading} = useMutation(()=>(submitFeedback(feedback, post?._id, postType)),
    {
        onSuccess: (response) => {
            if(["403","404","BRUH"].includes(response?.status)){
                alert("Something went wrong and we could'nt submit feedback. Reason: Bad request.");
            }else{
                queryClient.setQueriesData([{nature:'feed',place:'dashboard',widget:'review', postType:postType,authUser:authUser}],
                (prev)=>{
                    const newData = { ...prev, pages: prev?.pages?.map((page)=>({...page, posts: page?.posts?.filter((p)=>(p?._id!==post?._id))}))}
                    if(newData?.pages?.[0]?.posts?.length===0){
                        newData?.pages?.shift();
                    }
                    return newData;
                }
                );
                queryClient.invalidateQueries([{nature:'feed', place:'profile', profileSlug:post?.authorSlug, postType:postType}]);
                navigate({hash:""});
            }
        },
        onError: () => {
            alert("Something went wrong on our side. Could'nt submit feedback.");
        }
    }
    );

    const {mutate:sendApprove, isLoading:isApproveLoading} = useMutation(()=>(approve(post?._id, postType)),
    {
        onSuccess: (response) => {
            if(["403","404","BRUH"].includes(response?.status)){
                alert("Something went wrong and we could'nt approve. Reason: Bad request.");
            }else{
                queryClient.setQueriesData([{nature:'feed',place:'dashboard', widget:'review', postType:postType, authUser:authUser}],
                (prev)=>{
                    const newData = { ...prev, pages: prev?.pages?.map((page)=>({...page, posts: page?.posts?.filter((p)=>(p?._id!==post?._id))}))}
                    if(newData?.pages?.[0]?.posts?.length===0){
                        newData?.pages?.shift();
                    }
                    return newData;
                }
                );
                queryClient.invalidateQueries([{nature:'feed', place:'profile', profileSlug:post?.authorSlug, postType:postType}]);
                navigate({hash:""});
            }
        },
        onError: () => {
            alert("Something went wrong on our side. Could'nt approve.");
            setApproveConfirm(false);
        }
    }
    );

    const {mutate:sendDelete, isLoading:isDeleteLoading} = useMutation(()=>(deletePost(post?._id, postType)),
    {
        onSuccess: (response) => {
            if(["403","404","BRUH"].includes(response?.status)){
                alert("Something went wrong and we could'nt delete. Reason: Bad request.");
            }else{
                queryClient.setQueryData([postType, slug], ()=>({post:null, status:'404'}));
                queryClient.setQueriesData([{nature:'feed',postType:postType}], (prev)=>{
                    const newData = { ...prev, pages: prev?.pages?.map((page)=>({...page, posts: page?.posts?.filter((p)=>(p?._id!==post?._id))}))}
                    if(newData?.pages?.[0]?.posts?.length===0){
                        newData?.pages?.shift();
                    }
                    return newData;
                });
                navigate({hash:""});
                setDelConfirm(false);
                setAlertInfo({open:true, message:'Successfully Deleted!',severity:'success'});
            }
        },
        onError: () => {
            alert("Something went wrong on our side. Could'nt delete.");
            setDelConfirm(false);
        }
    }
    );
    return (
    <>
        {alertInfo?.open && <Snackbar open={alertInfo?.open} autoHideDuration={8000} 
            TransitionComponent={(props)=><Slide direction="up" {...props}/>}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}} 
            onClose={()=>(setAlertInfo({...alertInfo, open:false}))}>
            <Alert variant="filled" onClose={()=>(setAlertInfo({...alertInfo, open:false}))} 
            severity={alertInfo?.severity}>
                {alertInfo?.message}
            </Alert>
        </Snackbar>}

        <Dialog open={viewOpen} fullScreen onClose={()=>navigate({hash:""})} >
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>navigate({hash:""})} ><CloseIcon/></IconButton>
            <Typography variant='h6' >
                {`${postType==='pr'?'Project Report' : postType==='blog' ? 'Blog post' : 'Resource Article'}`}
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{display:'flex',justifyContent:'center',padding: '0px 20px 30px 20px'}} >
        <div style={{paddingTop:'90px',display:'grid',gridTemplateColumns:'1fr',gap:'10px',maxWidth:'650px'}}>
        
        {isPostLoading ? <CircularProgress/> :
        ["403","404","BRUH"].includes(postStatus)?
        <Typography variant="h2" sx={{position:'relative',top:'50%',bottom:'50%',color:'#a1a1a1',fontWeight:'900'}} >
            4😭4
        </Typography> :
         <div>
            <Box sx={{height:{xs:'auto',lg:'350px'}, width: '100%',position:'relative', 
            background:`url(${postType==='blog'? post?.coverPhoto : postType==='pr' ? pr_legend :postType==='rsa'? rsa_legend:''})`,
            maxWidth:'650px',borderRadius:'12px',border:'1px solid #D3FFFF', aspectRatio:'16 / 9', backgroundSize:'cover'}}>
          
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
            <RenderMarkdown content={post?.content} />
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
            { authUser?.currentRole==='STU' && 
            <Chip label={postType==='rsa' ? 'PUBLIC' : post?.reviewStatus } color={postType==='rsa'?'success': colorDecide(post?.reviewStatus)} variant='filled'/> 
           }
            <br/>
            { (authUser?.currentRole==='INS' && post?.authorId !== authUser?.id) &&
            <>
            <Button disabled={feedbackOpen} variant='contained' color='success' fullWidth style={{textTransform:'none', display:'flex',flexDirection:'column'}}
            onClick={()=>(setApproveConfirm(true))}>
                <Typography variant='button' fontWeight='600' >{`Approve ${(post?.totalLevels===post?.level&&postType==='pr') ? 'and Award Certificate':''}`}</Typography>
                <Typography variant='caption'>{post?.totalLevels===post?.level&&postType==='pr' ? 'Certificate will be awarded for Course completion.' : postType==='pr'? 'Student proceeds to next level and report becomes public.' : 'Blog becomes public'}</Typography>
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
                <Button disabled={isFeedbackLoading} onClick={()=>(setFeedbackOpen(false))} style={{justifySelf:'flex-end'}} color='secondary' variant='outlined'>
                    cancel
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;    
                <Button disabled={isFeedbackLoading || feedback?.length===0} onClick={()=>sendFeedback()} style={{justifySelf:'flex-end'}} color='secondary' variant='contained'>
                    {isFeedbackLoading ? <CircularProgress/> :'submit feedback'}
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
            onClick={()=>setEditOpen(true)}>
                <Typography variant='button' fontWeight='600' >Edit</Typography>
                {authUser?.currentRole!=='INS' &&
                <Typography variant='caption' fontWeight='500'>Your post will be reviewed again after you edit.</Typography>
                }
            </Button><br/>
            { postType!=='pr'&& 
            <Button variant='contained' fullWidth sx={{textTransform:'none', display:'flex',flexDirection:'column',backgroundColor:'error.dark'}}
            onClick={()=>setDelConfirm(true)}>
                <Typography variant='button' fontWeight='600'>Delete</Typography>
            </Button>}
            </>}
            
        </div>
        }

        </div>
        <Dialog
            open={approveConfirm || delConfirm}
            onClose={()=>{setApproveConfirm(false);setDelConfirm(false)}}
        >
            <DialogTitle>
            {approveConfirm?"Are you sure you want to Approve?":delConfirm?'Are you sure?':''}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                {approveConfirm ? `By approving, the 
                ${post?.level===post?.totalLevels&&postType==='pr' ? 
                "Student will be awarded the certificate of course completion and their course session will be completed.":
                postType==='pr' ? 
                "Student will proceed to next level and this Project report will become public. ":
                "Blog post will become public for others to see. "}
                This action CANNOT be undone.` : 
                delConfirm ? `You're about to DELETE this 
                ${postType==='blog'?'Blog post' : 'Resource Article'}. This CANNOT be undone.`:''}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{setApproveConfirm(false);setDelConfirm(false)}} 
            color='secondary' 
                variant='outlined' disabled={isDeleteLoading || isApproveLoading}>Disagree
            </Button>
            <Button onClick={approveConfirm ? ()=>sendApprove() : delConfirm ? ()=>sendDelete() : ()=>{}} 
                variant='contained' color={delConfirm?'error':'secondary'}
                disabled={isDeleteLoading || isApproveLoading} >
                {isDeleteLoading || isApproveLoading ? <CircularProgress/> : 'agree'}
            </Button>
            </DialogActions>
        </Dialog>
        </div>

        {editOpen&&<DbEditPost open={editOpen} setOpen={setEditOpen} postType={postType} slug={slug} />}

        </Dialog>
    </>
    )
}

export default DbViewPost;
