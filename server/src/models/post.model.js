import { Schema, model } from 'mongoose';
import slug from 'mongoose-slug-updater';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseDelete from 'mongoose-delete';

const plugins = [slug, mongoosePaginate, mongooseDelete];
const brandSchema = new Schema(
  {
    title: {
      type: String,
      default: true,
    },
    content: {
      type: String,
      default: true,
    },
    author: {
      type: String,
      default: true,
    },
    public_date: {
      type: Date,
      default: Date.now,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    views: {
      type: Number,
    },
    likes: {
      type: Number,
    },
    comments: {
      type: String,
    },
    publication_status: {
      type: Boolean,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    delete_at: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'posts',
    timestamps: false,
    versionKey: false,
  }
);
plugins.forEach((item) => brandSchema.plugin(item, { overrideMethods: true }));
export default model('Post', brandSchema);
