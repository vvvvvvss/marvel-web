import course from "../models/course.js";
import user from '../models/user.js';

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

export const getProfile = async(req, res)=>{
    try {
        const {id} = req.params;
        const {scope} = req.query;

        let returnedProfile;
        if(scope==='dashboard'){
            returnedProfile = await user.aggregate([
            {$match : {id : id}}, {$limit : 1},
            {$project : { bio : 1, linkedIn:1, gitHub:1, website:1, id:1}}
            ])
        }
        if(!returnedProfile[0]) return res.json({status : '404'});
        
        return res.json({profile : returnedProfile[0], status : '200'});
    } catch (error) {
        console.log(error);
    }
}