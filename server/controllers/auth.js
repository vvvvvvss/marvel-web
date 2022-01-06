import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import user from '../models/user.js';

export const authController = async (req, res) => {
try {
    dotenv.config();
    const {token} = req.body;
    const gClient = new OAuth2Client(process.env.CIENT_ID);
    const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
    const userData = ticket.getPayload();

    const existingUser = await user.findOne({id : userData?.sub}, "-bio -website -linkedIn -gitHub").lean();

    //remove later
    // console.log( await user.db.db.admin().command({getLastRequestStatistics : 1}));
    //remove later
    const isActiveStudent = ((existingUser?.currentRole==='STU')&&
                            (existingUser?.enrollmentStatus==='ACTIVE'));
    const isActiveInstrutor=((existingUser?.currentRole==='INS')&&
                            (existingUser?.enrollmentStatus==='ACTIVE'));
    const isInactiveUser=(existingUser?.enrollmentStatus==='INACTIVE');

    // BANNED USER 
    if(existingUser?.enrollmentStatus==='BANNED') return res.json({status : '404', message : 'banned'})   
    // NEW UNKNOWN USER
    if(!existingUser?.id) {
        const newUser = new user({id : userData?.sub,
                                name : userData?.name,
                                profilePic : userData?.picture,
                                email : userData?.email,
                                });
        const createdUser = await newUser.save();
        return res.json({status : 'UNKNOWN', authUser : createdUser});
    // UNKNOWN OLD USER    
    }else if(existingUser?.enrollmentStatus==='UNKNOWN'){
        return res.json({status : 'UNKNOWN', authUser : existingUser});
    // KNOWN USER    
    }else if(isActiveInstrutor||isActiveStudent||isInactiveUser){
        return res.json({status : '200', authUser : existingUser});
    // EDGE CASE    
    }else {
        return res.json({status : 'BRUH', message : 'Auth did not go as expected.', authUser : null});
    }
        
} catch (err) {
    console.log(err);
    res.json({status : 'BRUH', message : 'Auth did not go as expected.', authUser : null})
}
}