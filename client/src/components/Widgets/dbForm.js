import { AppBar, Toolbar, IconButton,Typography,Button, TextField, Paper, Link, Chip, CircularProgress, Dialog, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ImageUploading from 'react-images-uploading';
import ImageCompressor from 'browser-image-compression';
import ReactMde from 'react-mde';
import Markdown from 'markdown-to-jsx';
import "./react-mde-all.css";
import sanitizer from 'sanitize-html';
import { createPost } from "../../actions/dashboard.js";
import he from 'he';

const DbForm = () => {
    const {isCreateLoading, formType, formOpen} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        title : '', content : '', tags : [ ], coverPhoto : '', courseCode : ''
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

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(formType==='PR' || formType==='RSA'){
        if(!formData?.title) return alert(`Title of your ${formType==='PR' ? 'Project Report' : 'Resource Article'} cannot be empty.`)
        if(!formData?.content)return alert(`The content of your ${formType==='PR' ? 'Project Report' : 'Resource Article'} cannot be empty!`);
        else {dispatch(createPost(formData, formType));}
      }else if(formType==='BLOG'){
        if(!formData?.content) return alert('The content of your Blog Post cannot be empty!');
        if(!formData?.coverPhoto) return alert('Cover photo is required for blog posts.');
        else {dispatch(createPost(formData, formType));}
      }
    }

    return (
        <>
        <Dialog open={formOpen} fullScreen onClose={()=>(dispatch({type:'CLOSE_FORM'}))} >
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>{dispatch({type:'CLOSE_FORM'});}} ><CloseIcon/></IconButton>
            <Typography variant="h6" component="div">
            {formType==='PR' ? `Project Report Lvl ${authUser?.currentLevel}` : formType==='RSA' ? 'Resource Article' : 'Blog'}
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{padding : '90px 10px 90px 10px',width:'100%', maxWidth:'700px'}}>
        
        <TextField value={formData?.title} onChange={(e)=>(setFormData({...formData, title : e.target.value}))}
        fullWidth variant='outlined' placeholder='An interesting title' label='Title' required inputProps={{maxLength : 80}}
        InputProps={{style:{fontSize : '13px', lineHeight:'24px'}}} color='secondary'/>
        <br/><br/>

        {(authUser?.currentRole==='INS' && formType==='RSA') && 
        <FormControl fullWidth>
        <InputLabel color='secondary' id='course-select' >Course code</InputLabel>
        <Select color='secondary'
        labelId="course-select"
        value={formData?.courseCode}
        label="Course Code"
        onChange={(e)=>(setFormData({...formData, courseCode : e.target.value}))}
      >
        {authUser?.currentInsCourse.map((course)=>(
          <MenuItem key={course} value={course}>{course}</MenuItem>
        ))}
      </Select><br/></FormControl>}

        {/* IMAGE UPLOAD */}
        {formType==='BLOG' && <ImageUploading onChange={handleImageUpload} dataURLKey="data_url" >
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
              {wrapper : 'div'},
              { overrides: {
                  p :{ component: Typography , props: {variant : 'body2', lineHeight:'24px'}}, 
                  a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer', sx:{color:'primary.light'}} },
                  img : { props : {width : '100%',height:'300px',style:{objectFit:'cover'} }},
                  iframe : { props : {width : '100%', height : '315', frameborder : '0'}},
                  code : { component:Typography ,props : { variant:'code-small' }},
                  blockquote : {component:Typography ,props : { sx:{backgroundColor:'#132222',borderRadius:'8px', padding:'20px 20px 20px 20px',color:'secondary.light'} }}
              },
          }}>
            {
            he.decode( sanitizer(markdown, {
                allowedTags: ['iframe','br','strong','blockquote'], allowedAttributes: { 'iframe': ['src'] },
                allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
              }) ) }
          </Markdown>
          ).catch(()=>(alert("could'nt parse your markdown.")))
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
          <Button size='large' disabled={isCreateLoading} onClick={handleSubmit} variant='contained'>
            { isCreateLoading ? <CircularProgress/> : 'Submit'}
          </Button>
         
        </div>
        

        </div>
        </div>
        </Dialog></>
    )
}

export default DbForm;
