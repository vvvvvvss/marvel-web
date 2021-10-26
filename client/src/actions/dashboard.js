import * as API from '../API/index.js';

export const getCourseData=(courseCode, scope) => async(dispatch)=>{
    dispatch({type : 'START_SYLLABUS_LOADING'});
    const {data} = await API.getCourseData(courseCode, scope).catch((err)=>(console.log(err)));
    if(data?.status ==='200'){
        dispatch({type : 'GET_COURSE', payload : data?.course});
    }
    dispatch({type : 'END_SYLLABUS_LOADING'});
}