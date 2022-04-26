import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const RSASchema = mongoose.Schema({
    //IDENTITY DATA
    authorId: { type : String, required : true },
    authorName : { type : String, required : true },
    authorSlug : { type : String, required: true},
    authorImage : {type : String},
    courseCode : {type : String, required: true},
    domain : {type : String, required: true},
    slug : {type : String, slug : ['title', 'authorName'], unique : true},

    // EDITABLE DATA
    title :{ type : String, maxLength : 120, required : true},
    content : { type : String, required : true, maxLength : 10000},
    tags : { type : [String], default : []},
    
    rankingScore:{type: Number, default:1}
},{timestamps:true});

export default mongoose.model("resourceArticles", RSASchema);