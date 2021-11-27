import blogPost from '../models/blogPost.js';
import prs from '../models/projectReport.js';
import user from '../models/user.js';

export const submitFeedbackPr = async (req, res) => {
    try {
        const {id} = req.params;
        const condition = req.user.enrollmentStatus==='ACTIVE'&& req.user.currentRole==='INS';
        if(!condition) return res.json({message:'Access denied.', status:'404'});
        const returnedPost = await prs.findOne({slug : id});
        if(!returnedPost) return res.json({message : "that does'nt exist", status:'404'});
        const condition2 = req.user?.currentInsCourse?.includes(returnedPost?.courseCode) && returnedPost?.reviewStatus==='PENDING';
        if(!condition2) return res.json({message:'Access denied.', status : '404'});

        Object.assign(returnedPost, {feedback : req.body.fb, reviewStatus:'FLAGGED'});
        await returnedPost.save();
        return res.json({status : '201', message:'feedback submitted successfully.'});
    } catch (error) {
        console.log(error);
        return res.json({message:'Something went wrong :(', status : 'BRUH'});
    }
}

export const submitFeedbackBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const condition = req.user.enrollmentStatus==='ACTIVE'&& req.user.currentRole==='INS';
        if(!condition) return res.json({message:'Access denied.', status:'404'});
        const returnedPost = await blogPost.findOne({slug : id});
        if(!returnedPost) return res.json({message : "that does'nt exist", status:'404'});
        const condition2 = req.user?.currentInsCourse?.includes(returnedPost?.authorCourseCode) && returnedPost?.reviewStatus==='PENDING';
        if(!condition2) return res.json({message:'Access denied.', status : '404'});

        Object.assign(returnedPost, {feedback : req.body.fb, reviewStatus:'FLAGGED'});
        await returnedPost.save();
        return res.json({status : '201', message:'feedback submitted successfully.'});
    } catch (error) {
        console.log(error);
        return res.json({message : 'Something went wrong :(', status : 'BRUH'});
    }
}

export const approveBlog = async (req, res) => {
    try {
        const condition = req.user?.enrollmentStatus==='ACTIVE'&&req.user.currentRole==='INS';
        if(!condition) return res.json({message:'Access denied.', status:'404'});
        const returnedPost = await blogPost.aggregate([
            {$match : {slug : req.params.id}},
            {}
        ])
        
    } catch (error) {
        console.log(error);
        return res.json({message : 'Something went wrong:(', status:'BRUH'});
    }
}

export const approvePR = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.json({status : 'BRUH', message : 'Something went wrong.'})
    }
}