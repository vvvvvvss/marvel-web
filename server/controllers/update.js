import user from "../models/user.js";

export const updateProfile = async (req, res)=>{
    try {
        const newProfile = req.body;
        if(newProfile?.linkedIn){
            const linkedInRegex = new RegExp('^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$');
            if(!linkedInRegex.test(newProfile?.linkedIn)) return res.json({status:'linkedInError'});
        }else if(newProfile?.gitHub){
            const gitHubRegex = new RegExp('/^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i');
            if(!gitHubRegex.test(newProfile?.gitHub)) return res.json({status:'gitHubError'});
        }else if(newProfile?.website){
            const websiteRegex = new RegExp('/^([a-zA-Z]+):\/\/(-\.)?(([^\s\/?\.#\-]+|([^\s\/?\.#\-]-[^\s\/?\.#\-]))\.?)+(\/[^\s]*)?$/mg');
            if(!websiteRegex.test(newProfile?.website)) return res.json({status:'websiteError'});
        }
        const oldProfile = await user.findOne({id: req?.user?.id});
        Object.assign(oldProfile, {
            bio: newProfile?.bio, gitHub:newProfile?.gitHub, linkedIn : newProfile?.linkedIn,website : newProfile?.website
        })
        const {bio, linkedIn, website,gitHub}= await oldProfile.save();
        return res.json({profile :{bio,linkedIn,gitHub,website}, status:'201'});
    } catch (error) {
        console.log(error);
        return res.json({status : 'BRUH', message :'Something happened idk wat'});
    }
}