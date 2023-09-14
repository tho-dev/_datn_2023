import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [slug, mongoosePaginate, mongooseDelete]

const demandValueSchema = new Schema(
	{
		product_id: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		demand_id: {
			type: Schema.Types.ObjectId,
			ref: 'Demand'
		},
		point: {
			type: Number,
			default: 0
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
	collection: 'demand_values',
	timestamps: false,
	versionKey: false
})

const demandSchema = new Schema({
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
	collection: 'demands',
	timestamps: false,
	versionKey: false
})

plugins.forEach((item) => demandSchema.plugin(item, { overrideMethods: true }));

const Demand = model('Demand', demandSchema)
const DemandValue = model('DemandValue', demandValueSchema)

export { Demand, DemandValue }