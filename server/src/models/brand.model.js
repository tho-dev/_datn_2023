import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import Category from "./category.model"

const plugins = [slug, mongoosePaginate, mongooseDelete]

const brandSchema = new Schema({
	category_id: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
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
	shared_url: {
		type: String,
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

// middlewares schema
brandSchema.pre("save", async function (next) {
	const category = await Category.findById(this.category_id)

	// shared_url danh mục con
	if (this.parent_id) {
		const doc1 = await model('Brand', brandSchema).findById(this.parent_id)

		if (doc1.parent_id) {
			const doc2 = await model('Brand', brandSchema).findById(doc1.parent_id)

			if (doc2.parent_id) {
				const doc3 = await model('Brand', brandSchema).findById(doc2.parent_id)

				if (doc3.parent_id) {
					const doc4 = await model('Brand', brandSchema).findById(doc3.parent_id)

				} else {
					// input: ThinkPad T14s
					// output: laptop-thinkpad-t14s
					this.shared_url = `${category?.slug}-${this?.slug}`
				}

			} else {
				console.log("hellooooo");

				// input: ThinkPad T
				// output: laptop-lenovo-thinkpad-t
				this.shared_url = `${doc2.shared_url}-${this.slug}`
			}
		} else {
			// input: ThinkPad
			// output: laptop-lenovo-thinkpad
			this.shared_url = `${doc1.shared_url}-${this.slug}`
		}
	} else {
		// input: Lenovo
		// output: laptop-lenovo
		this.shared_url = `${category?.slug}-${this?.slug}`
	}

	next()
})




export default model('Brand', brandSchema)