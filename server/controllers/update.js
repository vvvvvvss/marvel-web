import blogPost from "../models/blogPost.js";
import user from "../models/user.js";
import course from "../models/course.js";
import cloudinary from "cloudinary";
import sanitize from "sanitize-html";
import projectReport from "../models/projectReport.js";
import rsa from "../models/rsa.js";

export const updateProfile = async (req, res)=>{
    try {
        const newProfile = req.body;
        if(newProfile?.linkedIn){
            const linkedInRegex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/gim
            if(!linkedInRegex.test(newProfile?.linkedIn)) return res.json({status:'linkedInError'});
        }else if(newProfile?.gitHub){
            const gitHubRegex = /https:\/\/github\.com\/[^\/]/gm
            if(!gitHubRegex.test(newProfile?.gitHub)) return res.json({status:'gitHubError'});
        }else if(newProfile?.website){
            const websiteRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
            if(!websiteRegex.test(newProfile?.website)) return res.json({status:'websiteError'});
        }
        const oldProfile = await user.findOne({id: req?.user?.id});
        Object.assign(oldProfile, {
            bio: newProfile?.bio, gitHub:newProfile?.gitHub, linkedIn : newProfile?.linkedIn,website : newProfile?.website
        })
        const {bio, linkedIn, website,gitHub}= await oldProfile.save();
        return res.json({profile :{bio,linkedIn,gitHub,website}, status:'201'});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message :'Something happened idk wat'});
    }
}

export const updateBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const existingBlog = await blogPost.findOne({slug : id});
        if(!existingBlog) return res.json({status:'404', message:'that post does not exist'});
        if(existingBlog?.authorId !== req.user.id) return res.json({message:'Access denied', status:'404'});
        
        let newImage = '';
        if(req.body.coverPhoto !== existingBlog?.coverPhoto){
            newImage = (await cloudinary.v2.uploader.upload(req.body.coverPhoto , 
                {resource_type: "image", public_id: `blog/${existingBlog._id}`,
                                    overwrite: true, secure : true})).secure_url;
        }else {newImage = existingBlog?.coverPhoto};
        const cleanContent = sanitize(req.body.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
        });
        Object.assign(existingBlog,
            {
                title : req.body.title, coverPhoto: newImage, 
                content: cleanContent, tags : req.body.tags, reviewStatus : 'PENDING', feedback : ''
            })

        const editedPost = await existingBlog.save();
        return res.json({status : '201', post: editedPost});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message:'Somthing went wrong :('})
    }
}

export const updatePR = async (req, res) => {
    try {
        const {id} = req.params;
        const existingPR = await projectReport.findOne({slug : id});
        if(!existingPR) return res.json({status:'404', message:'that post does not exist'});
        if(existingPR?.authorId !== req.user.id) return res.json({message:'Access denied', status:'404'});
        
        const cleanContent = sanitize(req.body.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
        });
        Object.assign(existingPR,
            {
                title : req.body.title, content: cleanContent,
                tags : req.body.tags, reviewStatus: 'PENDING', feedback:''
            });

        const editedPost = await existingPR.save();
        return res.json({status : '201', post: editedPost});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message:'Somthing went wrong :('})
    }
}

export const updateRSA = async (req, res) => {
    try {
        const {id} = req.params;
        const returnedRsa = await rsa.findOne({slug : id});
        const condition = ((req.user.enrollmentStatus==='ACTIVE' && req.user.currentRole==='INS') && req.user.id===returnedRsa?.authorId);
        if(!condition) return res.json({message:'Access denied.', status:'404'});
        
        const cleanContent = sanitize(req.body.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
        });
        
        Object.assign(returnedRsa, {
            title : req.body.title,
            content : cleanContent, tags : req.body.tags
        });
        const newRsa = await returnedRsa.save();
        return res.json({post : newRsa, status : '201'});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message:'Something went wrong:('});
    }
}

export const addTask = async (req, res) => {
    try {
        const {tskIndex, lvIndex} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE"&&
                        req.user.currentRole==="INS"&&
                        req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'404', message:'Access denied.'});

        const existingCourse = await course.findOne({courseCode:id});
        existingCourse?.levels[Number(lvIndex)].tasks.splice(Number(tskIndex),0,{description :""});
        const newCourseData = await existingCourse.save();

        return res.json({status:'201', course:{levels:newCourseData?.levels}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
};

export const deleteTask = async (req, res) => {
    try {
        const {tskIndex, lvIndex, taskId} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE"&&
                        req.user.currentRole==="INS"&&
                        req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'404', message:'Access denied.'});

        const existingCourse = await course.findOne({courseCode: id});
        if(existingCourse.levels[Number(lvIndex)].tasks[Number(tskIndex)]._id.toString() !== taskId){
            return res.json({status:'500', course: {levels:existingCourse?.levels, courseCode:existingCourse?.courseCode}});
        } 

        existingCourse.levels[Number(lvIndex)]?.tasks?.splice(Number(tskIndex),1);
        const newCourseData = await existingCourse.save();
        return res.json({status:'201',course:{levels:newCourseData?.levels,courseCode:newCourseData.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('})
    }
};

export const editTask = async (req, res) => {
    try {
        const {tskIndex, lvIndex, taskId} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE"&&
        req.user.currentRole==="INS"&&
        req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'404', message:'Access denied.'});

        const existingCourse = await course.findOne({courseCode: id});
        if(existingCourse.levels[Number(lvIndex)].tasks[Number(tskIndex)]._id.toString() !== taskId){
        return res.json({status:'500', course: {levels:existingCourse?.levels, courseCode:existingCourse?.courseCode}});
        }

        existingCourse.levels[Number(lvIndex)].tasks[Number(tskIndex)].description = req.body.content;
        const newCourseData = await existingCourse.save();
        return res.json({status:'201', course:{levels:newCourseData?.levels, courseCode:newCourseData?.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('})
    }
};

export const addLevel = async (req, res) => {
    try {
        const {lvIndex} = req.query;
        const {id} = req.params;
        const condition = req.user.enrollmentStatus==="ACTIVE" && req.user.currentRole==="INS" &&
                            req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'404', message:'Access denied.'});

        const prCount = await projectReport.countDocuments({$and:[{courseCode:id}, {level:(Number(lvIndex)+1)}]}).lean().exec();
        if(prCount>0) return res.json({status:'501', message:'mess' });
        
        const existingCourse = await course.findOne({courseCode:id});
        existingCourse.levels.splice(Number(lvIndex), 0, {tasks:[{description:""}]});
        existingCourse.totalLevels+=1;
        const newCourseData = await existingCourse.save();
        return res.json({status:'201', course:{levels:newCourseData.levels}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message:'Something went wrong:('});
    }
}

export const deleteLevel = async (req,res) => {
    try {
        const {lvIndex, levelId} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE" && req.user.currentRole==="INS"&&
                            req.user.currentInsCourse.includes(id);
        if(!condition) return res.json({message:"Access denied.", status:'404'});

        const prCount = await projectReport.countDocuments({$and:[{courseCode:id}, {level:(Number(lvIndex)+1)}]}).lean().exec();
        if(prCount>0) return res.json({status:'501', message:'mess' });

        const existingCourse = await course.findOne({courseCode:id});
        if(existingCourse.levels[Number(lvIndex)]._id.toString()!== levelId)return res.json({status:'500',course:{levels: existingCourse.levels}});
        existingCourse.levels.splice(Number(lvIndex), 1);
        existingCourse.totalLevels-=1;
        const newCourseData = await existingCourse.save();
        return res.json({status:"201",course:{levels:newCourseData.levels}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message:'Something went wrong.'});
    }
}