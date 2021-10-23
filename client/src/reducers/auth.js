const initialState = {
    isAuthLoading : false,
    authUser :{},
}

const authReducers = (state=initialState, action) => {
    switch (action.type) {
        case 'START_AUTH_LOADING':
           return {...state, isAuthLoading:true};
        case 'END_AUTH_LOADING' :
            return {...state, isAuthLoading:false};
        case 'AUTH' : 
            return {...state, authUser : action.payload};
        case 'LOGOUT' :
            return {...state, authUser : {}};
        default:
            return state;
    }
}

export default authReducers;