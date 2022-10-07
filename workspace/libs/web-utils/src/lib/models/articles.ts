import mongoose, { Schema } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

//blog post
const blogPostSchema = new Schema(
  {
    // IDENTITY DATA
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    authorSlug: { type: String, required: true },
    authorImage: { type: String },
    slug: { type: String, slug: ['title', 'authorName'], unique: true },

    // EDITABLE DATA
    title: { type: String, maxLength: 200 },
    tags: { type: [String], default: [] },
    coverPhoto: { type: String },
    content: { type: String, maxLength: 15000 },

    // META DATA
    searchTerms: [String],
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    feedback: { type: String, maxLength: 500 },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'articles', timestamps: true }
);

//resource article schema
const resourceArticleSchema = new Schema(
  {
    // IDENTITY DATA
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    authorSlug: { type: String, required: true },
    authorImage: { type: String },
    slug: { type: String, slug: ['title', 'authorName'], unique: true },
    domains: { type: [String], required: true },
    courseCodes: [String],

    // EDITABLE DATA
    title: { type: String, maxLength: 200 },
    tags: { type: [String], default: [] },
    coverPhoto: { type: String },
    content: { type: String, maxLength: 15000 },

    // META DATA
    searchTerms: [String],
    reviewStatus: {
      type: String,
      enum: { values: ['PENDING', 'APPROVED', 'FLAGGED', 'FEATURED'] },
      default: 'PENDING',
    },
    feedback: { type: String, maxLength: 500 },
    rankingScore: { type: Number, default: 1 },
  },
  { collection: 'articles', timestamps: true }
);

//base schema used to ONLY query both stage reports and level reports
const articleSchema = new Schema(
  {
    authorId: String,
    authorName: String,
    authorSlug: String,
    authorImage: String,
    slug: String,
    domains: [String],
    courseCodes: [String],
    title: String,
    tags: [String],
    coverPhoto: String,
    content: String,
    searchTerms: [String],
    reviewStatus: String,
    feedback: String,
    rankingScore: Number,
  },
  { collection: 'articles', discriminatorKey: '_type' }
);

export const article = mongoose.model('article', articleSchema);
export const blogPost = article.discriminator('blogPost', blogPostSchema);
export const resourceArticle = article.discriminator(
  'resourceArticle',
  resourceArticleSchema
);
