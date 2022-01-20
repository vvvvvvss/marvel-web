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
        //     { email: "avadhanam.abhiram@gmail.com", currentInsCourse: ["AI=ML-001"] },
        //     { email: "karthikkssuresh@gmail.com", currentInsCourse: ["CL-CY-001"] },
        //     { email: "pratheeth596@gmail.com", currentInsCourse: ["CL-CY-001"] },
        //     { email: "anupamahegde2002@gmail.com", currentInsCourse: ["CL-CY-001"] },
        //     { email: "apisaac85@gmail.com", currentInsCourse: ["D-P-001","IOT-001"] },
        //     { email: "manuvazhunnavar2012@gmail.com", currentInsCourse: ["D-P-001"] },
        //     { email: "shrinidhifeb22@gmail.com", currentInsCourse: ["EV-RE-001"] },
        //     { email: "nehajyothi11@gmail.com", currentInsCourse: ["EV-RE-001", "IOT-001"] },
        //     { email: "bhatvarsha2120@gmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "anish121201@gmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "sruchitha23@gmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "mohammed.fouzan6767@gmail.com", currentInsCourse:["IOT-001"] },
        //     { email: "not.vakesan@gmail.com", currentInsCourse: ["AI-ML-001","CL-CY-001","EV-RE-001","D-P-001", "IOT-001"] }
        // ];
        // let modifiedPeople = [];
        // let person;
        // ins.forEach( async (u)=>{
        //     person = {};
        //     person = await user.findOne({email : u?.email}).exec();
        //     if(!person){console.log(u?.email, "not found")}
        //     else if(person?.enrollmentStatus==="ACTIVE") {
        //         console.log("Already assigned",person?.email);
        //     }else if(person?.enrollmentStatus==='UNKNOWN'){
        //         Object.assign(person, {
        //             enrollmentStatus: "ACTIVE",
        //             currentRole: "INS",
        //             currentInsCourse : (ins.find((i)=>(i.email===person?.email))).currentInsCourse,
        //             roleHistory:[...person?.roleHistory, {
        //                 role: "INS",
        //                 insCourse: (ins.find((i)=>(i.email===person?.email))).currentInsCourse,
        //                 startTime : new Date()
        //             }]
        //         });
        //         ;
        //         await person.save();
        //     }else{
        //         console.log("edge case"); 
        //         console.log(person);
        //     }
        // });

        // return res.json({modifiedPeople});
    } catch (error) {
        return res.json({error});
    }
}

export const assignStu = async (req, res) => {
    try {
        // const iot = ["meghana.suresh2307@gmail.com",
        //     "vachank777@gmail.com",
        //     "manishkb222@gmail.com",
        //     "bhooshankumar13@gmail.com",
        //     "paraganvedeepa2000@gmail.com"
        // ];
        // const count = await user.find({email : {$in : iot}}).select("email name").lean().exec();
        // const updated = await user.updateMany({email: {$in: iot}}, {
        //     enrollmentStatus: "ACTIVE",
        //     currentRole: "STU",
        //     currentStuCourse: "IOT-001",
        //     currentLevel : 1,
        //     $push:{ 
        //         roleHistory: {role: "STU", stuCourse:"IOT-001", startTime: new Date()}
        //     },
        // }
        // );
        // return res.json({updated});

    } catch (error) {
        console.log(error);
        return res.json({error});
    }
}

export const play = async (req, res) => {
    try {
        
    
    } catch (error) {
        return res.json(error);
    }
}

export const play2 = async (req, res) => {
    try {
        // const neha = await user.find({name : new RegExp("neha", "i")}).lean().exec();
        // return res.json({neha});
    } catch (error) {
        return res.json(error);
    }
}

export const play3 = async(req, res) => {
    try {
    //     const data = await user.findOne({email:"uvcemarvelweb@gmail.com"});
    //     data.roleHistory.push({role:"INS",
    //     insCourse : ["AI-ML-001","IOT-001","CL-CY-001","EV-RE-001","D-P-001"],
    //     startTime: new Date()
    // });
    //     const saved =  await data.save();
        // return res.json({saved});
    } catch (error) {
        return res.json({error});
    }
}