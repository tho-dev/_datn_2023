import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [slug, mongooseDelete, mongoosePaginate]

const couponSchema = new Schema({
	name: {
		type: String,
	},
	coupon_code: {
		type: String
	},
	coupon_value: {
		type: Number
	},
	coupon_quantity: {
		type: Number,
		default: 0
	},
	coupon_start_date: {
		type: Date,
		default: null
	},
	coupon_end_date: {
		type: Date,
		default: null
	},
	status: {
		type: Boolean,
		default: true,
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
	collection: 'coupons',
	versionKey: false
})

plugins.forEach((item) => couponSchema.plugin(item, { overrideMethods: true }));

export default model('Coupon', couponSchema)