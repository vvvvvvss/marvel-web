import rsa from "../models/rsa.js";
import prs from "../models/projectReport.js";
import blog from "../models/blogPost.js"

export const getRsaByCourse = async (req, res) => {
    try {
        const LIMIT = 6;
        const titleQuery = (!req?.query?.title) ? new RegExp("",'i') : new RegExp(req?.query?.title, 'i') ;
        const feed = await rsa.find({$and : [{courseCode: req.params.id},{title : titleQuery}]})
                        .select('-_id -content -authorId')
                        .sort({_id : -1})
                        .skip((Number(req?.query?.page)-1)*LIMIT).limit(LIMIT).lean().exec();
        return res.json({feed : feed ,status:'200'});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message: 'Something went wrong.'})
    }
}

export const getPrByProfile = async (req, res) => {
    try {
        const titleQuery = !req?.query?.title ? {$exists:1} : new RegExp(req?.query?.title,'i');
        const LIMIT = 6;
        let feed;
        if(req?.user?.slug===req.params?.id){
            feed = await prs.find({$and:[{authorSlug : req.params?.id},{title: titleQuery}]})
            .sort({_id:-1})
            .skip((Number(req.query?.page)-1)*LIMIT).limit(LIMIT).select("-_id -content -tags -feedback -rankingScore").lean().exec();
        }else if(req?.user?.currentRole==="INS"){
            feed = await prs.find({$and:[{authorSlug : req.params?.id},{title: titleQuery},{$or:[{courseCode: {$in:req.user?.currentInsCourse}},{reviewStatus:'APPROVED'}]}]})
            .sort({_id:-1})
            .skip((Number(req.query?.page)-1)*LIMIT).limit(LIMIT).select("-_id -content -tags -feedback -rankingScore").lean().exec();
        } else{
            feed = await prs.find({$and : [{authorSlug : req.params?.id},{reviewStatus:'APPROVED'},{title : titleQuery}]})
            .sort({_id:-1})
            .skip((Number(req.query?.page)-1)*LIMIT).limit(LIMIT).select("-_id -content -tags -feedback -rankingScore").lean().exec();
        }

        return res.json({status:'200',feed: feed})
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}

export const getBlogByProfile = async (req, res) => {
    try {
        let feed;
        const LIMIT = 6;
        const titleQuery = !req?.query?.title ? {$exists:1} : new RegExp(req?.query?.title,'i');
        if(req?.user?.slug===req.params?.id){
            feed = await blog.find({$and : [{authorSlug:req.params.id},{title:titleQuery}]}).sort({_id:-1})
                    .skip((Number(req.query.page)-1)*LIMIT).limit(LIMIT).select("-_id -content -tags -feedback -rankingScore").lean().exec();
        }else{
            feed = await blog.find({$and : [{authorSlug:req.params.id},{reviewStatus:'APPROVED'},{title : titleQuery}]})
            .sort({_id:-1})
            .skip((Number(req.query.page)-1)*LIMIT).limit(LIMIT).select("-_id -content -tags -feedback -rankingScore").lean().exec();
        }
        return res.json({status:'200',feed:feed});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}

export const getRsaByProfile = async (req, res) => {
    try {
        const LIMIT = 6;
        const titleQuery = (req?.query?.title==='none'||!req?.query?.title) ? {$exists:1} : new RegExp(req?.query?.title,'i');
        const feed = await rsa.find({$and : [{authorSlug:req.params.id},{title: titleQuery}]}).sort({_id:-1})
        .skip((Number(req?.query?.page)-1)*LIMIT).limit(LIMIT).select("-_id -content -tags -rankingScore").lean().exec();
        
        return res.json({status:'200',feed:feed});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}

export const getCertByProfile = async (req, res) => {
    try {
        ///getting certificates
        return res.json({status:'200',feed:[]})
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}