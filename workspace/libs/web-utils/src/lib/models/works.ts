import mongoose, { models, Schema } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

//author entity
const personEntity = new Schema(
  {
    id: { type: String, required: true }, // google id
    slug: { type: String, required: true },
    name: { type: String, required: true },
    profilePic: { type: String, required: true },
    roleType: {
      type: String,
      enum: { values: ['WRITER', 'ACTIVE', 'INACTIVE'] },
      default: 'ACTIVE',
    },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

mongoose.plugin(slug);
//course workbook
const courseWorkSchema = new Schema(
  {
    slug: { type: String, slug: ['_id', 'courseCode'], unique: true },
    authors: [personEntity],
    level: { type: Number, required: true, default: 1 },
    totalLevels: { type: Number, required: true },
    courseCode: { type: String, required: true },
    note: { type: String, maxLength: 6000 },

    // META DATA
    searchTerms: [String],
    pending: { type: [Number], default: [] },
    flagged: { type: [Number], default: [] },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'works', timestamps: true }
);

mongoose.plugin(slug);
//project workbook
const projectWorkSchema = new Schema(
  {
    slug: { type: String, slug: 'name', unique: true },
    authors: [personEntity],
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    coverPhoto: { type: String },
    coordinators: [personEntity],

    reports: [
      {
        id: { type: String, required: true },
      },
    ],
    // META DATA
    pending: { type: [Number], default: [] },
    flagged: { type: [Number], default: [] },
    searchTerms: [String],
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'works', timestamps: true }
);

//base workbook schema used to query both coursework and projectwork
const workSchema = new Schema(
  {
    authors: [personEntity],
    coordinators: [personEntity],
    level: Number,
    totalLevels: Number,
    courseCode: String,
    name: String,
    coverPhoto: String,
    slug: String,
    reports: [
      {
        id: String,
      },
    ],
    pending: [Number],
    flagged: [Number],
    rankingScore: Number,
  },
  { collection: 'works', discriminatorKey: '_type', timestamps: true }
);

export const work = models['work'] || mongoose.model('work', workSchema);
export const courseWork =
  models['courseWork'] || work.discriminator('courseWork', courseWorkSchema);
export const projectWork =
  models['projectWork'] || work.discriminator('projectWork', projectWorkSchema);
