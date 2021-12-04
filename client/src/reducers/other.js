const initialState = {
    feed : [], isFeedLoading : false
}

const otherReducer = (state=initialState, action) => {
    switch (action?.type) {
        case 'START_FEED_LOADING':
            return {...state, isFeedLoading : true};
        case 'END_FEED_LOADING' :
            return {...state, isFeedLoading: false};
        case 'GET_FEED':
            return {...state, feed : action?.payload}
        default:
            break;
    }
}

export default otherReducer;