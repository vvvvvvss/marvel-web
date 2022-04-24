import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import user from '../models/user.js';

const identityMW = async (req, res, next) => {
try {
    dotenv.config();
    const gClient = new OAuth2Client(process.env.CIENT_ID);
    let userData;
    try {
        const token = req.headers.authorization?.split(' ')?.[1];
        const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
        userData = ticket.getPayload();
    } catch (error) {
        if(error.message=='The verifyIdToken method requires an ID Token'){
            return res.json({status : '401', message : 'Access denied. No token'});
        }else{
            return res.json({status : 'BRUH', message : 'Verificaion failed'});
        }
    }
    const existingUser = await user.findOne({id : userData?.sub}, "-bio -website -linkedIn -gitHub").lean();

    if(!existingUser || ["BANNED","UNKNOWN"].includes(existingUser?.enrollmentStatus)){
        return res.json({message : 'unrecognizable request', status:'404'});
    }else{
        req.user = existingUser;
        next();
    } 
    
} catch (err) {
    return res.json({status : 'BRUH', message : 'Request failed. wdk why.'})
}
}

export default identityMW;