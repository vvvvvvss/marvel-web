import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import bannedUser from '../models/bannedUser.js';
import user from '../models/user.js';

export const authController = async (res, req) => {
try {
    dotenv.config();
    const {token} = req.body;
    const gClient = new OAuth2Client(process.env.CIENT_ID);

    const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
    const userData = ticket.getPayload();

    const isBanned = await bannedUser.findOne({id : userData?.sub}).lean();
    if(isBanned) return res.json({status : '404'});
    
    const existingUser = await user.findOne({id : userData?.sub}).lean();
    if(!existingUser) return res.json({status : 'UNKNOWN'});

    if(existingUser?.enrollmentStatus==='ALUMNI') return res.json({status : 'ALUMNI'});
        
    if(existingUser?.enrollmentStatus==='ACTIVE'){
        if(existingUser?.currentRole==='INS'){
            
        }
    }
    
    

} catch (err) {
    console.log(err);
}
}