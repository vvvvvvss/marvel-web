export const search = (type, domain, title, courseCode, authorName, authorSlug) => async (dispatch) => {
    dispatch({type : 'START_FEED_LOADING'});
    try {
        const {data} = await API.search(type, domain, title, courseCode, authorName, authorSlug);
        if(data?.status==='200'){
            dispatch({type: 'GET_FEED', payload: data});
        }else {alert("Something went wrong while querying :(")};
    } catch (error) { }
    dispatch({type: 'START_FEED_LOADING'});
}