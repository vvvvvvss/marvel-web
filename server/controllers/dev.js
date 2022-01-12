import course from '../models/course.js';
import user from '../models/user.js';

export const createCourse = async(req, res)=>{
    try {
        
        // const newCourse = new course(courseData);

        // const createdCourse = await newCourse.save();

        // return res.json({createdCourse : createdCourse});
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
}

export const assignIns = async (req, res) => {
    try {

        // const ins = [
        //     { email: "swaminathansmes3@gmail.com", currentInsCourse : ["AI-ML-001"], },
        //     { email: "karthikkssuresh@gmail.com", currentInsCourse: ["CL-CY-001"] },
        //     { email: "pratheeth596@gmail.com", currentInsCourse: ["CL-CY-001"] },
        //     { email: "anupamahegde2002@gmail.com", currentInsCourse: ["CL-CY-001"] },
        //     { email: "apissac85@gmail.com", currentInsCourse: ["D-P-001","IOT-001"] },
        //     { email: "manuvazhunnavar2012@gmail.com", currentInsCourse: ["D-P-001"] },
        //     { email: "shrinidhifeb22@gmail.com", currentInsCourse: ["EV-RE-001"] },
        //     { email: "nehajyothi11@gmail.com", currentInsCourse: ["EV-RE-001", "IOT-001"] },
        //     { email: "bhatvarsha2120@gmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "anish121201@hotmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "sruchitha23@gmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "mohammed.fouzan6767@gmail.com", currentInsCourse:["IOT-001"] }
        // ];
        // let insArray = [];
        // ins.forEach((person)=>{
        //     insArray.push(person?.email);
        // });
        // console.log(insArray);
        // const loggedins = await user.find({email : {$in:insArray}}).lean().exec();
        // return res.json({loggedins});
    } catch (error) {
        return res.json({error});
    }
}

export const assignStu = async (req, res) => {
    try {
        // aiml = ["nischal.vishwanath23@gmail.com",
        //         "bhargav.adya.510@gmail.com",
        //         "mayurbhat2082001@gmail.com",
        //         "shreekanthdash4@gmail.com",
        //         "abhishekyanjarappa@gmail.com",
        //         "sharanEN27@gmail.com",
        //         "shrishtibekalm@gmail.com",
        //         "kushalsangnalmat@gmail.com",
        //         "yashika.carmel@gmail.com",
        //         "girishkulkarni351@gmail.com",
        //         "nischal.vishwanath23@gmail.com"
        // ];

        

    } catch (error) {
        return res.json({error});
    }
}

export const play = async (req, res) => {
    try {
        
        // const data = await user.findOne({email : "avadhanam.abhiram@gmail.com"}).exec();
        // if(!data) return res.json({message:'not found'});
        // Object.assign(data, {
        //     enrollmentStatus:"ACTIVE",
        //     currentRole: "INS",
        //     currentInsCourse: [
        //         // "D-P-001",
        //         // "IOT-001",
        //         // "CL-CY-001",
        //         // "EV-RE-001",
        //         "AI-ML-001"
        //     ],
        // });
        // data.roleHistory.push({role:"INS", 
        // insCourse: [
        //     // "D-P-001",
        //     // "IOT-001",
        //     // "CL-CY-001",
        //     // "EV-RE-001",
        //     "AI-ML-001"
        // ],
        // startTime : new Date()
        // });
        // const saved = await data.save();
        // return res.json({saved});
    } catch (error) {
        return res.json(error);
    }
}