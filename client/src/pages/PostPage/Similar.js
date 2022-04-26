import { memo } from "react";
import { useQuery } from "react-query";
import { getSearchFeed } from "../../API";
import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import PostCard from "../../components/PostCard.js";

const Similar = ({tags, isPostLoading, postType, id}) => {

    const {data:feedData, isLoading:FeedLoading, isIdle:isFeedIdle} = useQuery(['similar',postType,id], 
        ()=>getSearchFeed(postType, '', '', '', '', tags?.join(','), 1, 'rec'),
        {enabled: tags?.length>0 }
    )
    const isFeedLoading = FeedLoading || isFeedIdle;
    const feed = feedData?.feed;

  return (
    <>
    {/* right part  */}
        <Box sx={{minWidth:{xs:'200px',lg:'300px'}}}>
           {isFeedLoading||isPostLoading ?
           <Skeleton variant="text" animation='wave' /> :
           feed?.length>1 &&
            <Typography variant="subtitle2" component='div' sx={{color:'#989898',letterSpacing:'0.23em'}}>
                &nbsp;&nbsp;SIMILAR
            </Typography>}
        <br/>
        <Box sx={{display:'grid', gridTemplateColumns:'1fr',gap:'20px'}}>
            {isFeedLoading||isPostLoading ? 
            <>
            <Skeleton sx={{width:'100%', height:'220px',borderRadius:'14px'}} variant="rectangular" animation="wave"/>
            <Skeleton sx={{width:'100%', height:'220px',borderRadius:'14px'}} variant="rectangular" animation="wave"/>
            <Skeleton sx={{width:'100%', height:'220px',borderRadius:'14px'}} variant="rectangular" animation="wave"/>
            </>
            : 
            feed?.length===1 ? 
            <Typography variant="h6" fontWeight='600' color='#808080'>We found nothing</Typography>: 
            feed?.map((p, i)=>(p?.slug !== id &&
                <PostCard post={p} variant='media' type={postType} scope='else' key={i} />
            ))}
        </Box>
    </Box>
    </>
  )
}

export default memo(Similar)