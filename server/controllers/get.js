import course from "../models/course.js";
import blogs from '../models/blogPost.js';
import prs from '../models/projectReport.js';
import user from '../models/user.js';
import rsa from '../models/rsa.js';

export const getCourse = async ( req, res) =>{
    try {
        const {id} = req.params;
        const {scope} = req.query;
        let returnedCourse = {};
        if(scope==='dashboard'){
            returnedCourse = await course.findOne({courseCode : id.trim()}).select('-_id -intro -caption -courseDuration').lean().exec();
        }else if(scope==='switch'){
            returnedCourse = await course.findOne({courseCode : id.trim()}).select('-_id submissionStatus totalLevels').lean().exec();
        }else if(scope==='overview'){
            returnedCourse = await course.findOne({courseCode : id.trim()}).select('-_id -levels -submissionStatus').lean().exec();
        }else if(scope==='levels'){
            returnedCourse = await course.findOne({courseCode: id.trim()}).select('-_id levels');
        } else{
            returnedCourse = await course.findOne({courseCode : id.trim()}).select('-_id').lean().exec();
        }
        if(!returnedCourse) return res.json({status : '404'});
        return res.json({status : '200', course : returnedCourse});
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
            returnedProfile = await user.findOne({slug : id}).select('bio gitHub website linkedIn id slug -_id enrollmentStatus').exec();
        }else if(scope==='page'){
            returnedProfile = await user.findOne({slug: id})
            .select("-_id slug name profilePic id currentRole currentStuCourse currentInsCourse currentLevel bio gitHub website linkedIn enrollmentStatus").exec();
        }
        if((!returnedProfile || returnedProfile?.enrollmentStatus==='UNKNOWN')|| 
        returnedProfile?.enrollmentStatus==='BANNED') return res.json({status : '404'});
        
        return res.json({profile : returnedProfile, status : '200'});
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong :(',status:'BRUH'})
    }
}

export const getSubmissionsBlog = async (req, res)=>{
    try {
        const returnedBlogPosts = await blogs.find({authorId:req.user.id})
                                .sort({_id:-1})
                                .skip((Number(req.query.page)-1)*3)
                                .limit(3).select("-content -coverPhoto -tags -feedback")
                                .lean().exec();
        // console.log(await blogs.db.db.admin().command({getLastRequestStatistics : 1}));
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
        if(!condition) return res.json({message : 'you cannot be doing this', staus:'404'});
        
        const returnedPRs = await prs.find({ $and : [{authorId : req.user.id}, {courseCode : req.user.currentStuCourse}]})
                                    .sort({_id:-1})
                                    .select("-content -feedback -tags").lean().exec();
        return res.json({status : '200', submissions : returnedPRs, total : 1});
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

        const returnedRsa = await rsa.find({ $and : [{authorId: req.user.id}, {courseCode: {$in : req.user.currentInsCourse}}]})
                                    .skip((Number(page)-1)*3).limit(3)
                                    .select("-_id -content -tags -feedback").lean().exec();

        const total = await rsa.countDocuments({$and : [{authorId: req.user.id}, {courseCode: {$in : req.user.currentInsCourse}}]});
        return res.json({submissions : returnedRsa, total: (Math.ceil(total/3)), status:'200'});
    } catch (error) {
        console.log(error);
        return res.json({status:'404', message:'Something went wrong :('});
    }
}

export const getPR = async (req, res) => {
    try {
        const {id} = req.params;
        if(req.query?.scope==='ins'&& !(req?.user?.currentRole==='INS'&& req?.user?.enrollmentStatus==='ACTIVE')){
            return res.json({message:'Access denied.', status : '404'});
        };
        let returnedPr;
        if(req.query?.scope==='ins'){
            returnedPr = await prs.findOne({slug : id}).lean().exec();
            returnedPr.totalLevels = (await course.findOne({courseCode : returnedPr?.courseCode}).select('totalLevels -_id').lean().exec()).totalLevels;
        } else {
            returnedPr = await prs.findOne({slug : id}).lean().exec();
        };

        if(!returnedPr) return res.json({message:'That doesnt exist.', status:'404'});
        if(['PENDING','FLAGGED'].includes(returnedPr?.reviewStatus)){
            if(!req?.user){ return res.json({status:'404'}); }
            if((req?.user?.id===returnedPr?.authorId) || 
            (req?.user?.currentRole==='INS'&& req.user?.currentInsCourse.includes(returnedPr?.courseCode))){
                return res.json({post : returnedPr,status:'200'});
            }
        }else{
            return res.json({post : returnedPr, status:'200'});
        }
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong:(',status:'404'});
    }
}

export const getBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const returnedBlog = await blogs.findOne({slug : id}).lean().exec();
        if(!returnedBlog) return res.json({message:'That does not exist',status:'404'});
        if(['PENDING','FLAGGED'].includes(returnedBlog?.reviewStatus)){
            if(!req.user)return res.json({status:'404'});
            if((req.user?.id===returnedBlog?.authorId)||
             (req.user?.currentRole==='INS' && req.user?.currentInsCourse.includes(returnedBlog?.authorCourseCode))){
                 return res.json({post : returnedBlog, status:'200'});
             }
        }else{
            return res.json({post:{...returnedBlog, feedback:null, reviewStatus:null}, status:'200'});
        }
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong:(',status:'404'});
     }
}

export const getRsa = async (req, res) => {
    try {
        const {id} = req.params;
        const returnedRsa = await rsa.findOne({slug : id}).lean().exec();
        if(!returnedRsa) return res.json({status:'404', message:'It does not exist'});
        return res.json({post : returnedRsa, status:'200'});
    } catch (error) {
        console.log(error);
        return res.josn({message:'Something went wrong:(', status:'BRUH'})
    }
}

export const getToReviewPrs = async (req, res) => {
    try {
        const courseArray = (req.query?.crsfltr==='none' || req.query?.crsFltr==='') ? 
                            req.user?.currentInsCourse : 
                            req.query?.crsFiltr?.split(',');

        const condition = (req.user.enrollmentStatus==='ACTIVE' && req.user.currentRole==='INS') 
                        && courseArray.some((c)=>(req.user.currentInsCourse.includes(c)));

        if(!condition) return  res.json({status:'404', message:'Access denied.'});

        const returnedPrs = await prs.find({$and : [{reviewStatus : 'PENDING'},{courseCode : {$in : courseArray}}]})
                                    .sort({_id:-1}).skip((Number(req.query.page)-1)*5)
                                    .limit(5).select("-content -tags -feedback").lean().exec();

    // console.log( await user.db.db.admin().command({getLastRequestStatistics : 1})); 

        return res.json({status : '200', posts : returnedPrs});
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong:('});
    }
}

export const getToReviewBlogs = async (req, res) => {
    try {
        const condition = (req.user.enrollmentStatus==='ACTIVE' && req.user.currentRole==='INS');
        if(!condition) return res.json({message: 'Access denied.', status:'404'});

        const returnedBlogs = await blogs.find({$and: [{reviewStatus: 'PENDING'},{authorCourseCode: {$in : req.user.currentInsCourse}}]})
                                        .sort({_id:1}).skip((Number(req.query.page)-1)*5)
                                        .limit(5).select("-content -coverPhoto -tags -feedback").lean().exec();
        return res.json({status: '200', posts: returnedBlogs});
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong:('});
    }
}