import rsa from "../models/rsa.js";

export const getRsaByCourse = async (req, res) => {
    const titleQuery = (req.query.title==='none' || !req.query.title) ? new RegExp("",'i') : new RegExp(req.query?.title, 'i') ;
    try {
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