import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import user from '../models/user.js';

export const identityMW = async (req, res, next) => {
try {
    dotenv.config();
    const token = req.headers.authorization.split(' ')[1];
    const gClient = new OAuth2Client(process.env.CIENT_ID);
    const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
    const userData = ticket.getPayload();

    const existingUser = await user.aggregate([
        {$match : { id : userData?.sub }},
        { $limit : 1},
        {$project : {id:1, name:1,email:1,profilePic:1}}
    ]);

    if(existingUser?.enrollmentStatus==='BANNED')return res.json({status : '404',message:'banned'})

    if(!existingUser[0] || existingUser[0].enrollmentStatus==='UNKNOWN'){
        return res.json({message : 'unrecognizable request', status:'404'});
    }else{
        req.user = existingUser[0];
        next();
    } 
    
} catch (err) {
    console.log(err);
    res.json({status : 'BRUH', message : 'Request failed. wdk why.', authUser : null})
}
}