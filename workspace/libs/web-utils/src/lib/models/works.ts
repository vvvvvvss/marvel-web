import mongoose, { models, Schema } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

//author entity
const personEntity = new Schema(
  {
    id: String,
    slug: String,
    name: String,
    profileImage: String,
    accessType: { type: [String], enum: { values: ['READ', 'WRITE'] } },
  },
  { _id: false }
);

//course workbook
const courseWorkSchema = new Schema(
  {
    authors: [personEntity],
    level: { type: Number, required: true, default: 1 },
    totalLevels: { type: Number, required: true },
    courseCode: { type: String, required: true },
    domain: { type: String, required: true },
    slug: { type: String, slug: ['_id', 'courseCode'], unique: true },
    note: { type: String, maxLength: 6000 },

    // META DATA
    searchTerms: [String],
    pending: { type: [Number], default: [] },
    flagged: { type: [Number], default: [] },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'works', timestamps: true }
);

//project workbook
const projectWorkSchema = new Schema(
  {
    authors: [personEntity],
    name: { type: String, required: true },
    slug: { type: String, slug: ['name'], unique: true },
    coverPhoto: { type: String },
    coordinators: [personEntity],

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
    domain: String,
    name: String,
    coverPhoto: String,
    slug: String,
    pending: [Number],
    flagged: [Number],
  },
  { collection: 'works', discriminatorKey: '_type', timestamps: true }
);

export const work = models['work'] || mongoose.model('work', workSchema);
export const courseWork =
  models['courseWork'] || work.discriminator('courseWork', courseWorkSchema);
export const projectWork =
  models['projectWork'] || work.discriminator('projectWork', projectWorkSchema);
