import course from "../models/course.js";
import blogs from '../models/blogPost.js';
import prs from '../models/projectReport.js';
import user from '../models/user.js';
import rsa from '../models/rsa.js';

export const getCourse = async ( req, res) =>{
    try {
        const {id} = req.params;
        const {scope} = req.query;
        let returnedCourse ={};
        if(scope==='dashboard'){
            returnedCourse = await course.aggregate([
            { $match : {courseCode : id.trim()}}, { $limit : 1}, { $project : {_id : 0, intro : 0}} ]);
        }else{
            returnedCourse = await course.aggregate([ 
            { $match : {courseCode : id.trim()}}, { $limit : 1}, { $project : {_id : 0}} ]);
        }
        if(!returnedCourse[0]) return res.json({status : '404'})
        return res.json({status : '200', course : returnedCourse[0]});
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async(req, res)=>{
    try {
        const {id} = req.params;
        const {scope} = req.query;

        let returnedProfile;
        if(scope==='dashboard'){
            returnedProfile = await user.aggregate([
            {$match : {id : id}}, {$limit : 1},
            {$project : { bio : 1, linkedIn:1, gitHub:1, website:1, id:1, currentLevel :1}}
            ])
        }
        if(!returnedProfile[0]) return res.json({status : '404'});
        
        return res.json({profile : returnedProfile[0], status : '200'});
    } catch (error) {
        console.log(error);
    }
}

export const getSubmissionsBlog = async (req, res)=>{
    try {
        const returnedBlogPosts = await blogs.aggregate([
            { $match : { authorId : req.user.id }},
            { $sort : { _id : -1 } }, { $skip : (Number(req.query.page)-1)*3}, { $limit : 3 }
        ]) ;
        const total = await blogs.countDocuments({ authorId : req.user.id}).lean();
        return res.json({status : '200', total : (Math.ceil(total/3)), submissions : returnedBlogPosts});        
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message : 'Something happened idk wat'});
    }
}

export const getSubmissionsPr = async (req, res)=>{
    try {
        const condition = (req.user.enrollmentStatus==='ACTIVE') &&
                            ( req.user.currentRole === 'STU');
        if(!condition) return res.json({message : 'you cannot be doing this'});
        const returnedPRs = await prs.aggregate([
            { $match : { $and : [{authorId : req.user.id}, {courseCode : req.user.currentStuCourse}]}},
            { $sort : { _id : -1 }},
            { $limit : 3 },
        ]);
        return res.json({status : '200', submissions : returnedPRs});
    } catch (error) {
        console.log(error);
        return res.json({message : 'Something happened idk wat', status : 'BRUH'});
    }
}

export const getSubmissionsRsa = async (req, res) => {
    try {
        const {page} = req.query;
        const condition = req.user.currentRole==='INS'&&req.user.enrollmentStatus==='ACTIVE';
        if(!condition) return res.json({message: 'Access denied.', status:'404'});

        const returnedRsa = await rsa.aggregate([
            { $match : { $and : [{authorId: req.user.id}, {courseCode: {$in : req.user.currentInsCourse}}]}},
            {$sort : {_id : -1}},
            {$skip : (Number(page)-1)*4},
            {$limit : 4}
        ]);
        const total = await rsa.countDocuments({$and : [{authorId: req.user.id}, {courseCode: {$in : req.user.currentInsCourse}}]});
        return res.json({submissions : returnedRsa, total: (Math.ceil(total/4)), status:'200'});
    } catch (error) {
        console.log(error);
        return res.json({status:'404', message:'Something went wrong :('});
    }
}

export const getPR = async (req, res) => {
    try {
        const {id}= req.params;
        const returnedPr = await prs.findOne({slug : id}).lean();
        if(!returnedPr) return res.json({message:'That doesnt exist.', status:'404'});
        if(['PENDING','FLAGGED'].includes(returnedPr?.reviewStatus)){
            if(!req.user){ return res.json({status:'404'}); }
            if((req.user?.id===returnedPr?.authorId) || 
            (req.user?.currentRole==='INS'&& req.user?.currentInsCourse.includes(returnedPr?.courseCode))){
                return res.json({post : returnedPr,status:'200'});
            }
        }else{
            return res.json({post : {...returnedPr, feedback:null}, status:'200'});
        }
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong:(',status:'404'});
    }
}

export const getBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const returnedBlog = await blogs.findOne({slug : id}).lean();
        if(!returnedBlog) return res.json({message:'That does not exist',status:'404'});
        if(['PENDING','FLAGGED'].includes(returnedBlog?.reviewStatus)){
            if(!req.user)return res.json({status:'404'});
            if((req.user?.id===returnedBlog?.authorId)||
             (req.user?.currentRole==='INS' && req.user?.currentInsCourse.includes(returnedBlog?.authorCourseCode))){
                 return res.json({post : returnedBlog, status:'200'});
             }
        }else{
            return res.json({post:{...returnedBlog, feedback:null}, status:'200'});
        }
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong:(',status:'404'});
     }
}