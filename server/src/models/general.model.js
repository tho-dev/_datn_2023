import { Schema, model } from "mongoose"

const generalSchema = new Schema({
	logo: {
		id: String,
		url: String
	},
	meta_title: {
		type: String
	},
	meta_keyword: {
		type: String
	},
	meta_description: {
		type: String
	},
	meta_slug: {
		type: String
	},
	banner_title: {
		type: String
	},
	banner_description: {
		type: String
	},
	banner_color: {
		type: String
	},
	banner_background_color: {
		type: String
	},
	banner_thumbnail: {
		id: String,
		url: String
	},
	branch: [
		{
			city: String,
			address: String,
			time_open: String,
			time_close: String,
			map: String,
			status: Boolean
		}
	],
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
	collection: 'general',
	versionKey: false
})

export default model('General', generalSchema)