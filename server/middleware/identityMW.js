import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import bannedUser from '../models/bannedUser.js';
import user from '../models/user.js';

export const identityMW = async (req, res, next) => {
try {
    dotenv.config();
    const token = req.headers.authorization.split(' ')[1];
    const gClient = new OAuth2Client(process.env.CIENT_ID);
    const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
    const userData = ticket.getPayload();

    // BANNED USER
    const isBanned = await bannedUser.findOne({id : userData?.sub}).lean();
    if(isBanned) return res.json({status : '404'});
    
    const existingUser = await user.aggregate([
        {$match : { id : userData?.sub }},
        { $limit : 1}
    ]);

    if(!existingUser[0] ||existingUser[0].enrollmentStatus==='UNKNOWN'){
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