const initialState = {
    formOpen : false, formType : '',
    viewPostOpen : false, viewPostId : '', viewPostType:'', isViewLoading : false, viewPost : {},
    editPostOpen : false, editPostId : '', editPostType:'',isEditLoading : false,
    isSyllabusLoading : false,
    isProfileLoading : false,
    isCreateLoading : false,
    isSubLoading : false,
    syllabus : {},
    profile : {bio : '',linkedIn : '',gitHub:'',website:'',id:'',currentLevel : ''},
    submissions : {prs : [], blogs : [], rsas:[], total : 1}
}

const dashboardReducer = (state=initialState, action)=>{
    switch (action.type) {
        //editpost
        case 'OPEN_EDIT':
            return {...state, editPostOpen:true}
        case 'CLOSE_EDIT':
            return {...state, editPostOpen:false}
        case 'SET_EDIT_ID':
            return {...state, editPostId : action.payload?.id , editPostType : action.payload.type}
        //viewpost
        case 'OPEN_VIEW':
            return {...state, viewPostOpen:true}
        case 'CLOSE_VIEW':
            return {...state, viewPostOpen:false}
        case 'SET_VIEW_ID':
            return {...state, viewPostId : action.payload?.id, viewPostType : action.payload?.type}
        //form
        case 'OPEN_FORM' :
            return {...state, formOpen : true}
        case 'CLOSE_FORM' :
            return {...state, formOpen : false}
        case 'SET_FORM_TYPE':
            return {...state, formType : action.payload}
        //loading
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
        case 'START_VIEW_LOADING':
            return {...state, isViewLoading : true}
        case 'END_VIEW_LOADING':
            return {...state, isViewLoading:false}
        case 'START_EDIT_LOADING':
            return {...state, isEditLoading : true}
        case 'END_EDIT_LOADING':
            return {...state, isEditLoading:false}
        //getting
        case 'GET_PROFILE':
            return {...state, profile : {...state.profile, ...action.payload}}
        case 'GET_COURSE' :
            return {...state, syllabus : action.payload}
        case 'GET_SUB_PR':
            return {...state, submissions : {...state.submissions, prs : action.payload.subs}};
        case 'GET_SUB_BLOG':
            return {...state, submissions : {...state.submissions, blogs : action.payload.subs, total : action.payload?.total}};
        case 'GET_SUB_RSA' : 
            return {...state, submissions : {...state.submissions, rsas : action.payload?.subs, total : action.payload?.total}}
        case 'GET_VIEW_POST':
            return {...state, viewPost : action.payload}
        // create or subbing
        case 'CREATE_PR' :
            return {...state, submissions : { ...state?.submissions, prs : [action.payload, ...state.submissions.prs]}};
        case 'CREATE_BLOG':
            return {...state, submissions : { ...state?.submissions, blogs : [action.payload, ...state.submissions.blogs].slice(0,-1)}};
        case 'EDIT_BLOG' :
            return {...state, submissions : {...state.submissions, blogs : state.submissions.blogs.map((k)=>(k._id===action.payload._id ? action.payload : k))}, viewPost:action.payload}
        case 'EDIT_PR' :
            return {...state, submissions : {...state.submissions, prs : state.submissions.prs.map((k)=>(k._id===action.payload._id ? action.payload : k))}, viewPost : action.payload}
        case 'EDIT_RSA':
            return {...state, submissions : {...state.submissions, rsas : state.submissions.rsas.map((k)=>(k._id===action.payload._id ? action.payload : k))}, viewPost : action.payload};
        case 'CREATE_RSA' : 
            return {...state, submissions : {...state.submissions, rsas : [action.payload, ...state.submissions.rsa].slice(0,-1)}}
        default: 
            return state;
    }
}

export default dashboardReducer;