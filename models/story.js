const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
	video_url: {
		type: "string",
		required: true,
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
	},
});

module.exports = mongoose.model("Story", storySchema);
