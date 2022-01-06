import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import user from '../models/user.js';

const optionalMW = async (req, res, next) => {
try {
    dotenv.config();
    const token = req.headers?.authorization?.split?.(' ')[1];
    if(!token || token==='undefined'){ 
        req.user=null; 
        next();
    }else {
        const gClient = new OAuth2Client(process.env.CIENT_ID);
        const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
        const userData = ticket.getPayload();

        const existingUser = await user.findOne({id : userData?.sub}, "-bio -website -linkedIn -gitHub").lean();


        if(existingUser?.enrollmentStatus==='BANNED')return res.json({status : '404',message:'banned'})

        if(!existingUser || existingUser?.enrollmentStatus==='UNKNOWN'){
            req.user = null; next();
        }else{
            req.user = existingUser;
            next();
        } 
    }
    
} catch (err) {
    // console.log(err);
    return res.json({status : 'BRUH', message : 'Request failed. wdk why.'})
}
}

export default optionalMW;