import { useSearchParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../utils/hooks/useAuth.js';

const Fields = () => {
    const {authUser} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchFields, setSearchFields] = useState({
        type: (authUser?.enrollmentStatus!=='UNKNOWN'&&searchParams?.get('type')==='rsa')?'rsa' : ["course","pr","user","blog"].includes(searchParams.get("type")) ? searchParams?.get("type"):'',
        domain: ["AI-ML","D-P","IOT","CL-CY","EV-RE"].includes(searchParams.get("domain")) ? searchParams?.get("domain"):'',
        title: searchParams.get("title") || '',
        courseCode:  searchParams.get("courseCode") || '',
        authorName: searchParams.get("authorName") || '',
        tags: searchParams.get("tags") || '',
    });

    const handleSearch = ()=>{
        setSearchParams({...searchFields});
    }
  return (
    <>
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
    </>
  )
}

export default Fields;