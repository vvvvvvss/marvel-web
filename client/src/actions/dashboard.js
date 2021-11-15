import * as API from '../API/index.js';

export const getCourseData=(courseCode, scope) => async(dispatch)=>{
    dispatch({type : 'START_SYLLABUS_LOADING'});
    try {
        const {data} = await API.getCourseData(courseCode, scope).catch((err)=>(console.log(err)));
        if(data?.status ==='200'){
            dispatch({type : 'GET_COURSE', payload : data?.course});
        }  
    } catch (error) { };
    dispatch({type : 'END_SYLLABUS_LOADING'});
}

export const getProfileData=(id, scope)=>async(dispatch)=>{
    dispatch({type : 'START_PROFILE_LOADING'});
    try {
        const {data} = await API.getProfileData(id,scope).catch((err)=>(console.log(err)));
        if(data?.status==='200'){
            dispatch({type : 'GET_PROFILE', payload : data?.profile});
        } 
    } catch (error) { }
    dispatch({type:'END_PROFILE_LOADING'});
}

export const updateProfile=(id, newProfile)=>async(dispatch)=>{
    dispatch({type : 'START_PROFILE_LOADING'});
    try {
        const {data} = await API.updateProfile(id, newProfile).catch((err)=>(console.log(err)));
        if(data?.status==='201'){
            dispatch({type : 'GET_PROFILE', payload : data?.profile});
        }else{
            alert('Check your profile links and try again.');
        } 
    } catch (error) { }
    dispatch({type : 'END_PROFILE_LOADING'});
}

export const createPR = (formData)=> async (dispatch) => {
    dispatch({type : 'START_CREATE_LOADING'});
    try {
        const {data} = await API.createPR(formData).catch(err => console.log(err));
        if(data?.status==='201'){
            dispatch({type : 'CREATE_PR', payload : data?.pr})
        }else{ alert('Something went wrong :(. Try again. If the problem persists, contact the developer.')}
    } catch (error) { }
    dispatch({type : 'END_CREATE_LOADING'});
    dispatch({type : 'CLOSE_FORM'})
}

export const createBlog = (formData)=> async (dispatch) => {
    dispatch({type : 'START_CREATE_LOADING'});
    try {
        const {data} = await API.createBlog(formData).catch(err => console.log(err));
        if(data?.status==='201'){
            dispatch({type : 'CREATE_BLOG', payload : data?.createdPost});
        }else{ alert('Something went wrong :(')};
    } catch (error) { }
    dispatch({type : 'END_CREATE_LOADING'});
    dispatch({type : 'CLOSE_FORM'});
}

export const getSubmissionsStu = (tab, page) => async (dispatch) => {
    try {
        dispatch({type : 'START_SUB_LOADING'});
        const {data} = await API.getSubmissionsStu(tab, page);
        if (data?.status ==='200'){
            dispatch({type : `GET_SUB_${tab.toUpperCase()}`, payload : { subs : data?.submissions, total : data?.total}});
        }else { alert("something went wrong :(") };
        dispatch({type : 'END_SUB_LOADING'});
    } catch (error) { }
}

export const getPost = (type, id) => async (dispatch) => {
    try {
        dispatch({type:'START_VIEW_LOADING'});
        const {data} = await API.getPost(type?.toLowerCase(),id);
        if(data?.status==='200'){
            dispatch({type : 'GET_VIEW_POST', payload : data?.post});
        }else{alert("Something went wrong :(")}
        dispatch({type : 'END_VIEW_LOADING'});
    } catch (error) { }
}