const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
	story_url: {
		type: "string",
		required: true,
	},
	story_type: {
		type: "string",
		required: true,
		enum: ["image", "video"],
	},
	duration: {
		type: Number,
		default: 3000,
	},
	uploaded_by: {
		type: ObjectId,
		ref: "User",
	},
	viewed_by: [
		{
			type: ObjectId,
			ref: "User",
		},
	],
	created_at: {
		type: Date,
		default: Date.now,
		index: { unique: true, expires: "1d" },
	},
});

module.exports = mongoose.model("Story", storySchema);
