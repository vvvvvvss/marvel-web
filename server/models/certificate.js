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

    image : {type : String},

    approvedByName : {type : String},
    approvedBySlug : {type : String},
    approvedById : {type : String}
}, {timestamps : true});

export default mongoose.model("certificates", certificateSchema);