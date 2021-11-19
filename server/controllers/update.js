import blogPost from "../models/blogPost.js";
import user from "../models/user.js";
import cloudinary from "cloudinary";
import sanitize from "sanitize-html";
import projectReport from "../models/projectReport.js";

export const updateProfile = async (req, res)=>{
    try {
        const newProfile = req.body;
        if(newProfile?.linkedIn){
            const linkedInRegex = new RegExp('^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$');
            if(!linkedInRegex.test(newProfile?.linkedIn)) return res.json({status:'linkedInError'});
        }else if(newProfile?.gitHub){
            const gitHubRegex = new RegExp('/^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i');
            if(!gitHubRegex.test(newProfile?.gitHub)) return res.json({status:'gitHubError'});
        }else if(newProfile?.website){
            const websiteRegex = new RegExp('/^([a-zA-Z]+):\/\/(-\.)?(([^\s\/?\.#\-]+|([^\s\/?\.#\-]-[^\s\/?\.#\-]))\.?)+(\/[^\s]*)?$/mg');
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
            allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
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
        
        const cleanContent = sanitizer(req.body.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com'], nestingLimit : 5
        });
        Object.assign(existingPR,
            {
                title : req.body.title, content: cleanContent,
                 tags : req.body.tags, reviewStatus: 'PENDING', feedback:''
            })

        const editedPost = await existingPR.save();
        return res.json({status : '201', post: editedPost});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message:'Somthing went wrong :('})
    }
}