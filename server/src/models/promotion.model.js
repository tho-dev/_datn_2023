import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [slug, mongooseDelete, mongoosePaginate]

const promotionValueSchema = new Schema({
	promotion_id: {
		type: Schema.Types.ObjectId,
		ref: "Promotion"
	},
	sku_id: {
		type: Schema.Types.ObjectId,
		ref: "Sku"
	},
	product_id: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
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
	timestamps: false,
	collection: 'promotion_values',
	versionKey: false
})

const promotionSchema = new Schema({
	name: {
		type: String,
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
	status: {
		type: Boolean,
		default: true,
	},
	description: {
		type: String
	},
	max_percent: {
		type: Number
	},
	min_sale_price: {
		type: Number
	},
	start_time: {
		type: Date,
		default: null
	},
	expired_time: {
		type: Date,
		default: null
	},
	seo: {
		title: {
			type: String,
			default: ""
		},
		description: {
			type: String,
			default: ""
		},
		tags: {
			type: Array,
			default: []
		}
	},
	created_by: {
		type: String,
	},
	updated_by: {
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
	timestamps: false,
	collection: 'promotions',
	versionKey: false
})

plugins.forEach((item) => promotionSchema.plugin(item, { overrideMethods: true }));

const Promotion = model('Promotion', promotionSchema)
const PromotionValue = model('PromotionValue', promotionValueSchema)

export { Promotion, PromotionValue }  