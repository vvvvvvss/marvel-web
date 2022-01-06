import rsa from "../models/rsa.js";
import user from "../models/user.js";
import blog from "../models/blogPost.js";
import pr from "../models/projectReport.js";
import course from "../models/course.js";

export const searchRsa = async(req, res)=>{
try {
    const query = {
        $and : [
            {domain : (req?.query?.domain==='none'||!req?.query?.domain) ? new RegExp("",'i'): new RegExp(req.query?.domain,'i')},
            {title : (req?.query?.title==='none'||!req?.query?.title) ? new RegExp("",'i'): new RegExp(req.query?.title,'i')},
            {courseCode : (req?.query?.courseCode==='none'||!req?.query?.courseCode) ? new RegExp("",'i'): new RegExp(req.query?.courseCode,'i')},
            {authorName : (req?.query?.authorName==='none'||!req?.query?.authorName) ? new RegExp("",'i'): new RegExp(req.query?.authorName,'i')},
            {tags : (req?.query?.tag==='none'||!req?.query?.tag) ? new RegExp("",'i'): req.query.tags?.split(',').map((tag)=>(new RegExp(tag,'i')))}
        ]
    };

    const feed = await rsa.find(query)
                            .skip((Number(req.query?.page)-1)*(req.query?.scope==='rec'?4:8))
                            .limit((req.query?.scope==='rec'?4:8))
                            .select("-_id -content -tags -rankingScore")
                            .lean().exec();

    const total = await rsa.countDocuments(query).lean().exec();

    return res.json({feed: feed, total : Math.ceil(total/(req.query?.scope==='rec'?4:8)), status:'200'})
} catch (error) {
    console.log(error);
    return res.json({status:'BRUH', message:'Something went wrong'});
}
}

export const searchPr = async(req, res) => {
 try {
    const query = {
        $and : [
            {domain : (req?.query?.domain==='none'||!req?.query?.domain) ? new RegExp("",'i'): new RegExp(req.query?.domain,'i')},
            {title : (req?.query?.title==='none'||!req?.query?.title) ? new RegExp("",'i'): new RegExp(req.query?.title,'i')},
            {courseCode : (req?.query?.courseCode==='none'||!req?.query?.courseCode) ? new RegExp("",'i'): new RegExp(req.query?.courseCode,'i')},
            {authorName : (req?.query?.authorName==='none'||!req?.query?.authorName) ? new RegExp("",'i'): new RegExp(req.query?.authorName,'i')},
            {tags : (req?.query?.tag==='none'||!req?.query?.tag) ? new RegExp("",'i'): req.query.tags?.split(',').map((tag)=>(new RegExp(tag,'i')))},
            {reviewStatus : 'APPROVED'}
        ]
    };

    const feed = await pr.find(query).skip((Number(req.query.page)-1)*(req.query?.scope==='rec'?4:8))
                                    .limit((req.query?.scope==='rec'?4:8))
                                    .select("-_id -content -tags -feedback -reviewStatus")
                                    .lean().exec();
    const total = await pr.countDocuments(query);
    
    return res.json({feed: feed, total: Math.ceil(total/(req.query?.scope==='rec'?4:8)), status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}

export const searchBlog = async(req, res) => {
 try {
    const query = {
        $and : [
            {title : (req?.query?.title==='none'||!req?.query?.title) ? new RegExp("",'i'): new RegExp(req.query?.title,'i')},
            {authorName : (req?.query?.authorName==='none'||!req?.query?.authorName) ? new RegExp("",'i'): new RegExp(req.query?.authorName,'i')},
            {tags : (req?.query?.tag==='none'||!req?.query?.tag) ? new RegExp("",'i'): req.query.tags?.split(',').map((tag)=>(new RegExp(tag,'i')))},
            {reviewStatus : 'APPROVED'}
        ]
    };
    const feed = await blog.find(query)
                            .skip((Number(req.query?.page)-1)*(req.query?.scope==='rec'?4:8))
                            .limit((req.query?.scope==='rec'?4:8))
                            .select("-_id -content -tags -authorCourseCode -reviewStatus -feedback -rankingScore")
                            .lean().exec();
    const total = await blog.countDocuments(query).lean().exec();

    return res.json({feed:feed, total: Math.ceil(total/(req.query?.scope==='rec'?4:8)), status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}

export const searchUser = async(req, res) => {
 try {
    const query = {
        $and : [
            {name : (req?.query?.authorName==='none'||!req?.query?.authorName) ? new RegExp("",'i'): new RegExp(req.query?.authorName,'i')},
            {enrollmentStatus : {$in : ['ACTIVE','INACTIVE']}}
        ]
    };
    const feed = await user.find(query).skip((Number(req.query.page)-1)*8).limit(8).select("-_id -email -currentLevel -roleHistory -rights -enrollmentStatus -bio -gitHub -linkedIn -website").lean().exec();
    const total = await user.countDocuments(query).lean().exec();

    return res.json({feed:feed, total: Math.ceil(total/8), status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}

export const searchCourse = async(req, res) => {
 try {
    const query = {
        $and : [
            {domain : (req?.query?.domain==='none'||!req?.query?.domain) ? new RegExp("",'i'): new RegExp(req.query?.domain,'i')},
            {courseCode : (req?.query?.courseCode==='none'||!req?.query?.courseCode) ? new RegExp("",'i'): new RegExp(req.query?.courseCode,'i')},
        ]
    };
    const feed = await course.find(query).skip((Number(req.query?.page)-1)*8).limit(8).select(("-_id -submissionStatus -intro -levels -rankingScore")).lean().exec();
    const total = await course.countDocuments(query).lean().exec();

    return res.json({feed:feed, total: Math.ceil(total/8), status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}