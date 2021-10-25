import mongoose, { Schema } from 'mongoose';

const courseSchema = mongoose.Schema({
    domainName : { type: String, enum:{values : [['AI-ML','IOT','D&P','EV-RE','CL-CY']]}}
});

export default mongoose.model('courses', courseSchema);