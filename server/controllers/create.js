import cloudinary from 'cloudinary';
import projectReport from '../models/projectReport.js';
import sanitizer from 'sanitize-html';

export const createPR = async (req , res) => {
    try {
        const condition = (req.user.currentRole==='STU') && (req.user.enrollmentStatus==='ACTIVE');
        if(!condition) return res.json({status : '404', message : 'you cannot do this.'});
        const existingPR = await projectReport.aggregate([
            { $match : { $and : [{authorId : req.user.id}, {courseCode : req.user.currentStuCourse}, {level : req.user.currentLevel}]}},
            { $limit : 1}
        ]);
        if(existingPR[0]) return res.json({status : 'exists', message : 'PR for this level already exists.'});
        
        const newPR = new projectReport({ ...req.body,
        authorId : req.user.id, authorName : req.user.name,
        authorSlug : req.user.slug, authorImage : req.user.profilePic,
        level : req.user.currentLevel, courseCode : req.user.currentStuCourse,
        domain : req.user.currentStuCourse.slice(0,-4), reviewStatus : 'PENDING',
        createdAt : new Date(), feedback : ''});

        newPR.content = sanitizer(req.body?.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
          });

        const createdPR = await newPR.save();
        return res.json({pr : createdPR, status : '201', message : 'successfully created pr'});
    } catch (error) {
        console.log(error);
    }
}

export const createBlog = (req , res) => {
    try {
        const cleanContent = sanitizer(req.body.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
        })
    } catch (error) {
        console.log(error);
    }
}