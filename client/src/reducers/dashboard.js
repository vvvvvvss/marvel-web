const initialState = {
    isSyllabusLoading : false,
    isProfileLoading : false,
    isCreateLoading : false,
    isSubLoading : false,
    syllabus : {},
    profile : {bio : '',linkedIn : '',gitHub:'',website:'',id:'',currentLevel : ''},
    submissions : {prs : [], blogs : [], total : 1}
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
        case 'START_CREATE_LOADING' : 
            return {...state, isCreateLoading : true}
        case 'END_CREATE_LOADING' :
            return {...state, isCreateLoading : false}
        case 'START_SUB_LOADING' : 
            return {...state, isSubLoading : true}
        case 'END_SUB_LOADING' :
            return {...state, isSubLoading : false}
        case 'GET_PROFILE':
            return {...state, profile : {...state.profile, ...action.payload}}
        case 'GET_COURSE' :
            return {...state, syllabus : action.payload}
        case 'CREATE_PR' :
            return {...state, submissions : { ...state?.submissions, prs : [action.payload, ...state.submissions.prs]}};
        case 'CREATE_BLOG':
            return {...state, submissions : { ...state?.submissions, blogs : [action.payload, ...state.submissions.blogs].slice(0,-1)}};
        case 'GET_SUB_PR':
            return {...state, submissions : {...state.submissions, prs : action.payload.subs}};
        case 'GET_SUB_BLOG':
            return {...state, submissions : {...state.submissions, blogs : action.payload.subs, total : action.payload.total}};
        default:
            return state;
    }
}

export default dashboardReducer;