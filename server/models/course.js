import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    domainName : { type: String, enum:{values : ['AI-ML','IOT','D-P','EV-RE','CL-CY']}},
    courseCode : { type : String, unique : true },
    courseDuration : {type : String},
    caption : {type : String},
    submissionStatus : {isAccepting : {type :Boolean, default:false}, forLevel : {type : Number}},
    totalLevels : {type : Number, default: 0},
    courseBadge : { type :String},
    intro : { type : String},
    levels : [
        {tasks : [ 
            {
                description : {type : String}
            },
        ]}
    ],
    rankingScore : {type : Number, default: 1}
});

export default mongoose.model('courses', courseSchema);