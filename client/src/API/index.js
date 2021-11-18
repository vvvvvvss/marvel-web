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
export const createPR = async (formData) => API.post(`/create/pr`,formData);
export const createBlog = async (formData) => API.post(`/create/blog`,formData);
export const getSubmissionsStu = async (tab,page) => API.get(`/get/submissionsStu/${tab}?page=${page}`);
export const getPost = async (type, id) => API.get(`get/${type}/${id}`);
export const getPostToEdit = async (id, type) => API.get(`/get/edit/${type}/${id}`);