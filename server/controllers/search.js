import rsa from "../models/rsa.js";
import user from "../models/user.js";
import blog from "../models/blogPost.js";
import pr from "../models/projectReport.js";
import course from "../models/course.js";

const buildQuery = (queryParam, type)=>{
    const query = {
        $and : [
            ['pr','rsa'].includes(type)&&           {domain : (queryParam?.domain) ? {$exists : 1}: new RegExp(queryParam?.domain,'i')},
            ['pr','blog','rsa'].includes(type)&&    {title : (!queryParam?.title) ? {$exists : 1}: new RegExp(queryParam?.title,'i')},
            ['pr','rsa','course'].includes(type)&&  {courseCode : (!queryParam?.courseCode) ? {$exists : 1}: new RegExp(queryParam?.courseCode,'i')},
            ['pr','rsa'].includes(type)&&           {authorName : (!queryParam?.authorName) ? {$exists : 1}: new RegExp(queryParam?.authorName,'i')},
            ['pr','rsa','blog'].includes(type)&&    {tags : (!queryParam?.tags) ? {$exists : 1} : {$in : queryParam?.tags?.split(',').map((tag)=>(new RegExp(tag,'i')))}},
            ['pr','blog'].includes(type)&&          {reviewStatus: 'APPROVED'},
            ['user'].includes(type)&&               {name:!queryParam?.authorName ? {$exists:1} : new RegExp(queryParam?.authorName,'i')},
            ['user'].includes(type)&&               {enrollmentStatus:{$in:['ACTIVE','INACTIVE','GUEST']}}, //guest is a future feature
            ['course'].includes(type)&&             {domainName:!queryParam?.domain ? {$exists:1} : queryParam?.domain}
        ].filter(Boolean)
    };
    return query;
}

export const searchRsa = async(req, res)=>{
try {
    const LIMIT = 6;
    const query = buildQuery(req?.query, 'rsa');
    const feed = await rsa.find(query)
                            .skip((Number(req.query?.page)-1)*(req.query?.scope==='rec'?4:LIMIT))
                            .limit((req.query?.scope==='rec'?4:LIMIT))
                            .select("-_id -content -tags -rankingScore")
                            .lean().exec();

    return res.json({feed: feed, status:'200'});
} catch (error) {
    console.log(error);
    return res.json({status:'BRUH', message:'Something went wrong'});
}
}

export const searchPr = async(req, res) => {
 try {

    const LIMIT = 6;
    const query = buildQuery(req?.query, 'pr');
    const feed = await pr.find(query).skip((Number(req.query?.page)-1)*(req.query?.scope==='rec'?4:LIMIT))
                                    .limit((req.query?.scope==='rec'?4:LIMIT))
                                    .select("-_id -content -tags -feedback -reviewStatus")
                                    .lean().exec();
    
    return res.json({feed: feed, status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}

export const searchBlog = async(req, res) => {
 try {
    const LIMIT = 6;
    const query = buildQuery(req?.query, 'blog');
    const feed = await blog.find(query)
                            .skip((Number(req.query?.page)-1)*(req.query?.scope==='rec'?4:LIMIT))
                            .limit((req.query?.scope==='rec'?4:LIMIT))
                            .select("-_id -content -tags -authorCourseCode -reviewStatus -feedback -rankingScore")
                            .lean().exec();

    return res.json({feed:feed, status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}

export const searchUser = async(req, res) => {
 try {
    const LIMIT = 6;
    const query = buildQuery(req?.query, 'user');
    const feed = await user.find(query).skip((Number(req.query.page)-1)*LIMIT).limit(LIMIT).select("-_id -email -currentLevel -roleHistory -rights -enrollmentStatus -bio -gitHub -linkedIn -website").lean().exec();

    return res.json({feed:feed, status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}

export const searchCourse = async(req, res) => {
 try {
    const LIMIT = 6;
    const query = buildQuery(req?.query, 'course');
    const feed = await course.find(query).skip((Number(req.query?.page)-1)*LIMIT).limit(LIMIT).select(("-_id -submissionStatus -intro -levels -rankingScore")).lean().exec();

    return res.json({feed:feed, status:'200'});
 } catch (error) {
     console.log(error);
     return res.json({status:'BRUH', message:'Something went wrong'});
 }
}