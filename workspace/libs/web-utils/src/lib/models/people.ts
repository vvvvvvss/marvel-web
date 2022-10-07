import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const peopleSchema = new mongoose.Schema(
  {
    // IDENTITY DATA ( doesn't change)
    slug: { type: String, slug: 'name', unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    marvelId: { type: String },
    id: { type: String, required: true, unique: true },

    // META DATA ( changes. auto )
    scope: {
      type: [String],
      enum: {
        values: ['INS', 'STU_TRACK', 'PRO_TRACK', 'ADMIN', 'DEV'],
      },
      default: 'USER',
    },
    insCourses: {
      type: [String],
    },
    doIKnow: {
      type: String,
      enum: { values: ['KNOWN', 'UNKNOWN', 'BANNED'] },
      default: 'UNKNOWN',
    },

    // DIRECTLY EDITABLE
    bio: { type: String, maxLength: 200 },
    gitHub: { type: String, maxLength: 80 },
    linkedIn: { type: String, maxLength: 80 },
    website: { type: String, maxLength: 80 },
  },
  { timestamps: true, collection: 'people' }
);

const people = mongoose.model('people', peopleSchema);
export default people;
