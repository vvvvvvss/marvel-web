import mongoose, { Schema } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

//author entity
const personEntity = new Schema(
  {
    id: String,
    slug: String,
    name: String,
    profileImage: String,
    writeAccess: Boolean,
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
    reports: [
      new Schema(
        {
          id: mongoose.Schema.Types.ObjectId,
          level: Number,
          status: {
            type: String,
            enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
          },
        },
        { _id: false }
      ),
    ],
    // META DATA
    searchTerms: [String],
    reviewStatus: {
      type: String,
      enum: { values: ['APPROVED', 'PENDING', 'FLAGGED', 'FEATURED'] },
      default: '',
    },
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
    reports: [
      new Schema(
        {
          id: mongoose.Schema.Types.ObjectId,
          stage: Number,
          status: {
            type: String,
            enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
          },
        },
        { _id: false }
      ),
    ],
    // META DATA
    searchTerms: [String],
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'APPROVED',
    },
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
    reviewStatus: String,
  },
  { collection: 'works', discriminatorKey: '_type' }
);

export const work = mongoose.model('work', workSchema);
export const courseWork = work.discriminator('courseWork', courseWorkSchema);
export const projectWork = work.discriminator('projectWork', projectWorkSchema);
