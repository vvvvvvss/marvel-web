import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    domainName : { type: String, enum:{values : ['AI-ML','IOT','D-P','EV-RE','CL-CY']}},
    courseCode : { type : String, unique : true },
    submissionStatus : {isAccepting : {type :Boolean, default:false}, forLevel : {type : Number}},
    totalLevels : {type : Number},
    courseBadge : { type :String},
    intro : { type : String},
    levels : [
        { levelNo : {type : Number},
        tasks : [
            {taskNo : {type : Number},
            description : {type : String}},
        ]}
    ],
    rankingScore : {type : Number, default: 1}
});

export default mongoose.model('courses', courseSchema);