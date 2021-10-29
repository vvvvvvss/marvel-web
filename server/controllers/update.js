import user from "../models/user.js";

export const updateProfile = async (req, res)=>{
    try {
        const newProfile = req.body;

        if(newProfile?.linkedIn){
            const linkedInRegex = new RegExp('/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm');
            if(!linkedInRegex.test(newProfile?.linkedIn)) return res.json({status:'linkedInError'});
        }else if(newProfile?.gitHub){
            const gitHubRegex = new RegExp('https:\/\/github\.com\/[^\/]+\/');
            if(!gitHubRegex.test(newProfile?.gitHub)) return res.json({status:'gitHubError'});
        }else if(newProfile?.website){
            const websiteRegex = new RegExp('/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/');
            if(!websiteRegex.test(newProfile?.website)) return res.json({status:'websiteError'});
        }

        const toUpdate = new user({...req.user, bio:newProfile?.bio,
            linkedIn:newProfile?.linkedIn,
            gitHub:newProfile?.gitHub, website : newProfile?.website});
            toUpdate.isNew = false;
            const {bio, linkedIn, gitHub, website} = await toUpdate.save();
        return res.json({profile :{bio,linkedIn,gitHub,website}, status:'201'});
    } catch (error) {
        console.log(error);
    }
}