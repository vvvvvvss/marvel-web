import mongoose from 'mongoose';

const blogPostSchema = mongoose.Schema({
    // IDENTITY DATA
    authorId: { type : String, required : true },
    authorName : { type : String, required : true },
    authorSlug : { type : String},
    authorImage : {type : String},
    createdAt : { type : Date, default : new Date()},
    slug : {type : String, slug : ['title', 'authorName'], unique : true},

    // EDITABLE DATA
    title : {type : String},
    tags : {type : [String], default : []},
    coverPhoto : {type : String},
    content : {type : String, maxLength : 10000},

    // META DATA
    reviewStatus : { type : String, 
        enum : {values : ['PENDING', 'APPROVED', 'FLAGGED','FEATURED']}, default : 'PENDING'},
    feedback : { type : String, maxLength : 150 },
});

export default mongoose.model('blogPost',blogPostSchema);