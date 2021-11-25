const initialState = {
    formOpen : false, formType : '',
    viewPostOpen : false, viewPostId : '', viewPostType:'', isViewLoading : false, viewPost : {}, viewPostScope:'',
    editPostOpen : false, editPostId : '', editPostType:'',isEditLoading : false,
    isSyllabusLoading : false,
    isProfileLoading : false,
    isCreateLoading : false,
    isSubLoading : false,
    syllabus : {},
    profile : {bio : '',linkedIn : '',gitHub:'',website:'',id:'',currentLevel : ''},
    submissions : {subs:[], total : 1},
    toReview : {posts : [], total : 1}, isToReviewLoading : false
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
            return {...state, viewPostId : action.payload?.id, viewPostType : action.payload?.type, viewPostScope:action.payload?.scope}
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
        case 'START_TOREVIEW_LOADING':
            return {...state, isToReviewLoading : true}
        case 'END_TOREVIEW_LOADING':
            return {...state, isToReviewLoading : false}
        //getting
        case 'GET_PROFILE':
            return {...state, profile : {...state.profile, ...action.payload}}
        case 'GET_COURSE' :
            return {...state, syllabus : action.payload}
        case 'GET_SUB':
            return {...state, submissions : {...state.submissions, subs : action.payload?.subs, total : action.payload?.total}};
        case 'GET_VIEW_POST':
            return {...state, viewPost : action.payload}
        case 'GET_TOREVIEW':
            return {...state, toReview : {posts : action.payload?.posts, total : action.payload?.total}}
        // create or subbing
        case 'CREATE_PR' :
            return {...state, submissions : { ...state?.submissions, subs : [action.payload, ...state.submissions.subs]}};
        case 'CREATE_BLOG' || 'CREATE_RSA':
            return {...state, submissions : {...state?.submissions, subs : [action.payload, ...state.submissions.subs].slice(0,-1)}};
        case 'EDIT_POST' :
            return {...state, submissions : {...state.submissions, subs : state.submissions.subs.map((k)=>(k._id===action.payload._id ? action.payload : k))}, viewPost:action.payload}
        default: 
            return state;
    }
}

export default dashboardReducer;