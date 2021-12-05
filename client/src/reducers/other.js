const initialState = {
    feed : [], isFeedLoading : false, overview : {}, isOverviewLoading:false
}

const otherReducer = (state=initialState, action) => {
    switch (action?.type) {
        case 'START_FEED_LOADING':
            return {...state, isFeedLoading : true};
        case 'END_FEED_LOADING' :
            return {...state, isFeedLoading: false};
        case 'START_OVERVIEW_LOADING':
            return {...state, isOverviewLoading: true};
        case 'END_OVERVIEW_LOADING':
            return {...state, isOverviewLoading: false}
        case 'GET_FEED':
            return {...state, feed : action?.payload};
        case 'GET_OVERVIEW':
            return {...state, overview : action?.payload}
        default:
            return state;
    }
}

export default otherReducer;