import { Box } from "@mui/system";
import { Typography, Snackbar, Alert, Slide } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { memo, useRef, useState } from "react";

const ActionBar = ({ _id, title}) => {
    const [alertInfo, setAlertInfo] = useState({open:false, message:'', severity:'success'});
    const ref = useRef(null);

    const handleShare = () => {
        try {
        navigator.clipboard.writeText(window.location.href);
        setAlertInfo({open:true, message:'Link Copied!', severity:'success'});
    } catch (error) {
        setAlertInfo({open:'true', message:'Something went wrong.', severity:'danger'});
    }
    };

  return (
      <>
      {alertInfo?.open && 
      <Snackbar open={alertInfo?.open} autoHideDuration={8000} 
        TransitionComponent={(props)=><Slide direction="up" {...props}/>}
        anchorOrigin={{vertical:'bottom',horizontal:'center'}} 
        onClose={()=>(setAlertInfo({...alertInfo, open:false}))}>
          <Alert variant="filled" onClose={()=>(setAlertInfo({...alertInfo, open:false}))} severity={alertInfo?.severity}>
            {alertInfo?.message}
          </Alert>
        </Snackbar>}
    <Box sx={{position:"sticky",bottom:'0',height:'35px', backgroundColor:'#181818',width:{xs:'100vw',lg:'100%'},maxWidth:'650px',boxSizing: "border-box",
    margin:{xs:'0px -20px 0px -20px',lg:'0px'},zIndex:'100',border:'2px solid #313131', display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
        <Typography variant="caption" onClick={()=>(ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }))} component='div'
        sx={{alignItems:'center',letterSpacing:'0.23em',display:'flex',color:'#a1a1a1',fontSize:'10px',cursor:'pointer','&:hover':{color:'secondary.light', fontWeight:'600'}}}>
            <CommentIcon sx={{height:'16px'}} />
            <CommentCount
                shortname='uvcemarvel'
                config={
                    {
                        url: window.location.href,
                        identifier: _id,
                        title: title,
                    }
                }
            >COMMENTS
            </CommentCount>
        </Typography>
        <Typography variant="caption" onClick={handleShare}
        sx={{alignItems:'center',letterSpacing:'0.23em',display:'flex',color:'#a1a1a1',fontSize:'10px',cursor:'pointer','&:hover':{color:'secondary.light', fontWeight:'600'}}}>
            <ShareIcon sx={{height:'16px'}} />
            &nbsp;SHARE
        </Typography>
    </Box>
    <div ref={ref} >
        <DiscussionEmbed
        shortname='uvcemarvel'
        config={
            {
                url: window.location.href,
                identifier: _id,
                title: title,
                language: 'eng'	
            }
        }
        />
    </div>
    
    </>
  )
}

export default memo(ActionBar);
