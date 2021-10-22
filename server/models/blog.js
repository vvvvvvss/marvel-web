import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    authorId: { type: String },
    title : { type : String, required : true, maxLength : 60},
    createdAt : { type : Date, default : new Date()},
    content : { type : String, required : true, maxLength : 6000},
    coverPhoto : {type : String, required : true},
    tags : {type : [String], default : []},
    reviewStatus : {type : String, enum : {values : ['PENDING','REVIEWED','PUBLIC']}}
});

export default mongoose.model("blogs", blogSchema);