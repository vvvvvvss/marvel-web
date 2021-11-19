import cloudinary from 'cloudinary';
import projectReport from '../models/projectReport.js';
import sanitizer from 'sanitize-html';
import blogPost from '../models/blogPost.js';

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
        return res.json({post : createdPR, status : '201', message : 'successfully created pr'});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message :'Something happened idk wat'});
    }
}

export const createBlog = async (req , res) => {
    try {
        const cleanContent = sanitizer(req.body.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
        });
        const newBlogPost = new blogPost({
        authorId : req.user.id, authorName:req.user?.name, authorCourseCode : `${req.user?.currentRole==='STU' ? req.user?.currentStuCourse : 'NA'}`,
        authorSlug : req.user.slug, authorImage : req.user?.profilePic,
        createdAt : new Date(), title : req.body.title, tags : req.body?.tags,
        content : cleanContent, reviewStatus : 'PENDING', feedback : ''
        });

        newBlogPost.coverPhoto = (await cloudinary.v2.uploader.upload(req.body.coverPhoto, {
            resource_type: "image", public_id: `blog/${newBlogPost?._id}`,
            overwrite: true, secure : true
        })).secure_url;

        const createdPost = await newBlogPost.save();
        return res.json({status : '201', post : createdPost});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message :'Something happened idk wat'});
    }
}