import course from "../models/course.js";
import prs from "../models/projectReport.js";

export const hasSubmittedPr = async (req, res)=>{
try {
    const condition = req?.user?.enrollmentStatus==='ACTIVE'&&req.user.currentRole==='STU'; 
    if(!condition) return res.json({status:'403', message:'Access denied.'});
    const totalLevels = (await course.findOne({courseCode: req.user?.currentStuCourse}).select("-_id totalLevels").lean().exec())?.totalLevels;

    const meta = {};

    for(let i=1; i<=totalLevels;i++){
        const subbed = await prs.countDocuments({ $and:[{courseCode: req.user.currentStuCourse},{level:i}]});
        if(subbed===1){
            meta[`${i}`]=true;
        }else{
            meta[`${i}`]=false;
        }   
    }

    return res.json({status:'200',meta:meta})
} catch (error) {
    console.log(error);
    return res.json({status:'BRUH', message:'Something went wrong:('});  
}
}