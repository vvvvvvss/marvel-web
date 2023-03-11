import mongoose, { models, Schema } from 'mongoose';
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
    title: { type: String, maxLength: 60, required: true },
    tags: { type: [String], default: [] },
    coverPhoto: { type: String },
    content: { type: String, maxLength: 15000, required: true },

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

    // EDITABLE DATA
    title: { type: String, maxLength: 60, required: true },
    tags: { type: [String], default: [] },
    coverPhoto: { type: String },
    content: { type: String, maxLength: 15000, required: true },
    courseCodes: { type: [String], required: true },

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
    slug: { type: String, slug: ['title', 'authorName'], unique: true },
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
  { collection: 'articles', discriminatorKey: '_type', timestamps: true }
);

export const article =
  models['article'] || mongoose.model('article', articleSchema);
export const blogPost =
  models['blogPost'] || article.discriminator('blogPost', blogPostSchema);
export const resourceArticle =
  models['resourceArticle'] ||
  article.discriminator('resourceArticle', resourceArticleSchema);
