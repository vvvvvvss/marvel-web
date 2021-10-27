const initialState = {
    isSyllabusLoading : false,
    isProfileLoading : false,
    syllabus : {},
    profile : {},
}

const dashboardReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'START_SYLLABUS_LOADING':
            return {...state, isSyllabusLoading : true}
        case 'END_SYLLABUS_LOADING' : 
            return {...state, isSyllabusLoading : false}
        case 'START_PROFILE_LOADING':
            return { ...state, isProfileLoading : true}
        case 'END_PROFILE_LOADING' :
            return {...state, isProfileLoading:false}
        case 'GET_PROFILE':
            return {...state, profile : action.payload}
        case 'GET_COURSE' :
            return {...state, syllabus : action.payload}
        default:
            return state;
    }
}

export default dashboardReducer;