const initialState = {
    isSyllabusLoading : false,
    syllabus : {}
}

const dashboardReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'START_SYLLABUS_LOADING':
            return {...state, isSyllabusLoading : true}
        case 'END_SYLLABUS_LOADING' : 
            return {...state, isSyllabusLoading : false}
        case 'GET_COURSE' :
            return {...state, syllabus : action.payload}
        default:
            return state;
    }
}

export default dashboardReducer;