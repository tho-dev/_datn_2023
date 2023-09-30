import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [slug, mongooseDelete, mongoosePaginate]

const categorySchema = new Schema({
	parent_id: {
		type: Schema.Types.ObjectId,
		default: null
	},
	name: {
		type: String
	},
	slug: {
		type: String,
		slug: "name",
		unique: true,
		index: true,
		sparse: true,
		slugOn: { save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true },
	},
	type: {
		type: String,
		enum: ['category_brand', 'category_post'],
		default: 'category_brand'
	},
	shared_url: {
		type: String
	},
	thumbnail: {
		id: String,
		url: String,
	},
	description: {
		type: String
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
	collection: 'categories',
	timestamps: false,
	versionKey: false
})

plugins.forEach((item) => categorySchema.plugin(item, { overrideMethods: true }));

// middlewares schema
categorySchema.pre("save", async function (next) {
	// shared_url danh mục con
	this.shared_url = this?.slug
	next()
})

export default model('Category', categorySchema)