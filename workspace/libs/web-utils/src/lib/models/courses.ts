import mongoose, { models, Schema } from 'mongoose';

const courseSchema = new Schema(
  {
    domain: {
      type: String,
      enum: { values: ['AI-ML', 'IOT', 'D-P', 'EV-RE', 'CL-CY'] },
    },
    courseCode: { type: String, unique: true },
    courseDuration: { type: String },
    caption: { type: String, maxLength: 200 },
    totalLevels: { type: Number, default: 0 },
    courseBadge: { type: String },
    intro: { type: String, maxLength: 15000 },
    levels: [
      {
        tasks: [
          {
            description: { type: String },
          },
        ],
      },
    ],
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'courses', timestamps: true }
);

const courses = models['course'] || mongoose.model('course', courseSchema);

export default courses;
