import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [slug, mongoosePaginate, mongooseDelete]

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
	}
}, {
	collection: 'brands',
	timestamps: false,
	versionKey: false
})

plugins.forEach((item) => brandSchema.plugin(item, { overrideMethods: true }));

export default model('Brand', brandSchema)