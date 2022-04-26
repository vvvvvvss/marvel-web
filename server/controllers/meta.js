import prs from "../models/projectReport.js";

export const hasSubmittedPr = async (req, res)=>{
try {
    const condition = req?.user?.enrollmentStatus==='ACTIVE'&&req.user.currentRole==='STU'; 
    if(!condition) return res.json({status:'403', message:'Access denied.'});


    const pr = await prs.findOne({$and:[{authorId:req.user.id},
                                        {courseCode:req.user.currentStuCourse},
                                        {level:req.user.currentLevel}]}).select("reviewStatus").lean().exec();
    
    return res.json({status:'200',meta:{hasSubmittedPr:!!pr, reviewStatus: pr?.reviewStatus}})
} catch (error) {
    console.log(error);
    return res.json({status:'BRUH', message:'Something went wrong:('});  
}
}