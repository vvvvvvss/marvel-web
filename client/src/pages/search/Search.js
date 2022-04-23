import {Paper, Typography, Divider, Button, CircularProgress} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/system';
import {getSearchFeed} from '../../API/index.js'
import { useSearchParams } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import UserCard from '../../components/UserCard';
import CourseCard from '../../components/CourseCard';
import {Helmet} from 'react-helmet';
import { useInfiniteQuery } from 'react-query'
import Fields from './Fields';

const Search = () => {
    const [searchParams, _] = useSearchParams();

    const {data, isLoading:isFeedLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery(
      [{nature:'feed', place:'search'},searchParams?.get("type"),searchParams?.get("domain"),searchParams?.get("title"),searchParams?.get("courseCode"),searchParams?.get("authorName"),searchParams?.get("tags")],
    ({pageParam=1})=>getSearchFeed(
      ["course","rsa","pr","user","blog"].includes(searchParams.get("type")) ? searchParams?.get("type"):'',
      ["AI-ML","D-P","IOT","CL-CY","EV-RE"].includes(searchParams.get("domain")) ? searchParams?.get("domain"):'',
      searchParams.get("title") || '',
      searchParams.get("courseCode") || '',
      searchParams.get("authorName") || '',
      searchParams.get("tags") || '',
      pageParam, 
      'search'),
    {
      getNextPageParam:(lastPage, pages)=>{
        if(lastPage?.feed?.length < 6){
          return undefined;
        }else{
          return pages?.length+1;
        }
      },
      enabled: ["course","rsa","pr","user","blog"].includes(searchParams.get("type"))
    }
    );

    return (
        //entire screen
        <Paper square elevation={0} sx={{display:'flex',justifyContent:'center', width:'100vw',backgroundColor:'#121212',minHeight:'100vh',minWidth:'100vw'}}>
        <Helmet>
          <title>Search Marvel | UVCE's Reasearch Hub</title>
          <meta name='description' content='Search across Courses, Blog Posts, Project reports, Resourse articles and People in UVCE MARVEL.' />
          <meta property="og:title" content="Search Marvel 🚀🌘" />
        </Helmet>
        <Navbar/>
        {/* entire page */}
        <div style={{maxWidth:'1580px',width:'100%'}}>
        {/* top hero */}
        <Paper square elevation={0} sx={{backgroundColor: '#031117', padding:'120px 20px 30px 0px', 
        display:'flex',maxHeight:{xs:'max-content',sm:'350px'},flexDirection:'column' ,alignItems:'center'}}>
        <Typography variant='h5' sx={{color:'primary.light',letterSpacing:'0.23em'}}>
            <span style={{fontWeight:'400'}}>SEARCH</span>&nbsp;<span style={{fontWeight:'600',color:'#D3FFFF'}}>MARVEL</span> 
        </Typography>
        <br/>
        <Fields/>
        </Paper>
        <Divider/>
        {/* rest of the page bottom of appbar */}
        <Box sx={{display:'flex',width: '100%',alignItems: 'center',margin:'20px 0px 30px 0px',flexDirection:'column'}}>
        {/* grid box */}
        {isFeedLoading ? 
        <CircularProgress/> 
        : 
        data?.pages?.[0]?.feed?.length===0 && searchParams.get("type")!=='' ? 
        <Typography variant="h6" fontWeight='600' sx={{marginTop:'30px'}} color='#808080'>We found nothing.</Typography> 
        : 
        <Box sx={{display:'grid',gridTemplateColumns: {xs:'1fr',md:'1fr 1fr',xl:'1fr 1fr 1fr',}, gap:'20px', justifyContent:'center'}} >
  
        {data?.pages?.map(
          (page,i)=>(
            page?.feed?.map((item,j)=>{
          if(["pr","blog","rsa"].includes(searchParams.get("type"))){
            return <PostCard post={item} type={searchParams.get("type")} variant='media' scope='else' key={`${i}${j}`} />
          }else if(searchParams.get("type")==='user'){
            return <UserCard user={item} key={`${i}${j}`} />
          }else if(searchParams.get("type")==='course'){
            return <CourseCard course={item} key={`${i}${j}`} />
          }else return <></>
        }
        )
        ))}
        </Box>
        }
        <br/>
        {searchParams.get('type') &&
        <Button disabled={(!hasNextPage || isFetchingNextPage)||isFeedLoading}
         onClick={()=>(fetchNextPage())} >
            {(!hasNextPage) ? "That's it" : "load more"}
        </Button>}
        </Box>
        </div>
        </Paper>
    )
}

export default Search;
