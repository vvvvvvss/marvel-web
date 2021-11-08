import cloudinary from 'cloudinary';

export const createPR = (req , res) => {
    try {
        const condition = (req.user.currentRole==='STU') && (req.user.enrollmentStatus==='ACTIVE');
        if(!condition) return res.json({status : '404', message : 'you cannot do this.'});
        
    } catch (error) {
        console.log(error);
    }
}

export const createBlog = (req , res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}