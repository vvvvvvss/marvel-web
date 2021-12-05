import rsa from "../models/rsa.js";

export const getRsaByCourse = async (req, res) => {
    try {
        const feed = await rsa.find({courseCode: req.params.id}).sort({_id : -1})
                        .skip((Number(req.query.page)-1)*8).limit(8).lean().exec();        
        return res.json({feed : feed, status:'200'});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message: 'Something went wrong.'})
    }
}