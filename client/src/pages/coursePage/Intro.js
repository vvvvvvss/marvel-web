import { memo, useState, useEffect } from "react";
import { Paper, Skeleton, Typography, Button, Chip } from "@mui/material";
import RenderMarkdown from "../../components/RenderMarkdown.js";
import useAuth from "../../utils/hooks/useAuth.js";
import ReactMde from "react-mde";
import { useMutation } from "react-query";
import { editCourse } from "../../API";
import { useParams } from 'react-router-dom';
import { useQueryClient } from "react-query";

const Intro = ({intro, isOverviewLoading}) => {
    const [content, setContent] = useState();
    const [mode, setMode] = useState('view');
    const {authUser} = useAuth();
    const [changed, setChanged] = useState(false);
    const [editorTab, setEditorTab] = useState('write');
    const {id} = useParams();
    const queryClient = useQueryClient();

    useEffect(() => {
      setContent(intro);
    }, [intro])
    

    const {mutate, isLoading:isMutating} = useMutation(
        ()=>(editCourse(id, 'editIntro', null, null, null, null, content)),
        {
          onSuccess:(response)=>{
            if(response?.status==='201'){
              queryClient.setQueryData([{courseCode:id, scope:'overview'}], (prev)=>({...prev, course:{...prev?.course, intro: response?.intro}}));
            }else{
              alert("Something went wrong. Couldn't edit intro.");
              setContent(intro);
              setChanged(false);
            }
            setChanged(false);
            setMode("view");
          },
          onError:()=>{
            alert("Something went wrong.");
          }
        }
      );

  return (
    <Paper square elevation={0} sx={{padding:{md:'85px 30px 20px 30px',xs:'30px 30px 20px 30px'}, maxHeight:{xs:'450px',sm:'350px'},overflowY:'auto',overflowX:'hidden'}}>
        { isOverviewLoading ? 
        <>
        <Skeleton variant='text' width='100%' height='32px' animation='wave' sx={{borderRadius:'6px', margin:"0px 20px 0px 0px"}} />
        <Skeleton variant='text' width='100%' height='32px' animation='wave' sx={{borderRadius:'6px', margin:"0px 20px 0px 0px"}} />
        <br/>
        <Skeleton variant='rectangular' height='200px' width='100%' animation='wave' sx={{borderRadius:'6px', margin:"0px 20px 0px 0px"}} />
        </>
        :
        mode==='view'
        ?
        <Typography component='div' variant='body2' lineHeight='26px' sx={{color:'secondary.light', display:'flex',flexDirection:'column',alignItems:'center'}}>
        {(authUser?.currentRole==='INS'&&authUser?.currentInsCourse?.includes(id)) && 
        <Chip clickable variant='outlined' onClick={()=>setMode('edit')} label='EDIT' sx={{margin:'10px', letterSpacing:'0.23em',fontSize:'12px'}} />
        }
        <RenderMarkdown content={content} />
        </Typography>
        :
        <>
        <ReactMde 
        value={content}
        onChange={(e)=>{setChanged(true);setContent(e)}}
        selectedTab={editorTab}
        onTabChange={()=>(setEditorTab( editorTab==='write' ? 'preview' : 'write' ))}
        generateMarkdownPreview={markdown =>
            Promise.resolve(
            <RenderMarkdown content={markdown} />
        )
        }
        />
        <>
            <Button sx={{margin:'10px'}} variant="contained" color='secondary' disabled={isMutating} onClick={()=>{setContent(intro);setChanged(false);setMode("view")}}>
              cancel
            </Button>
            <Button sx={{margin:'10px'}} variant="contained" color='secondary' onClick={()=>(mutate())} disabled={isMutating || !changed} >save</Button>
        </>
        </>
        }
    </Paper>
  )
}

export default memo(Intro);