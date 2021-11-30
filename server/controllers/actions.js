import blogPost from '../models/blogPost.js';
import prs from '../models/projectReport.js';
import user from '../models/user.js';
import course from '../models/course.js';

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
        const post = await blogPost.findOne({slug : req.params.id}).exec();
        if(!req.user?.currentInsCourse?.includes(post?.authorCourseCode)) return res.json({message: 'Access denied.', status:'404'});

        Object.assign(post, {
            reviewStatus: 'APPROVED',
            feedback: ''
        });
        await post.save();
        return res.json({message: 'Successfully approved blogpost.', status:'201'});
    } catch (error) {
        console.log(error);
        return res.json({message : 'Something went wrong:(', status:'BRUH'});
    }
}

export const approvePR = async (req, res) => {
    try {
        if(!(req.user?.enrollmentStatus==='ACTIVE' && req.user?.currentRole==='INS')) return res.json({message: 'Access denied.', status : '404'});
        const post = await prs.findOne({slug : req.params.id}).exec();
        if(!req.user?.currentInsCourse?.includes(post.courseCode)) return res.json({message : 'Access denied.', status : '404'});
        const totalLevels = (await course.findOne({courseCode: post.courseCode}).select('totalLevels -_id').lean().exec()).totalLevels;
        const author = await user.findOne({id : post.authorId}).exec();

        if(post?.level===author?.currentLevel===totalLevels){
            // award certificate. not done
            // make author inactive. role becomes na, currentStuCourse becomes na,
            Object.assign(author, {
                enrollmentStatus : 'INACTIVE', currentRole : 'NA',
                currentStuCourse : 'NA', currentLevel : 0,
            });
            await author.save();
            // post becomes public.
            Object.assign(post, { reviewStatus: 'APPROVED', feedback : '' });
            await post.save();
            // email service. not done.
            return res.json({status : '201', message:'successfully awarded certificate and approved.'});
        
        }else if(post?.level==author?.currentLevel && post?.level < totalLevels){
            //user proceeds next level done
            author.currentLevel +=1;
            await author.save();
            //post becomes public. done
            Object.assign(post, { reviewStatus: 'APPROVED', feedback : '' });
            await post.save();
            //email service. not done
            return res.json({message: 'Successfully approved. Student proceeded to next level', status:'201'})

        } else if(post?.level < author?.currentLevel) {
            // post becomes public no change to author. done
            Object.assign(post, { reviewStatus: 'APPROVED', feedback : '' });
            await post.save();
            // email service. not done
            return res.json({message: 'Successfully approved.', status:'201'});

        } else {
            return res.json({message : 'Something went wrong.', status:'404'});
        }
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message : 'Something went wrong.', error: error})
    }
}
