{/* {post?.slug && 
<Box sx={{position:"sticky",bottom:'0',height:'35px', backgroundColor:'#181818',width:{xs:'100vw',lg:'100%'},maxWidth:'650px',boxSizing: "border-box",
margin:{xs:'0px -20px 0px -20px',lg:'0px'},zIndex:'100',border:'2px solid #313131', display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
    <Typography variant="caption" sx={{alignItems:'center',letterSpacing:'0.23em',display:'flex',color:`${post?.liked==true ? 'primary.light':'#a1a1a1'}`,fontSize:'10px',cursor:'pointer',fontWeight:`${post?.liked==true ? '600':'500'}`,'&:hover':{color:'primary.light', fontWeight:'600'}}}
    >
        <Upvote sx={{height:'16px'}} />&nbsp;{post?.likeCount}{`${post?.likeCount > 1 ? 'LIKES' : 'LIKE'}`}
    </Typography>
    <Typography variant="caption"
    sx={{alignItems:'center',letterSpacing:'0.23em',display:'flex',color:'#a1a1a1',fontSize:'10px',cursor:'pointer','&:hover':{color:'secondary.light', fontWeight:'600'}}}>
        <CommentIcon sx={{height:'16px'}} />
        &nbsp;COMMENTS
    </Typography>
    <Typography variant="caption" onClick={handleShare}
    sx={{alignItems:'center',letterSpacing:'0.23em',display:'flex',color:'#a1a1a1',fontSize:'10px',cursor:'pointer','&:hover':{color:'secondary.light', fontWeight:'600'}}}>
        <ShareIcon sx={{height:'16px'}} />
        &nbsp;SHARE
    </Typography>
</Box>} */}