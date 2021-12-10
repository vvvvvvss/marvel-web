import rsa from "../models/rsa.js";
import prs from "../models/projectReport.js";
import blog from "../models/blogPost.js"

export const getRsaByCourse = async (req, res) => {
    try {
        const titleQuery = (req.query.title==='none' || !req.query.title) ? new RegExp("",'i') : new RegExp(req.query?.title, 'i') ;
        const feed = await rsa.find({$and : [{courseCode: req.params.id},{title : titleQuery}]})
                        .select('-_id -content -authorId')
                        .sort({_id : -1})
                        .skip((Number(req.query.page)-1)*8).limit(8).lean().exec();
        const total = await rsa.countDocuments({$and : [{courseCode: req.params.id},{title : titleQuery}]});       
        return res.json({feed : feed, total : Math.ceil(total/8) ,status:'200'});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message: 'Something went wrong.'})
    }
}

export const getPrByProfile = async (req, res) => {
    try {
        const titleQuery = (req.query?.title==='none'||!req.query?.title) ? new RegExp("",'i') : new RegExp(req.query.title,'i');

        let feed;let total;

        if(req?.user?.slug===req.params?.id){
            feed = await prs.find({$and:[{authorSlug : req.params?.id},{title: titleQuery}]})
            .sort({_id:-1})
            .skip((Number(req.query?.page)-1)*8).limit(8).select("-_id -content -tags -feedback -rankingScore").lean().exec();
            total = await prs.countDocuments({$and:[{authorSlug : req.params?.id},{title: titleQuery}]}).lean().exec();
        }else{
            feed = await prs.find({$and : [{authorSlug : req.params?.id},{reviewStatus:'APPROVED'},{title : titleQuery}]})
            .sort({_id:-1})
            .skip((Number(req.query?.page)-1)*8).limit(8).select("-_id -content -tags -feedback -rankingScore").lean().exec();
            total = await prs.countDocuments({$and : [{authorSlug : req.params?.id},{reviewStatus:'APPROVED'},{title : titleQuery}]}).lean().exec();
        }

        return res.json({status:'200',feed: feed, total :  Math.ceil(total/8)})
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}

export const getBlogByProfile = async (req, res) => {
    try {
        let feed;let total;
        const titleQuery = (req.query?.title==='none'||!req.query?.title) ? new RegExp("",'i') : new RegExp(req.query.title,'i');
        if(req?.user?.slug===req.params.id){
            feed = await blog.find({$and : [{authorSlug:req.params.id},{title:titleQuery}]}).sort({_id:-1})
                    .skip((Number(req.query.page)-1)*8).limit(8).select("-_id -content -tags -feedback -rankingScore").lean().exec();
            total = await blog.countDocuments({$and : [{authorSlug:req.params.id},{title:titleQuery}]}).lean().exec();
        }else{
            feed = await blog.find({$and : [{authorSlug:req.params.id},{reviewStatus:'APPROVED'},{title : titleQuery}]})
            .sort({_id:-1})
            .skip((Number(req.query.page)-1)*8).limit(8).select("-_id -content -tags -feedback -rankingScore").lean().exec();
            total = await blog.countDocuments({$and : [{authorSlug:req.params.id},{reviewStatus:'APPROVED'},{title:titleQuery}]}).lean().exec();
        }
        return res.json({status:'200',feed:feed, total :  Math.ceil(total/8)});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}

export const getRsaByProfile = async (req, res) => {
    try {
        const titleQuery = (req.query?.title==='none'||!req.query?.title) ? new RegExp("",'i') : new RegExp(req.query.title,'i');
        const feed = await rsa.find({$and : [{authorSlug:req.params.id},{title: titleQuery}]}).sort({_id:-1})
        .skip((Number(req.query.page)-1)*8).limit(8).select("-_id -content -tags -feedback -rankingScore").lean().exec();
        const total = await rsa.countDocuments({$and : [{authorSlug:req.params.id},{title: titleQuery}]}).lean().exec();
        
        return res.json({status:'200',feed:feed, total : Math.ceil(total/8)});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}

export const getCertByProfile = async (req, res) => {
    try {
        ///getting certificates
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
}