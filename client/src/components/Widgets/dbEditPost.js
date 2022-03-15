import { AppBar, CircularProgress, Dialog, IconButton, Toolbar, Typography, TextField, Paper, Link, Chip, Button } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ImageUploading from 'react-images-uploading';
import ImageCompressor from 'browser-image-compression';
import ReactMde from 'react-mde';
import Markdown from 'markdown-to-jsx';
import "./react-mde-all.css";
import sanitizer from 'sanitize-html';
import he from 'he';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getPost, editPost } from "../../API/index.js";

const DbEditPost = ({postType, slug, open, setOpen}) => {
    const queryClient = useQueryClient()
    const [editorTab, setEditorTab] = useState('write');
    const [newTag, setNewTag] = useState('');
    const [formData, setFormData] = useState({
        title : '', content : '', tags : [ ], coverPhoto : ''
    });
    //getting post data
    const {data:postData, isLoading:isPostLoading} = useQuery(
        [postType,slug], 
        ()=>getPost(postType,slug),
    );
    useEffect(() => {
        if(["403","404","BRUH"].includes(postData?.status)){
            setOpen(false);
        }else{
            setFormData({
                title : postData?.post?.title, content : postData?.post?.content, 
                tags : postData?.post?.tags, coverPhoto : postData?.post?.coverPhoto
            })
        }
    }, [postData])
    //mutation
    const {mutate:submitEdit, isLoading:isEditLoading, data:editResponse} = useMutation(
        ()=>(editPost(formData, postData?.post?._id, postType)),
        {
            onSuccess: (response)=>{
                if(["403","404","401","BRUH"].includes(response?.status)){
                    return alert("Could'nt complete your request to edit. Reason: Bad request.");
                }else{
                    queryClient.setQueryData([postType,slug], (prev)=>({...prev, post:response?.post}));
                    setOpen(false);
                }
            },
            onError: (err)=>{
                return alert("Something went wrong on our side. could'nt complete your edit.");
            }
            
        })


    const handleImageUpload = async (imageList) => {
        const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1080, useWebWorker: true };
        try {
          const compressedImage = await ImageCompressor(imageList[0]?.file, options);
          const reader = new FileReader(); reader.readAsDataURL(compressedImage);
          reader.onloadend = ()=>{ setFormData({...formData, coverPhoto : reader?.result}); }
        } catch (error) { console.log(error); }
    };
  
    const handleSubmit = (e)=>{
    e.preventDefault();
    if(postType==='PR' || postType==='RSA'){
        if(!formData?.title) return alert('Title of your project report cannot be empty.')
        if(!formData?.content)return alert('The content of your Project Report cannot be empty!');
    }else if(postType==='BLOG'){
        if(!formData?.content) return alert('The content of your Blog Post cannot be empty!');
        if(!formData?.coverPhoto) return alert('Cover photo is required for blog posts.');
    }
    submitEdit();
    }

    return (
        <>
        <Dialog fullScreen open={open} onClose={()=>(setOpen(false))} >
            <AppBar>
                <Toolbar>
                    <IconButton onClick={()=>(setOpen(false))}><CloseIcon/></IconButton>
                    <Typography variant='h6' >{`Edit ${postType==='rsa'?'Resource Article': postType.toUpperCase()}`}</Typography>
                </Toolbar>
            </AppBar>
            <div style={{display: 'flex', justifyContent: 'center',padding : '90px 10px 90px 10px'}}>
                {isPostLoading ? <CircularProgress/> : 
                <div style={{width:'100%', maxWidth:'700px'}} >
                    
                <TextField value={formData?.title} onChange={(e)=>(setFormData({...formData, title : e.target.value}))}
                fullWidth variant='outlined' placeholder='An interesting title' label='Title' required inputProps={{maxLength : 80}}
                InputProps={{style:{fontSize : '13px', lineHeight:'24px'}}} color='secondary'/>
                <br/><br/>

                {/* IMAGE UPLOAD */}
                {postType==='blog' && <ImageUploading onChange={handleImageUpload} dataURLKey="data_url" >
                {({ onImageUpload, dragProps, }) => (
                    <div style={{display: 'grid',gridTemplateColumns:`${formData?.coverPhoto ? '1fr 1fr' : '1fr'}`,gridGap: '15px', height:'150px'}}>
                    <Paper variant='widget'
                        style={{display: 'flex', justifyContent: 'center',alignItems: 'center',cursor:'pointer',maxHeight: '120px'}}
                        onClick={()=>{setFormData({...formData, coverPhoto : ''});onImageUpload();}} 
                        {...dragProps}
                    >
                        <Typography variant='caption'>Cover Photo. Click or Drop here</Typography>
                    </Paper>
                    {formData?.coverPhoto &&
                    <div style={{maxHeight: '150px',minHeight:'100%',}}>
                    <img src={formData?.coverPhoto} alt='cover photo' height='150'width='100%' style={{borderRadius:'12px',objectFit:'cover'}}/>
                    </div>
                    }
                    </div>
                )}
                </ImageUploading>}

                <br/>
                {/* DESCRIPTION MARKDOWN */}
                <Paper className='container'><ReactMde 
                value={formData?.content} label='content'
                onChange={(e)=>(setFormData({...formData, content : e}))}
                selectedTab={editorTab}
                onTabChange={()=>(setEditorTab( editorTab==='write' ? 'preview' : 'write' ))}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(
                    <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'24px'}} 
                    options={{
                    wrapper : 'div',
                    overrides: {
                        p :{ component: Typography , props: {variant : 'body2', lineHeight:'24px'}}, 
                        a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'} },
                        img : { props : {width : '100%',height:'150px',style:{objectFit:'cover'} }},
                        iframe : { props : {width : '100%', height : '315', frameBorder : '0'}},
                        code : { component:Typography ,props : { variant:'code-small' }}
                    },
                }}>
                { he.decode(sanitizer(`${markdown}`, {
                        allowedTags: ['iframe','br','strong'], allowedAttributes: { 'iframe': ['src'] },
                        allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
                }))}
                </Markdown>
                ).catch(()=>(alert("could not parse your markdown")))
                }
                />
                </Paper>
                <br/>
                
                {/* CHIPS */}
                <Paper variant='widget'>
                <TextField fullWidth color='secondary' value={newTag}
                onChange={(e)=>{
                    if(e.nativeEvent?.data === ','){
                    if(formData?.tags?.length < 8){
                        if(formData?.tags?.includes(e.target?.value?.slice(0,-1))) return alert(`You've already added that tag`);
                        setFormData({...formData, tags : [...formData?.tags, e.target?.value?.slice(0,-1)]})
                        setNewTag('');
                    }else{alert('Maximum number of tags is 8');}
                    }else{
                    setNewTag(`${e.target.value}`);
                    }
                }} 
                label='Relevant Tags' placeholder='Press comma ( , ) after each tag to add.'
                />
                {/* <br/><br/> */}
                {formData?.tags?.map((tag)=>(
                    <span key={tag}>
                    <Chip style={{marginTop : '10px'}} key={tag} label={tag} variant='outlined' color='secondary'
                    onDelete={()=>(setFormData({...formData, tags : formData?.tags.filter((i)=>(i!==tag))}))}/>
                    &nbsp;&nbsp;
                    </span>
                ))}
                </Paper>
                
                <br/>
                <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size='large' disabled={isEditLoading} onClick={handleSubmit} variant='contained'>
                    { isEditLoading ? <CircularProgress/> : 'Submit'}
                </Button>
                
                </div>
                </div>
                }
            </div>
        </Dialog>  
        </>
    )
}

export default DbEditPost;
