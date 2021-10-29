import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import bannedUser from '../models/bannedUser.js';
import user from '../models/user.js';

export const authController = async (req, res) => {
try {
    dotenv.config();
    const {token} = req.body;
    const gClient = new OAuth2Client(process.env.CIENT_ID);
    const ticket = await gClient.verifyIdToken({idToken : token, audience : process.env.CIENT_ID});
    const userData = ticket.getPayload();

    // BANNED USER
    const isBanned = await bannedUser.findOne({id : userData?.sub}).lean();
    if(isBanned) return res.json({status : '404', authUser : null});
    
    const existingUser = await user.aggregate([
        {$match : { id : userData?.sub }},
        {$project : { joinedAt : 0, _id : 0, bio:0,linkedIn:0,gitHub:0,website:0,}}, { $limit : 1}
    ]);

    const isActiveStudent = ((existingUser[0]?.currentRole==='STU')&&
                            (existingUser[0]?.enrollmentStatus==='ACTIVE'));
    const isActiveInstrutor=((existingUser[0]?.currentRole==='INS')&&
                            (existingUser[0]?.enrollmentStatus==='ACTIVE'));
    const isInactiveUser=(existingUser[0]?.enrollmentStatus==='INACTIVE');
    
    // NEW UNKNOWN USER
    if(!existingUser[0]?.id) {
        const newUser = new user({id : userData?.sub,
                                name : userData?.name,
                                profilePic : userData?.picture,
                                email : userData?.email,
                                });
        const createdUser = await newUser.save();
        return res.json({status : 'UNKNOWN', authUser : createdUser});
    // UNKNOWN OLD USER    
    }else if(existingUser[0]?.enrollmentStatus==='UNKNOWN'){
        return res.json({status : 'UNKNOWN', authUser : existingUser[0]});
    // KNOWN USER    
    }else if(isActiveInstrutor||isActiveStudent||isInactiveUser){
        return res.json({status : '200', authUser : existingUser[0]});
    // EDGE CASE    
    }else {
        return res.json({status : 'BRUH', message : 'Auth did not go as expected.', authUser : null})
    }
        
} catch (err) {
    console.log(err);
    res.json({status : 'BRUH', message : 'Auth did not go as expected.', authUser : null})
}
}