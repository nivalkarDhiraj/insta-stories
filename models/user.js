const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
	name: {
		type: "string",
		required: true,
	},
	email: {
		type: "string",
		required: true,
		unique: true,
		match:
			/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	},
	password: {
		type: "string",
		required: true,
	},
    image_url:{
        type: "string",
        default : "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
    },
    following: [{
        type: ObjectId,
        ref: "User"
    }],
    followers: [{
        type: ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("User", userSchema);