import mongoose, { Schema } from 'mongoose';

//author entity
const authorsSchema = new Schema(
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
    authors: [authorsSchema],
    level: { type: Number, required: true },
    totalLevels: { type: Number, required: true },
    courseCode: { type: String, required: true },
    domain: { type: String, required: true },
    slug: { type: String, slug: ['title', 'authorName'], unique: true },

    // EDITABLE DATA
    title: { type: String, maxLength: 120, required: true },
    content: { type: String, required: true, maxLength: 15000 },
    tags: { type: [String], default: [] },

    // META DATA
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    feedback: { type: String, maxLength: 500 },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'works', timestamps: true }
);

const projectWorkSchema = new Schema(
  {
    windGust: String,
    windDirection: String,
    windSpeed: String,
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
