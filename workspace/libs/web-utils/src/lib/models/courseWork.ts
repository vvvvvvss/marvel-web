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

    reports: [{}],

    // META DATA
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'works', timestamps: true }
);

const projectWorkSchema = new Schema(
  {
    authors: [personEntity],
    name: String,
    slug: { type: String, slug: ['name'], unique: true },
    coordinators: [personEntity],

    // META DATA
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'works', timestamps: true }
);

const workSchema = new Schema(
  {},
  { collection: 'works', discriminatorKey: '_type' }
);

const Works = mongoose.model('works', workSchema);
const courseWork = Works.discriminator('courseWork', courseWorkSchema);
const projectWork = Works.discriminator('projectWork', projectWorkSchema);
