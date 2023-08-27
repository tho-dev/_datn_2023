import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";

const plugins = [slug]

const categorySchema = new Schema({
	sub_categories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}
	],
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
	thumbnail: {
		id: String,
		url: String,
	},
	description: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'categories',
	timestamps: false,
	versionKey: false
})

plugins.forEach((item) => categorySchema.plugin(item, { overrideMethods: true }));

export default model('Category', categorySchema)