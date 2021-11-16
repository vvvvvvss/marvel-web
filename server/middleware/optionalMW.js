import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import user from '../models/user.js';

const optionalMW = async (req, res, next) => {
try {
    dotenv.config();
    const token = req.headers?.authorization?.split(' ')[1];
    if(!token){ 
        req.user=null; 
        next();
    }else {
        const gClient = new OAuth2Client(process.env.CIENT_ID);
        const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
        const userData = ticket.getPayload();

        const existingUser = await user.aggregate([
            {$match : { id : userData?.sub }},
            { $limit : 1},
            {$project : {bio : 0,gitHub:0,linkedIn:0,website:0}}
        ]);

        if(existingUser?.enrollmentStatus==='BANNED')return res.json({status : '404',message:'banned'})

        if(!existingUser[0] || existingUser[0]?.enrollmentStatus==='UNKNOWN'){
            req.user = null; next();
        }else{
            req.user = existingUser[0];
            next();
        } 
    }
    
} catch (err) {
    console.log(err);
    return res.json({status : 'BRUH', message : 'Request failed. wdk why.'})
}
}

export default optionalMW;