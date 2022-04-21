import course from "../../models/course.js";
import sanitize from "sanitize-html";

export const addTask = async (req, res) => {
    try {
        const {tskIndex, lvIndex} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE"&&
                        req.user.currentRole==="INS"&&
                        req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'403', message:'Access denied.'});

        const existingCourse = await course.findOne({courseCode:id});
        existingCourse?.levels[Number(lvIndex)].tasks.splice(Number(tskIndex),0,{description :""});
        const newCourseData = await existingCourse.save();

        return res.json({status:'201', course:{levels:newCourseData?.levels, courseCode:newCourseData?.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('});
    }
};

export const deleteTask = async (req, res) => {
    try {
        const {tskIndex, lvIndex, taskId} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE"&&
                        req.user.currentRole==="INS"&&
                        req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'403', message:'Access denied.'});

        const existingCourse = await course.findOne({courseCode: id});
        if(existingCourse.levels[Number(lvIndex)].tasks[Number(tskIndex)]._id.toString() !== taskId){
            return res.json({status:'500', course: {levels:existingCourse?.levels, courseCode:existingCourse?.courseCode}});
        } 

        existingCourse.levels[Number(lvIndex)]?.tasks?.splice(Number(tskIndex),1);
        const newCourseData = await existingCourse.save();
        return res.json({status:'201',course:{levels:newCourseData?.levels,courseCode:newCourseData.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('})
    }
};

export const editTask = async (req, res) => {
    try {
        const {tskIndex, lvIndex, taskId} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE"&&
        req.user.currentRole==="INS"&&
        req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'403', message:'Access denied.'});

        const existingCourse = await course.findOne({courseCode: id});
        if(existingCourse.levels[Number(lvIndex)].tasks[Number(tskIndex)]._id.toString() !== taskId){
        return res.json({status:'500', course: {levels:existingCourse?.levels, courseCode:existingCourse?.courseCode}});
        }

        const cleanContent = sanitize(req.body?.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
        });

        existingCourse.levels[Number(lvIndex)].tasks[Number(tskIndex)].description = cleanContent;
        
        const newCourseData = await existingCourse.save();
        return res.json({status:'201', course:{levels:newCourseData?.levels, courseCode:newCourseData?.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH',message:'Something went wrong :('})
    }
};

export const addLevel = async (req, res) => {
    try {
        const {lvIndex} = req.query;
        const {id} = req.params;
        const condition = req.user.enrollmentStatus==="ACTIVE" && req.user.currentRole==="INS" &&
                            req.user.currentInsCourse.includes(id);
        if(!condition)return res.json({status:'403', message:'Access denied.'});

        const prCount = await projectReport.countDocuments({$and:[{courseCode:id}, {level:(Number(lvIndex)+1)}]}).lean().exec();
        if(prCount>0) return res.json({status:'add-mess', message:'mess' });
        
        const existingCourse = await course.findOne({courseCode:id});
        existingCourse.levels.splice(Number(lvIndex), 0, {tasks:[{description:""}]});
        existingCourse.totalLevels+=1;
        const newCourseData = await existingCourse.save();
        return res.json({status:'201', course:{levels:newCourseData.levels, courseCode:newCourseData?.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message:'Something went wrong:('});
    }
}

export const deleteLevel = async (req,res) => {
    try {
        const {lvIndex, levelId} = req.query;
        const {id} = req.params;

        const condition = req.user.enrollmentStatus==="ACTIVE" && req.user.currentRole==="INS"&&
                            req.user.currentInsCourse.includes(id);
        if(!condition) return res.json({message:"Access denied.", status:'403'});

        const prCount = await projectReport.countDocuments({$and:[{courseCode:id}, {level:(Number(lvIndex)+1)}]}).lean().exec();
        if(prCount>0) return res.json({status:'delete-mess', message:'mess' });

        const existingCourse = await course.findOne({courseCode:id});
        if(existingCourse.levels[Number(lvIndex)]._id.toString()!== levelId){
            return res.json({status:'500',course:{levels: existingCourse.levels, courseCode:newCourseData?.courseCode}});
        }
        existingCourse.levels.splice(Number(lvIndex), 1);
        existingCourse.totalLevels-=1;
        const newCourseData = await existingCourse.save();
        return res.json({status:"201",course:{levels:newCourseData.levels, courseCode:newCourseData?.courseCode}});
    } catch (error) {
        console.log(error);
        return res.json({status:'BRUH', message:'Something went wrong.'});
    }
}

export const editCourseIntro = async (req, res) => {
    try {
        const condition = req?.user?.enrollmentStatus==='ACTIVE'&&
                            req?.user?.currentRole==='INS'&&
                            req?.user?.currentInsCourse?.includes(req?.params?.id);
        if(!condition) return res.json({message:'Access denied.', status:'403'});

        const cleanContent = sanitize(req.body?.content, {
            allowedTags: ['iframe','br'], allowedAttributes: { 'iframe': ['src'] },
            allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
        });

        const newCourseData = await course.findOneAndUpdate({courseCode:req?.params?.id}, {intro: cleanContent}, {new:true});

        return res.json({status:'201', intro:newCourseData?.intro});
    } catch (error) {
        return res.json({status:'BRUH', message:'Something went wrong.'});
    }
}