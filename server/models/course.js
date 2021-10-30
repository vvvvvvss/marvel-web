import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    domainName : { type: String, enum:{values : ['AI-ML','IOT','D-P','EV-RE','CL-CY']}},
    courseCode : { type : String, unique : true },
    submissionStatus : {isAccepting : {type :Boolean, default:false}, forLevel : {type : String}},
    courseBadge : { type :String},
    intro : { type : String},
    levels : [
        { levelNo : {type : Number},
        tasks : [
            {taskNo : {type : Number},
            description : {type : String}},
        ]}
    ]
});

export default mongoose.model('courses', courseSchema);