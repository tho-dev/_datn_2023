import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";

const plugins = [slug]

const brandSchema = new Schema({
	category_id: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
	sub_brands: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Brand'
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
	collection: 'brands',
	timestamps: false,
	versionKey: false
})

plugins.forEach((item) => brandSchema.plugin(item, { overrideMethods: true }));

export default model('Brand', brandSchema)