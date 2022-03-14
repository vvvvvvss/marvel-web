import axios from 'axios';

const API = axios.create({baseURL : 'http://localhost:3000/'});

API.interceptors.request.use((req) => {
    if(sessionStorage.getItem('deez')){
        req.headers.Authorization = `Bearer ${sessionStorage.getItem('deez')}`;
    }
    return req;
})

export const auth = async (token) => API.post('/auth', {token : token});
export const getCourseData = async (courseCode, scope)=> API.get(`/get/course/${courseCode}?scope=${scope}`);
export const getProfileData = async (id, scope)=>API.get(`/get/profile/${id}?scope=${scope}`);
export const updateProfile = async (id, newProfile)=>API.post(`/update/profile/${id}`, newProfile);
export const createPost = async (formData, formType) => API.post(`/create/${formType}`,formData);
export const getSubmissions = async (tab,page) => API.get(`/get/submissions/${tab}?page=${page}`);

export const getPost = async (type, id) => (await (API.get(`/get/${type}/${id}`))).data;

export const editPost = async (formData, id, type)=> API.post(`/update/${type}/${id}`, formData);
export const getToReview = async (tab, page, courseFilter)=> API.get(`/get/toreview/${tab}?page=${page}&crsfltr=${courseFilter || 'none'}`);
export const submitFeedback = async (fb, id, type)=> API.post(`/action/feedback/${type}/${id}`,{fb : fb});
export const approve = async (id, type) => API.post(`/action/approve/${type}/${id}`);
export const toggleSub = async (course, level) => API.post(`/action/togglesub/${course}?level=${level}`);

export const getSearchFeed = async (type, domain, title, courseCode, authorName, tags, page, scope) => 
(await (
    API.get(`/search/${type}?domain=${domain || 'none'}&title=${title || 'none'}&courseCode=${courseCode || 'none'}&authorName=${authorName || 'none'}&tags=${tags || 'none'}&page=${page || 1}&scope=${scope || 'none'}`)
)).data;

export const getRsaFeedByCourse = async (courseCode, page, title)=> API.get(`/feed/rsa/${courseCode}?page=${page}&title=${title || 'none'}`);
export const getProfileFeed = async (id, tab, page, title) => API.get(`/feed/profile/${tab}/${id}?page=${page}&title=${title || 'none'}`);
export const editCourse = async (courseCode, operation, tskIndex, lvIndex, taskId, levelId, content) => (
    API.post(`/update/course/${operation}/${courseCode}?tskIndex=${String(tskIndex) || 'none'}&lvIndex=${String(lvIndex) || 'none'}&taskId=${taskId || 'none'}&levelId=${levelId || 'none'}`, {content : content || 'none'})
);
export const deletePost = async (slug, type)=> API.post(`/action/delete/${type.toLowerCase()}/${slug}`);