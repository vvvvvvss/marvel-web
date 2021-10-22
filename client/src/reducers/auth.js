const state = {
    isAuthLoading : false
}

const authReducers = (state, action) => {
    switch (action.type) {
        case 'START_AUTH_LOADING':
           return {...state, isAuthLoading:true};
        case 'END_AUTH_LOADING' :
            return {...state, isAuthLoading:false};
        default:
            return state;
    }
}