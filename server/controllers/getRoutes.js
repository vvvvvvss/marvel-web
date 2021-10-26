import course from "../models/course.js";

export const getCourse = async ( req, res) =>{
    try {
        const {id} = req.params;
        const {scope} = req.query;
        let returnedCourse ={};
        if(scope==='dashboard'){
            returnedCourse = await course.aggregate([
            { $match : {courseCode : id.trim()}}, { $limit : 1}, { $project : {_id : 0, intro : 0}} ]);
        }else{
            returnedCourse = await course.aggregate([ 
            { $match : {courseCode : id.trim()}}, { $limit : 1}, { $project : {_id : 0}} ]);
        }
        if(!returnedCourse[0]) return res.json({status : '404'})
        return res.json({status : '200', course : returnedCourse[0]});
    } catch (error) {
        console.log(error);
    }
}