import {Paper, Typography,Toolbar, Select, MenuItem, InputLabel, FormHelperText, 
  FormControl, TextField, Divider, AppBar, Pagination, Button, CircularProgress} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import {getSearchFeed} from '../../API/index.js'
import { useSearchParams } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import UserCard from '../../components/UserCard';
import CourseCard from '../../components/CourseCard';
import {Helmet} from 'react-helmet';
import { useInfiniteQuery } from 'react-query'

const Search = () => {
    const authUser = useSelector(state => state.auth.authUser);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchFields, setSearchFields] = useState({
      type: ["course","rsa","pr","user","blog"].includes(searchParams.get("type")) ? searchParams?.get("type"):'',
      domain: ["AI-ML","D-P","IOT","CL-CY","EV-RE"].includes(searchParams.get("domain")) ? searchParams?.get("domain"):'',
      title: searchParams.get("title") || '',
      courseCode:  searchParams.get("courseCode") || '',
      authorName: searchParams.get("name") || '',
      tags: searchParams.get("tags") || '',
    });
    
    const handleSearch = () =>{
      setSearchParams({...searchFields});
    }

    const {data, isLoading:isFeedLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery(
      [{nature:'feed', place:'search',...searchFields}],
    ({pageParam=1})=>getSearchFeed(
      ["course","rsa","pr","user","blog"].includes(searchParams.get("type")) ? searchParams?.get("type"):'',
      ["AI-ML","D-P","IOT","CL-CY","EV-RE"].includes(searchParams.get("domain")) ? searchParams?.get("domain"):'',
      searchParams.get("title") || '',
      searchParams.get("courseCode") || '',
      searchParams.get("name") || '',
      searchParams.get("tags") || '',
      pageParam, 
      'search'),
    {
      getNextPageParam:(lastPage, pages)=>{
        if(lastPage?.feed?.length < 6){
          return pages?.length+1;
        }else{
          return undefined;
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
        <br/><br/>
        <FormControl>
        <InputLabel id="type">type</InputLabel>
        <Select
          labelId='type'
          value={searchFields?.type}
          label="type" sx={{width:'100%',maxWidth:'600px'}}
          onChange={e=>setSearchFields(prev=>({...prev, type: e.target.value}))}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"course"}>Courses</MenuItem>
          <MenuItem value={"user"}>People</MenuItem>
          <MenuItem value={"blog"}>Blog posts</MenuItem>
          <MenuItem value={"pr"}>Project Reports</MenuItem>
          {(authUser?.id && authUser?.enrollmentStatus!=='UNKNOWN') &&<MenuItem value={"rsa"}>Resource Articles</MenuItem>}
        </Select>
        <FormHelperText>What do you want to search for?</FormHelperText>
        </FormControl>
        <br/>
        <Box sx={{display:'flex',width: '100%', justifyContent: 'center',flexDirection:{xs:'column',sm:'row'}}}>
        {/* domain */}
        {(["pr","course","rsa"].includes(searchFields?.type)) &&
        <FormControl sx={{margin:'10px'}}>
        <InputLabel id="domain">domain</InputLabel>
        <Select
          labelId='domain' disabled={searchFields?.type===''}
          value={searchFields?.domain}
          label="domain" sx={{width:'100%',maxWidth:'600px'}}
          onChange={(e)=>setSearchFields(prev=>({...prev, domain: e.target.value}))}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={"AI-ML"}>AI-ML</MenuItem>
            <MenuItem value={"IOT"}>IOT</MenuItem>
            <MenuItem value={"D-P"}>D-P</MenuItem>
            <MenuItem value={"CL-CY"}>CL-CY</MenuItem>
            <MenuItem value={"EV-RE"}>EV-RE</MenuItem>
        </Select>
        <FormHelperText>Filter results by Domain.</FormHelperText>
        </FormControl>
        }
        {/* title */}
        {(["pr","blog","rsa"].includes(searchFields?.type))&&
        <TextField value={searchFields?.title} onChange={(e)=>setSearchFields(prev=>({...prev, title: e.target.value}))} 
        placeholder='Filter by Title' label='Title' sx={{margin:'10px'}} disabled={searchFields?.type===''}/>
        }
        {/* course code  */}
        {(["pr","rsa","course"].includes(searchFields?.type))&&
        <TextField value={searchFields?.courseCode} onChange={(e)=>setSearchFields(prev=>({...prev, courseCode: e.target.value}))} 
        placeholder='Filter by Course Code' label='Course code' sx={{margin:'10px'}} disabled={searchFields?.type===''}/>
        }
        {/* author Name */}
        {(["pr","rsa","blog","user"].includes(searchFields?.type))&&<>
        <TextField value={searchFields?.authorName} onChange={(e)=>setSearchFields(prev=>({...prev, authorName: e.target.value}))} 
        placeholder={`${searchFields?.type==='user' ? 'Search by Name' : 'Filter by Author Name'}`} 
        label={`${searchFields?.type==='user'?'Name' : 'Author name'}`} sx={{margin:'10px'}} disabled={searchFields?.type===''}/><br/></>
        }
        {/* tags */}
        {(["pr","rsa","blog"].includes(searchFields?.type))&&
        <TextField value={searchFields?.tags} onChange={(e)=>setSearchFields(prev=>({...prev, tags: e.target.value}))}
        placeholder={`Use Comma (,) to separate tags.`}
        label={`Tags`} sx={{margin:'10px'}} disabled={searchFields?.type===''}/>
        }
        </Box>
        <Button variant='rounded-outlined' disabled={searchFields?.type===''} onClick={handleSearch}>Search</Button>
        </Paper>
        <Divider/>
        {/* rest of the page bottom of appbar */}
        <Box sx={{display:'flex',width: '100%',alignItems: 'center',margin:'20px 0px 30px 0px',flexDirection:'column'}}>
        {/* grid box */}
        {isFeedLoading ? 
        <CircularProgress/> 
        : 
        data?.pages?.[0]?.feed?.length===0 && searchFields?.type!=='' ? 
        <Typography variant="h6" fontWeight='600' sx={{marginTop:'30px'}} color='#808080'>We found nothing.</Typography> 
        : 
        <Box sx={{display:'grid',gridTemplateColumns: {xs:'1fr',md:'1fr 1fr',xl:'1fr 1fr 1fr',}, gap:'20px', justifyContent:'center'}} >
  
        {data?.pages?.map(
          (page,i)=>(
            page?.feed?.map((item,j)=>{
          if(["pr","blog","rsa"].includes(searchFields?.type)){
            return <PostCard post={item} type={searchFields?.type} variant='media' scope='else' key={`${i}${j}`} />
          }else if(searchFields?.type==='user'){
            return <UserCard user={item} key={`${i}${j}`} />
          }else if(searchFields?.type==='course'){
            return <CourseCard course={item} key={`${i}${j}`} />
          }else return <></>
        }
        )
        ))}
        </Box>
        }
        <br/>
        <Button disabled={(!hasNextPage || isFetchingNextPage)||isFeedLoading}
         onClick={()=>(fetchNextPage())} >
            {(!hasNextPage) ? "That's it" : "load more"}
        </Button>
        </Box>
        </div>
        </Paper>
    )
}

export default Search;
