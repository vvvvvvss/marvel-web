import * as API from '../API/index.js';

export const getRsaFeedByCourse = (courseCode, page, title) => async (dispatch) => {
    dispatch({type : 'START_FEED_LOADING'});
    try {
        const {data} = await API.getRsaFeedByCourse(courseCode, page, title);
        if(data?.status==='200'){
            dispatch({type: 'GET_FEED', payload: data?.feed});
        }else {alert("Something went wrong while getting resourse articles. :(")};
    } catch (error) {alert("Something went wrong while getting resourse articles. :(");}
    dispatch({type: 'START_FEED_LOADING'});
}