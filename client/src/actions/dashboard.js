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

export const createPost = (formData, formType)=> async (dispatch) => {
    dispatch({type : 'START_CREATE_LOADING'});
    try {
        const {data} = await API.createPost(formData, formType.toLowerCase()).catch(err => console.log(err));
        if(data?.status==='201'){
            dispatch({type : `CREATE_${formType}`, payload : data?.post});
        }else{ alert('Something went wrong :(.')};
    } catch (error) { }
    dispatch({type : 'END_CREATE_LOADING'});
    dispatch({type : 'CLOSE_FORM'})
}

export const getSubmissions = (tab, page, role) => async (dispatch) => {
    try {
        dispatch({type : 'START_SUB_LOADING'});
        const {data} = await API.getSubmissions(tab, page);
        if (data?.status ==='200'){
            dispatch({type : `GET_SUB`, payload : { subs : data?.submissions, total : data?.total}});
        }else { alert("something went wrong :(") };
        dispatch({type : 'END_SUB_LOADING'});
    } catch (error) { }
}

export const getPost = (type, id, scope) => async (dispatch) => {
    try {
        dispatch({type:'START_VIEW_LOADING'});
        const {data} = await API.getPost(type?.toLowerCase(), id, scope?.toLowerCase());
        if(data?.status==='200'){
            dispatch({type : 'GET_VIEW_POST', payload : data?.post});
        }else{alert("Something went wrong :(")}
        dispatch({type : 'END_VIEW_LOADING'});
    } catch (error) { }
}

export const editPost = (formData, id, type) => async (dispatch) => {
    try {
        dispatch({type:'START_CREATE_LOADING'});
        const {data} = await API.editPost(formData, id, type.toLowerCase());
        if (data?.status==='201'){
            dispatch({type:`EDIT_POST`, payload : data?.post});
        }else{alert('Something went wrong :(')};
        dispatch({type : 'CLOSE_EDIT'});
        dispatch({type : 'END_CREATE_LOADING'});
    } catch (error) { }
}

export const getToReview = (tab, page, courseFilter) => async (dispatch) => {
    try {
        dispatch({type : 'START_TOREVIEW_LOADING'});
        const {data} = await API.getToReview(tab, page, courseFilter?.join(','));
        if(data?.status==='200'){
            dispatch({type : 'GET_TOREVIEW', payload : {posts : data?.posts, total : data?.total}});
        }else alert("Something went wrong :(");
        dispatch({type : 'END_TOREVIEW_LOADING'});
    } catch (error) { }
}
