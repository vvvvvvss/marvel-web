import mongoose, { models } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const peopleSchema = new mongoose.Schema(
  {
    // IDENTITY DATA ( doesn't change)
    slug: { type: String, slug: 'name', unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: '' },
    marvelId: { type: String },
    id: { type: String, required: true, unique: true }, //unique id from google

    // META DATA ( changes. auto )
    doIKnow: {
      type: String,
      enum: { values: ['KNOWN', 'UNKNOWN', 'BANNED'] },
      default: 'UNKNOWN',
    },
    scope: {
      type: [String],
      enum: {
        values: ['CRDN', 'STU_TRACK', 'PRO_TRACK', 'ADMIN', 'DEV'],
        // coordinator can approve blog posts, level reports of their courses and stage reports of projects they are part of.
        // stu-track can assign courseworks, add people, remove people from a course work. basically, student track admin.
        // pro-track can assign projectworks, add people, remove people from project work. basically, project track admin.
        // admin can do all the above.
        // dev can do all of the above.
      },
      default: [],
    },
    crdnCourses: {
      type: [String],
    },

    // DIRECTLY EDITABLE
    bio: { type: String, maxLength: 200 },
    gitHub: { type: String, maxLength: 80 },
    linkedIn: { type: String, maxLength: 80 },
    website: { type: String, maxLength: 80 },
  },
  { timestamps: true, collection: 'people' }
);

const people = models['people'] || mongoose.model('people', peopleSchema);
export default people;
