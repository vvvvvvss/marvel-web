import mongoose, { models, Schema } from 'mongoose';

//course level report
const levelReportSchema = new Schema(
  {
    parentId: { type: String, required: true },
    level: { type: Number, required: true },
    courseCode: { type: String, required: true },
    domain: { type: String, required: true },

    //content
    title: { type: String, maxLength: 200, required: true },
    content: { type: String, required: true, maxLength: 15000 },
    tags: { type: [String], default: [] },

    // META DATA
    searchTerms: [String],
    reviewStatus: {
      type: String,
      enum: { values: ['APPROVED', 'PENDING', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    feedback: { type: String, maxLength: 800 },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'reports', timestamps: true }
);

//project stage report
const stageReportSchema = new Schema(
  {
    parentId: { type: String, required: true },
    stage: { type: Number, required: true },

    //content
    title: { type: String, maxLength: 200, required: true },
    content: { type: String, required: true, maxLength: 15000 },
    tags: { type: [String], default: [] },

    // META DATA
    searchTerms: [String],
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    feedback: { type: String, maxLength: 800 },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'reports', timestamps: true }
);

//base schema used to ONLY query both stage reports and level reports
const reportSchema = new Schema(
  {
    parentId: String,
    stage: Number,
    level: Number,
    courseCode: String,
    domain: String,

    title: String,
    content: String,
    tags: [String],

    searchTerms: [String],
    reviewStatus: String,
    feedback: String,
    rankingScore: Number,
  },
  { collection: 'reports', discriminatorKey: '_type', timestamps: true }
);

export const report =
  models['report'] || mongoose.model('report', reportSchema);
export const levelReport =
  models['levelReport'] ||
  report.discriminator('levelReport', levelReportSchema);
export const stageReport =
  models['stageReport'] ||
  report.discriminator('stageReport', stageReportSchema);
