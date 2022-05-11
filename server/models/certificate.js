import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const certificateSchema = mongoose.Schema({
    awardeeId : {type: String},
    awardeeName : {type: String}, 
    awardeeSlug : {type : String},
    courseCode : {type : String},
    domainName : {type : String},
    slug : {type : String, slug : ["awardeeName","courseCode"], unique: true},
    baked : {type : Boolean, default:false},
    level: {type: Number},

    image : {type : String},

    approvedByName : {type : [String], default:[]},
    approvedBySlug : {type : [String], default:[]},
    approvedById : {type : [String], default:[]}
}, {timestamps : true});

export default mongoose.model("certificates", certificateSchema);