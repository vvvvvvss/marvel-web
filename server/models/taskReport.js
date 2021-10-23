import mongoose from "mongoose";

const taskReportSchema = mongoose.Schema({
    authorId: { type : String, required : true },
    authorName : { type : String, required : true },
    domain : { type : String, 
                enum : {values : ['AI-ML-DA','IOT','D&P','EV-RE','CL-CY']}, required : true },
    taskId : { type : String, required : true},
    createdAt : { type : Date, default : new Date()},
    content : { type : String, required : true, maxLength : 6000},
    reviewStatus : { type : String, 
                enum : {values : ['PENDING', 'APPROVED', 'FLAGGED']}, default : 'PENDING'},
    taskNo : { type : Number , required : true}
});

export default mongoose.model("taskReports", taskReportSchema);