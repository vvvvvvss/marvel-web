import blogPost from '../models/blogPost.js';
import prs from '../models/projectReport.js';
import user from '../models/user.js';
import course from '../models/course.js';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

export const submitFeedbackPr = async (req, res) => {
    try {
        dotenv.config();
        const {id} = req.params;
        const condition = req.user.enrollmentStatus==='ACTIVE'&& req.user.currentRole==='INS';
        if(!condition) return res.json({message:'Access denied.', status:'404'});
        const returnedPost = await prs.findOne({slug : id});
        const author = await user.findOne({id : returnedPost?.authorId}).select("email name -_id").lean().exec();
        if(!returnedPost) return res.json({message : "that does'nt exist", status:'404'});
        const condition2 = req.user?.currentInsCourse?.includes(returnedPost?.courseCode) && returnedPost?.reviewStatus==='PENDING';
        if(!condition2) return res.json({message:'Access denied.', status : '404'});
        Object.assign(returnedPost, {feedback : req.body.fb, reviewStatus:'FLAGGED'}, {timestamps: false});
        await returnedPost.save();
        //email service
        try {
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail = {
                sender : {email:"uvcemarvelweb@gmail.com"},
                to: [{"name" : author?.name, "email": author?.email}],
                templateId : 8,
                params: {
                    courseCode : returnedPost?.courseCode,
                    level : returnedPost?.level,
                    name : returnedPost?.authorName,
                    insName : req.user?.name,
                    link : "https://uvcemarvel.in/"
                }
            }
            await apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (error) { console.log(error); }

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
        const author = await user.findOne({id : returnedPost?.authorId}).select("-_is email name").lean().exec();
        if(!returnedPost) return res.json({message : "that does'nt exist", status:'404'});
        const condition2 = req.user?.currentInsCourse?.includes(returnedPost?.authorCourseCode) && returnedPost?.reviewStatus==='PENDING';
        if(!condition2) return res.json({message:'Access denied.', status : '404'});

        Object.assign(returnedPost, {feedback : req.body.fb, reviewStatus:'FLAGGED'});
        await returnedPost.save();
        //email
        try {
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail = {
                sender : {email:"uvcemarvelweb@gmail.com"},
                to: [{"name" : author?.name, "email": author?.email}],
                templateId : 9,
                params: {
                    name : returnedPost?.authorName,
                    title : returnedPost?.title,
                    insName : req.user?.name,
                    link : "https://uvcemarvel.in/"
                }
            }
            await apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (error) { console.log(error); }
        return res.json({status : '201', message:'feedback submitted successfully.'});
    } catch (error) {
        console.log(error);
        return res.json({message : 'Something went wrong :(', status : 'BRUH'});
    }
}

export const approveBlog = async (req, res) => {
    try {
        const condition = req.user?.enrollmentStatus==='ACTIVE'&&req.user?.currentRole==='INS';
        if(!condition) return res.json({message:'Access denied.', status:'404'});
        const post = await blogPost.findOne({slug : req.params?.id}).exec();
        if(!req.user?.currentInsCourse?.includes(post?.authorCourseCode)) return res.json({message: 'Access denied.', status:'404'});

        Object.assign(post, {
            reviewStatus: 'APPROVED',
            feedback: ''
        });
        await post.save();
        //email
        try {
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail = {
                sender : {email:"uvcemarvelweb@gmail.com"},
                to: [{"name" : author?.name, "email": author?.email}],
                templateId : 9,
                params: {
                    name : post?.authorName,
                    title : post?.title,
                    insName : req.user?.name,
                    link : "https://uvcemarvel.in/"
                }
            }
            await apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (error) { console.log(error); }
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
        //course completed.
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
            // email service. done
            try {
                const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail = {
                    sender : {email:"uvcemarvelweb@gmail.com"},
                    to: [{"name" : author?.name, "email": author?.email}],
                    templateId : 10,
                    params: {
                        name : returnedPost?.authorName,
                        courseCode : returnedPost?.courseCode,
                        insName : req.user?.name,
                        link : "https://uvcemarvel.in/"
                    }
                }
                await apiInstance.sendTransacEmail(sendSmtpEmail);
            } catch (error) { console.log(error); }
            return res.json({status : '201', message:'successfully awarded certificate and approved.'});
        //level-up
        }else if(post?.level==author?.currentLevel && post?.level < totalLevels){
            //user proceeds next level done
            author.currentLevel +=1;
            await author.save();
            //post becomes public. done
            Object.assign(post, { reviewStatus: 'APPROVED', feedback : '' });
            await post.save();
            // email service. done
            try {
                const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail = {
                    sender : {email:"uvcemarvelweb@gmail.com"},
                    to: [{"name" : author?.name, "email": author?.email}],
                    templateId : 3,
                    params: {
                        name : post?.authorName,
                        courseCode : post?.courseCode,
                        level: Number(post?.level)-1,
                        insName : req.user?.name,
                        link : "https://uvcemarvel.in/"
                    }
                }
                await apiInstance.sendTransacEmail(sendSmtpEmail);
            } catch (error) { console.log(error); }

            return res.json({message: 'Successfully approved. Student proceeded to next level', status:'201'});
        //just approve
        } else if(post?.level < author?.currentLevel) {
            // post becomes public no change to author. done
            Object.assign(post, { reviewStatus: 'APPROVED', feedback : '' });
            await post.save();
            // email service. done
            try {
                const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail = {
                    sender : {email:"uvcemarvelweb@gmail.com"},
                    to: [{"name" : author?.name, "email": author?.email}],
                    templateId : 6,
                    params: {
                        name : post?.authorName,
                        courseCode : post?.courseCode,
                        level : post?.level,
                        insName : req.user?.name,
                        link : "https://uvcemarvel.in/"
                    }
                }
                await apiInstance.sendTransacEmail(sendSmtpEmail);
            } catch (error) { console.log(error); }
            return res.json({message: 'Successfully approved.', status:'201'});

        } else {
            return res.json({message : 'Something went wrong.', status:'404'});
        }
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message : 'Something went wrong.', error: error})
    }
}

export const toggleSub = async (req, res) => {
    try {
        const condition = (req.user.enrollmentStatus==='ACTIVE'&& req.user.currentRole==='INS')&&
                        (req.user.currentInsCourse.includes(req.params.id));
        if(!condition) return res.json({message: 'Access denied.', status: '404'});
        const courseData = await course.findOne({courseCode : req.params.id});
        if(Number(req.query.level)>courseData?.totalLevels || Number(req.query.level)<=0){
            return res.json({message: 'Access denied.', status: '404'});
        }
        courseData.submissionStatus.forLevel = courseData?.submissionStatus?.isAccepting ? 0 : Number(req.query.level);
        courseData.submissionStatus.isAccepting = !courseData?.submissionStatus?.isAccepting;
        const newCourseData = await courseData.save();
        return res.json({status: '201', course : {
            totalLevels : newCourseData?.totalLevels,
            submissionStatus : newCourseData?.submissionStatus,
            courseCode : newCourseData?.courseCode
        }});
    } catch (error) {
        console.log(error);
        return res.json({status :'BRUH', message : 'Something went wrong:('})
    }
}