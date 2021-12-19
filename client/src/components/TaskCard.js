import Markdown from "markdown-to-jsx";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {CardHeader, Typography, Card, CardContent, Link, IconButton, Dialog,
DialogActions, DialogContent, DialogTitle, DialogContentText, Button, CardActions} from "@mui/material";
import { useState } from "react";
import sanitizer from "sanitize-html";
import he from 'he';
import ReactMde from "react-mde";
import "../components/Widgets/react-mde-all.css";
import {useSelector} from 'react-redux';

const TaskCard = ({tsk, tskIndex, lvIndex}) => {
    const {authUser} = useSelector(state => state.auth)
    const [mode, setMode] = useState("view");
    const [editorTab, setEditorTab] = useState("write");
    const [content, setContent] = useState(tsk?.description);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [changed, setChanged] = useState(false);

    const handleModify = (operation) =>{
        console.log(tskIndex, operation,"Level",lvIndex);
    }
    
    return (
        <div>
        <Dialog
        open={confirmOpen}
        onClose={()=>(setConfirmOpen(false))}
      >
        <DialogTitle>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Task? This CANNOT be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>(setConfirmOpen(false))} variant="outlined" color='secondary' >Disagree</Button>
          <Button onClick={()=>(handleModify('deleteTask'))} variant="contained" color="error" >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        {/* TASK CARD  */}
        <Card sx={{marginTop:'15px'}} key={tskIndex}>
            <CardHeader
            action={ authUser?.currentRole==='INS' &&
            <span>
            <IconButton size="small" sx={{marginRight:'15px',color:'secondary.light'}} onClick={()=>{setConfirmOpen(true)}}>
                <DeleteIcon/>
            </IconButton>
            <IconButton sx={{color:'secondary.light'}} disabled={changed} size="small" onClick={()=>(setMode(mode==='view'?'edit':'view'))}>
            <EditIcon/>
            </IconButton>
            </span>
            }
            title={<Typography variant="subtitle1" >Task {tskIndex+1}</Typography>}
            
        />
            <CardContent>
                {mode==='view'?
                <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px',lineHeight:'24px'}} 
                options={{wrapper : 'div'},{
                    overrides: {
                        p :{ component: Typography , props: {variant : 'body1', sx:{color:'secondary.light'}}}, 
                        a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer'}, sx:{color:'primary.light'}},
                        img : { props : {width : '100%',height:'20px',style:{justifySelf:'center',objectFit:'cover'} }},
                        iframe : { props : {width : '100%', height : '300', frameborder : '0',style:{justifySelf:'center'} }},
                        code : { component:Typography ,props : { variant:'code-small' }},
                        blockquote : {props : { style:{backgroundColor:'#112020',borderRadius:'16px', padding:'20px 20px 20px 20px'} }}
                    }
                }}>
                {tsk?.description}
                </Markdown >:
                <>
                {/* // editor */}
                <ReactMde 
                    value={content} label='content'
                    onChange={(e)=>{setChanged(true);setContent(e)}}
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
                    )
                    }
                    />
                </>
            }
            </CardContent>
            {changed &&
            <CardActions>
            <Button variant="contained" color='secondary' onClick={()=>{setContent(tsk?.description);setChanged(false);setMode("view")}} >cancel</Button>
            <Button variant="contained" color='secondary' onClick={()=>(handleModify("saveTask"))} >save</Button>
            </CardActions>
            }
        </Card>
        </div>
    )
}

export default TaskCard;
