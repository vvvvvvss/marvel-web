import mongoose, { models, Schema } from 'mongoose';

const personEntity = new Schema(
  {
    id: String,
    slug: String,
    name: String,
    profileImage: String,
  },
  { _id: false }
);

//course level report
const levelReportSchema = new Schema(
  {
    //identify the parent coursework
    parentId: { type: String, required: true },
    parentSlug: { type: String, required: true },

    level: { type: Number, required: true },
    courseCode: { type: String, required: true },
    authors: { type: [personEntity], required: true },

    //content
    title: { type: String, maxLength: 200, required: true },
    content: { type: String, required: true, maxLength: 15000 },
    tags: { type: [String] },

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
    // identify the parent
    parentId: { type: String, required: true },
    parentSlug: { type: String, required: true },

    authors: { type: [personEntity], required: true },

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
