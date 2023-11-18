import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [slug, mongooseDelete, mongoosePaginate]

const postSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  title: {
    type: String
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    index: true,
    sparse: true,
    slugOn: { save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true },
  },
  thumbnail: {
    id: String,
    url: String,
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  meta_title: {
    type: String,
  },
  meta_keyword: {
    type: String
  },
  meta_description: {
    type: String
  },
  created_by: {
    type: String
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
}, {
  collection: 'posts',
  timestamps: false,
  versionKey: false
})

plugins.forEach((item) => postSchema.plugin(item, { overrideMethods: true }));

// middlewares schema
// postSchema.pre("save", async function (next) {
//   // shared_url danh mục con
//   this.shared_url = this?.slug
//   next()
// })

export default model('Post', postSchema)