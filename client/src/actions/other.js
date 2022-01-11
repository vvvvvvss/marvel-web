import * as API from '../API/index.js';

export const getRsaFeedByCourse = (courseCode, page, title) => async (dispatch) => {
    dispatch({type : 'START_FEED_LOADING'});
    try {
        const {data} = await API.getRsaFeedByCourse(courseCode, page, title);
        if(data?.status==='200'){
            dispatch({type: 'GET_FEED', payload: { feed: data?.feed, total:data?.total}});
        }else {alert("Something went wrong while getting resourse articles. :(")};
    } catch (error) {alert("Something went wrong while getting resourse articles. :(");}
    dispatch({type: 'END_FEED_LOADING'});
}

export const getProfileFeed = (id, tab, page, title) => async (dispatch) => {
    dispatch({type:'START_FEED_LOADING'});
    try {
        const {data} = await API.getProfileFeed(id, tab, page, title);
        if(data?.status==='200'){
            dispatch({type: 'GET_FEED', payload: {feed : data?.feed, total: data?.total}});
        }else{alert("Something went wrong while searching.");}
    } catch (error) {alert("Something went wrong while getting feed :(");}
    dispatch({type:'END_FEED_LOADING'});
}

export const getSearchFeed = (type, domain, title, courseCode, authorName, tags, page, scope)=>async(dispatch)=>{
    dispatch({type:'START_FEED_LOADING'});
    try {
        const {data} = await API.getSearchFeed(type, domain, title, courseCode, authorName, tags, page, scope);
        if(data?.status==='200'){
            dispatch({type:'GET_FEED', payload: {feed: data?.feed, total: data?.total}});
        }else{alert("Something went wrong while searching.");}
    } catch (error) {console.log(error); alert("Something went wrong while searching."); }
    dispatch({type:'END_FEED_LOADING'});
}

export const editCourse = (courseCode, operation, tskIndex, lvIndex, taskId, levelId, content)=>async(dispatch)=>{
    dispatch({type:'START_SYLLABUS_LOADING'});
    try {
       const {data} = await API.editCourse(courseCode, operation, tskIndex, lvIndex, taskId, levelId, content);
       if(data?.status==='201'){
           if(operation==='addLevel')alert("Level added successfully. You might want to scroll down if you dont see it.");
           dispatch({type:'EDIT_SYLLABUS', payload: data?.course });
       }else if(data?.status==='500'){
           dispatch({type:'EDIT_SYLLABUS', payload: data?.course});
           alert("Could'nt edit Course. Looks like somebody else is also editing this course right now and we could'nt complete your request because of inconsistencies. We've updated your page with latest data!.");
       }else if(data?.status==='501'){
            if(operation==='addLevel'){
                alert(`Students have submitted their project reports for level ${Number(lvIndex)+1}. Inserting a new level at that index will cause a mess. Please try inserting a level at a higher index where there has'nt been any activity, so that students can easily catchup. Thankyou.`);
            }else if(operation==="deleteLevel"){
                alert(`Students have submitted their project reports for that level. So you cant delete it.`);
            }
       }else{
           alert("Something went wrong :(. Could'nt edit course.");
       }
    } catch (error) { }
    dispatch({type:'END_SYLLABUS_LOADING'});
}