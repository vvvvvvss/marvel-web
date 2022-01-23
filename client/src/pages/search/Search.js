import {Paper, Typography,Toolbar, Select, MenuItem, InputLabel, FormHelperText, 
  FormControl, TextField, Divider, AppBar, Pagination, Button, CircularProgress} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import {getSearchFeed} from '../../actions/other.js';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import UserCard from '../../components/UserCard';
import CourseCard from '../../components/CourseCard';
import {Helmet} from 'react-helmet';

const Search = () => {
    const authUser = useSelector(state => state.auth.authUser);
    const [searchParams, setSearchParams] = useSearchParams();
    const {feed, isFeedLoading, totalFeedPages} = useSelector(state => state.other);
    const [type, setType] = useState(["course","rsa","pr","user","blog"].includes(searchParams.get("type")) ? searchParams?.get("type"):'');
    const [domain, setDomain] = useState(["AI-ML","D-P","IOT","CL-CY","EV-RE"].includes(searchParams.get("domain")) ? searchParams?.get("domain"):'');
    const [title, setTitle] = useState(searchParams.get("title") || '');
    const [courseCode, setCourseCode] = useState(searchParams.get("courseCode") || '');
    const [authorName, setAuthorName] = useState(searchParams.get("name") || '');
    const [tags, setTags] = useState(searchParams.get("tags") || '');
    const [page, setPage] = useState(searchParams.get("page") || 1);
    const [searchCount, setSearchCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({type:'CLEAR_FEED'});
      return () => {
          dispatch({type:'CLEAR_FEED'});
      }
    }, [type]);

    const handleSearch = () =>{
      setSearchParams({type, domain, title, courseCode, name: authorName, tags, page});
      setSearchCount(c=>c+1);
    }

    useEffect(() => {
      if(type!==""){
        dispatch(getSearchFeed(type, domain, title, courseCode, authorName, tags, page));
      }
    }, [searchCount])

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
          value={type}
          label="type" sx={{width:'100%',maxWidth:'600px'}}
          onChange={(e)=>(setType(e.target.value))}
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
        {(["pr","course","rsa"].includes(type)) &&
        <FormControl sx={{margin:'10px'}}>
        <InputLabel id="domain">domain</InputLabel>
        <Select
          labelId='domain' disabled={type===''}
          value={domain}
          label="domain" sx={{width:'100%',maxWidth:'600px'}}
          onChange={(e)=>(setDomain(e.target.value))}
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
        {(["pr","blog","rsa"].includes(type))&&
        <TextField value={title} onChange={(e)=>(setTitle(e.target.value))} 
        placeholder='Filter by Title' label='Title' sx={{margin:'10px'}} disabled={type===''}/>
        }
        {/* course code  */}
        {(["pr","rsa","course"].includes(type))&&
        <TextField value={courseCode} onChange={(e)=>(setCourseCode(e.target.value))} 
        placeholder='Filter by Course Code' label='Course code' sx={{margin:'10px'}} disabled={type===''}/>
        }
        {/* author Name */}
        {(["pr","rsa","blog","user"].includes(type))&&<>
        <TextField value={authorName} onChange={(e)=>(setAuthorName(e.target.value))} 
        placeholder={`${type==='user' ? 'Search by Name' : 'Filter by Author Name'}`} 
        label={`${type==='user'?'Name' : 'Author name'}`} sx={{margin:'10px'}} disabled={type===''}/><br/></>
        }
        {/* tags */}
        {(["pr","rsa","blog"].includes(type))&&
        <TextField value={tags} onChange={(e)=>(setTags(e.target.value))}
        placeholder={`Use Comma (,) to separate tags.`}
        label={`Tags`} sx={{margin:'10px'}} disabled={type===''}/>
        }
        </Box>
        <Button variant='rounded-outlined' disabled={type===''} onClick={handleSearch}>Search</Button>
        </Paper>
        <Divider/>
        <AppBar position='sticky' sx={{background:'#181818'}}> 
        <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Pagination count={totalFeedPages} variant="outlined" page={page} 
            color="secondary" onChange={(e, newPage)=>{setPage(newPage);handleSearch();}}
            style={{justifySelf:'center'}}/>
        </Toolbar>
        </AppBar>
        <Divider/>
        {/* rest of the page bottom of appbar */}
        <Box sx={{display:'flex',width: '100%',justifyContent: 'center',margin:'20px 0px 30px 0px'}}>
        {/* grid box */}
        {isFeedLoading ? <CircularProgress/> : 
        feed?.length===0&&type!=='' ? 
        <Typography variant="h6" fontWeight='600' sx={{marginTop:'30px'}} color='#808080'>We found nothing.</Typography> : 
        <Box sx={{display:'grid',gridTemplateColumns: {xs:'1fr',md:'1fr 1fr',xl:'1fr 1fr 1fr',}, gap:'20px', justifyContent:'center'}} >
        
        {feed?.map((p,i)=>
        { if(["pr","blog","rsa"].includes(type)){
          return <PostCard post={p} type={type} variant='media' scope='else' key={i} />
        }else if(type==='user'){
          return <UserCard user={p} key={i} />
        }else if(type==='course'){
          return <CourseCard course={p} key={i} />
        }else return <></>
        }
        )}
        </Box>
        }
        </Box>
        </div>
        </Paper>
    )
}

export default Search;
