import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    domainName : { type: String, enum:{values : ['AI-ML','IOT','D-P','EV-RE','CL-CY']}},
    courseCode : { type : String, unique : true },
    courseBadge : { type :String},
    intro : { type : String},
    levels : [
        { levelNo : {type : Number},
        levelBadge : {type : String},
        tasks : [
            {taskNo : {type : Number},
            description : {type : String}},
        ]}
    ]
});

export default mongoose.model('courses', courseSchema);