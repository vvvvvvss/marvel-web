import axios from 'axios';

const API = axios.create({baseURL : 'http://localhost:3000/'});

API.interceptors.request.use((req) => {
    if(sessionStorage.getItem('deez')){
        req.headers.Authorization = `Bearer ${sessionStorage.getItem('deez')}`;
    }
    return req;
})

export const auth = async (token) => API.post('/auth', {token : token});
export const getCourseData = async (courseCode, scope)=> (await API.get(`/get/course/${courseCode}?scope=${scope}`)).data;
export const getProfileData = async (slug, scope)=>(await API.get(`/get/profile/${slug}?scope=${scope}`)).data;
export const updateProfile = async (slug, newProfile)=>(await API.post(`/update/profile/${slug}`, newProfile)).data;
export const createPost = async (formData, formType) => (await API.post(`/create/${formType}`,formData)).data;
export const getSubmissions = async (type,page, filter) => (await API.get(`/get/submissions/${type}?page=${page}&title=${filter?.title}&courseCode=${filter?.courseCode}`)).data;
export const hasSubmittedPr = async ()=>(await API.get("/meta/hasSubmittedPr")).data;

export const getPost = async (type, id) => (await (API.get(`/get/${type}/${id}`))).data;

export const editPost = async (formData, id, type)=> (await API.post(`/update/${type}/${id}`, formData)).data;
export const getToReview = async (tab, page, filter)=> (await API.get(`/get/toreview/${tab}?page=${page}&title=${filter?.title}&courseCode=${filter?.courseCode}`)).data;
export const submitFeedback = async (fb, id, type)=> (await API.post(`/action/feedback/${type}/${id}`,{fb : fb})).data;
export const approve = async (id, type) => (await API.post(`/action/approve/${type}/${id}`)).data;
export const toggleSub = async (course, level) => (await API.post(`/action/togglesub/${course}?level=${level}`)).data;

export const getSearchFeed = async (type, domain, title, courseCode, authorName, tags, page, scope) => 
(await (
    API.get(`/search/${type}?domain=${domain || 'none'}&title=${title || 'none'}&courseCode=${courseCode || 'none'}&authorName=${authorName || 'none'}&tags=${tags || 'none'}&page=${page || 1}&scope=${scope || 'none'}`)
)).data;

export const getRsaFeedByCourse = async (courseCode, page, title)=> API.get(`/feed/rsa/${courseCode}?page=${page}&title=${title || 'none'}`);
export const getProfileFeed = async (id, tab, page, title) => API.get(`/feed/profile/${tab}/${id}?page=${page}&title=${title || 'none'}`);
export const editCourse = async (courseCode, operation, tskIndex, lvIndex, taskId, levelId, content) => (
    API.post(`/update/course/${operation}/${courseCode}?tskIndex=${String(tskIndex) || 'none'}&lvIndex=${String(lvIndex) || 'none'}&taskId=${taskId || 'none'}&levelId=${levelId || 'none'}`, {content : content || 'none'})
);
export const deletePost = async (id, type)=> (await API.post(`/action/delete/${type.toLowerCase()}/${id}`)).data;