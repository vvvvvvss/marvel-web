import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const projectReportSchema = mongoose.Schema({
    // IDENTITY DATA. CANNOT DIRECTLY EDIT
    authorId: { type : String, required : true },
    authorName : { type : String, required : true },
    authorSlug : { type : String},
    authorImage : {type : String},
    level : {type : Number},
    courseCode : {type : String},
    domain : {type : String},
    slug : {type : String, slug : ['title', 'authorName'], unique : true},

    // EDITABLE DATA
    title :{ type : String, maxLength : 120, required : true},
    content : { type : String, required : true, maxLength : 10000},
    tags : { type : [String], default : []},

    // META DATA
    reviewStatus : { type : String, 
                enum : {values : ['PENDING', 'APPROVED', 'FLAGGED']}, default : 'PENDING'},
    feedback : { type : String, maxLength : 500 },
},
{timestamps : true});

export default mongoose.model("projectReports", projectReportSchema);