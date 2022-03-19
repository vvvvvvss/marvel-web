

export const hasSubmittedPr = (req, res)=>{
try {
    const condition = req?.user?.enrollmentStatus==='ACTIVE'&&req.user.currentRole==='STU'; 

} catch (error) {
    console.log(error);
    return res.json({status:'BRUH', message:'Something went wrong:('});  
}
}