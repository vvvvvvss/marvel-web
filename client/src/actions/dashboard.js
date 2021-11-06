import * as API from '../API/index.js';

export const getCourseData=(courseCode, scope) => async(dispatch)=>{
    dispatch({type : 'START_SYLLABUS_LOADING'});
    const {data} = await API.getCourseData(courseCode, scope).catch((err)=>(console.log(err)));
    if(data?.status ==='200'){
        dispatch({type : 'GET_COURSE', payload : data?.course});
    }
    dispatch({type : 'END_SYLLABUS_LOADING'});
}

export const getProfileData=(id, scope)=>async(dispatch)=>{
    dispatch({type : 'START_PROFILE_LOADING'});
    const {data} = await API.getProfileData(id,scope).catch((err)=>(console.log(err)));
    if(data?.status==='200'){
        dispatch({type : 'GET_PROFILE', payload : data?.profile});
    }
    dispatch({type:'END_PROFILE_LOADING'});
}

export const updateProfile=(id, newProfile)=>async(dispatch)=>{
    dispatch({type : 'START_PROFILE_LOADING'});
    const {data} = await API.updateProfile(id, newProfile).catch((err)=>(console.log(err)));
    if(data?.status==='201'){
        dispatch({type : 'GET_PROFILE', payload : data?.profile});
    }else{
        alert('Check your profile links and try again.');
    }
    dispatch({type : 'END_PROFILE_LOADING'});
}

export const createPR = (formData)=> async (dispatch) => {
    dispatch({type : 'START_CREATE_LOADING'});
    const {data} = await API.createPR(formData).catch(err => console.log(err));
    console.log(data);
    dispatch({type : 'END_CREATE_LOADING'});
}

export const createBlog = (formData)=> async (dispatch) => {
    dispatch({type : 'START_CREATE_LOADING'});
    const {data} = await API.createBlog(formData).catch(err => console.log(err));
    console.log(data);
    dispatch({type : 'END_CREATE_LOADING'});
}