import mongoose from "mongoose";

const bannedUserSchema = mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    regNo : {type : String, required:true},
    id: { type: String },
    joinedAt : {type : Date, default : new Date()},
    bannedAt : {type :String},
    bannedByName : {type :String},
    bannedById : {type : String}
});

export default mongoose.model("bannedUsers", bannedUserSchema);