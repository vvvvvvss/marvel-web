import { AppBar, Toolbar, IconButton,Typography,Button, TextField, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useState } from "react";
import ImageUploading from 'react-images-uploading';

const DbForm = ({setFormOpen, type}) => {
    const {syllabus} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        title : '', description : '', tags : [], coverPhoto : ''
    });

    const handleUpload = (imageList) => {
        setFormData({...formData, coverPhoto : imageList[0]?.data_url});
      };
    return (
        <>
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton
            edge="start"
            onClick={()=>{setFormOpen(false);}}
            >
            <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {type==='PR' ? `Project Report Lvl ${syllabus?.submissionStatus?.forLevel}` : 'Blog'}
            </Typography>
        </Toolbar>
        </AppBar>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{padding : '90px 10px 90px 10px', maxWidth:'600px'}}>
        <Typography variant='caption' fontStyle='italic'>
            {type==='PR' ? 
            'Once you submit, your report will be reviewed by the Instructors of Your respective course and you will be promoted to the next Level. It may also be flagged and feedback will be provided for making further changes.'
            :
            'Once you submit your blog, it will be reviewed by the Instructors of your course. They can choose to make it public or flag it and provide feedback for making changes.'}
        </Typography>
        <br/><br/>
        <TextField value={formData?.title} onChange={(e)=>(setFormData({...formData, title : e.target.value}))}
        fullWidth variant='outlined' label='Title' required inputProps={{maxLength : 60}}
        InputProps={{style:{fontSize : '13px', lineHeight:'24px'}}} color='secondary'/>
        <br/><br/>
        <ImageUploading
        value={formData?.coverPhoto}
        onChange={handleUpload} 
        dataURLKey="data_url"
      >
        {({
          onImageUpload,
          dragProps,
        }) => (
          <div>
            {!formData?.coverPhoto && <Paper
              style={{display: 'flex', justifyContent: 'center',alignItems: 'center',height:'120px',cursor:'pointer'}}
              onClick={onImageUpload} variant='outlined'
              {...dragProps}
            >
              <Typography>Cover Photo. Click or Drop here</Typography>
            </Paper>}
            {formData?.coverPhoto && <>
            <img src={formData?.coverPhoto} alt='cover photo' style={{width:'100%', maxHeight: '250px',objectFit:'cover'}}/>
            <div>
                <Button variant='outlined' 
                onClick={()=>{setFormData({...formData, coverPhoto:''});onImageUpload();}}>
                    Change Image
                </Button>
            </div></>}
          </div>
        )}
      </ImageUploading>
      <Button onClick={()=>(console.log(formData))}> test</Button>
        </div>
        </div>
        </>
    )
}

export default DbForm;
