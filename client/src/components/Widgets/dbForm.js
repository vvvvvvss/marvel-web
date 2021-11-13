import { AppBar, Toolbar, IconButton,Typography,Button, TextField, Paper, Link, Chip, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ImageUploading from 'react-images-uploading';
import ImageCompressor from 'browser-image-compression';
import ReactMde from 'react-mde';
import Markdown from 'markdown-to-jsx';
import "./react-mde-all.css";
import sanitizer from 'sanitize-html';
import { createBlog, createPR } from "../../actions/dashboard";

const DbForm = ({setFormOpen, type}) => {
    const {isCreateLoading} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        title : '', content : '', tags : [ ], coverPhoto : ''
    });
    const [newTag, setNewTag] = useState('');
    const [editorTab, setEditorTab] = useState("write");
    const dispatch = useDispatch();

    const handleImageUpload = async (imageList) => {
      const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1080, useWebWorker: true };
      try {
        const compressedImage = await ImageCompressor(imageList[0]?.file, options);
        const reader = new FileReader(); reader.readAsDataURL(compressedImage);
        reader.onloadend = ()=>{ setFormData({...formData, coverPhoto : reader?.result}); }
      } catch (error) { console.log(error); }
      };

    const htmlDecode = (input)=> {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    const handleSubmit = ()=>{
      if(type==='PR'){
        if(!formData?.title) return alert('Title of your project report cannot be empty.')
        if(!formData?.content)return alert('The content of your Project Report cannot be empty!');
        else {dispatch(createPR(formData)); setFormOpen(false);}
      }else if(type==='BLOG'){
        if(!formData?.content) return alert('The content of your Blog Post cannot be empty!');
        if(!formData?.coverPhoto) return alert('Cover photo is required for blog posts.');
        else {dispatch(createBlog(formData)); setFormOpen(false);}
      }
    }

    return (
        <>
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>{setFormOpen(false);}} ><CloseIcon/></IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {type==='PR' ? `Project Report Lvl ${authUser?.currentLevel}` : 'Blog'}
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{padding : '90px 10px 90px 10px',width:'100%', maxWidth:'700px'}}>
        
        <TextField value={formData?.title} onChange={(e)=>(setFormData({...formData, title : e.target.value}))}
        fullWidth variant='outlined' placeholder='An interesting title' label='Title' required inputProps={{maxLength : 80}}
        InputProps={{style:{fontSize : '13px', lineHeight:'24px'}}} color='secondary'/>
        <br/><br/>

        {/* IMAGE UPLOAD */}
        {type==='BLOG' && <ImageUploading onChange={handleImageUpload} dataURLKey="data_url" >
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
            options={
              {wrapper : 'p'},
              { overrides: {
                  p :{ component: Typography , props: {variant : 'body2'}}, 
                  a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'} },
                  img : { props : {width : '100%' }},
                  iframe : { props : {width : '100%', height : '315', frameborder : '0'}},
                  blockquote : {props : {style : {color : '#c4c4c4'}}}
              },
          }}>
            {htmlDecode(sanitizer(markdown, {
                allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
                allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
              }))}
          </Markdown>
          )
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
          <Button size='large' onClick={handleSubmit} variant='contained'>
            { isCreateLoading ? <CircularProgress/> : 'Submit'}
          </Button>
         
        </div>
        

        </div>
        </div>
        </>
    )
}

export default DbForm;
