const Story = require("../models/story");
const User = require("../models/user");

async function monitorDeleteStory() {
	const pipeline = [
		{
			$match: {
				operationType: "delete",
			},
		},
	];

	const changeStream = Story.watch(pipeline);

	changeStream.on("change", (next) => {
		storyId = next.documentKey._id;
		console.log(storyId);
		User.updateMany({}, { $pull: { stories: storyId } })
		.then((result) => {
			console.log(result);
		}).catch((error) => {
			console.log(error);
		});
	});
}

monitorDeleteStory();

module.exports.postVideo = (req, res) => {
	const { story_url } = req.body;
	const story_type = "video";
	const userId = req.user._id;
	if (!story_url || !story_type) {
		return res.status(400).json({ message: "please provide video or story_type" });
	}
	const newStory = new Story({
		story_url: story_url,
		uploaded_by: userId,
		story_type : story_type,
		duration : 30000, //add getVideoDuration here
	});

	newStory
		.save()
		.then((story) => {
			User.findByIdAndUpdate(userId, {
				$push: { stories: story._id },
			})
				.then(() => {
					return res.status(201).json({ message: "Story uploaded successfully." });
				})
				.catch((error) => {
					return res.status(500).json({ message: error.message });
				});
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.getMyStories = (req, res) => {
	const userId = req.user._id;
	Story.find({ uploaded_by: userId })
		.then((stories) => {
			res.json(stories);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.getStoriesById = (req, res) => {
	const myUserId = req.user._id;
	const otherUserId = req.params.id;

	Story.find({ uploaded_by: otherUserId })
		.then((stories) => {
			res.json(stories);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

// module.exports.getAllStories = (req, res) => {
// 	Story.aggregate([
// 		{
// 			$group: {
// 				_id: "$uploaded_by",
// 				stories: { $push: "$$ROOT" },
// 				count: { $sum: 1 },
// 			},
// 		},
// 		{
// 			$sort: { createdAt: 1 },
// 		},
// 		.then((stories) => {
// 			res.json(stories);
// 		})
// 		.catch((error) => {
// 			return res.status(500).json({ message: error.message });
// 		});
// };

module.exports.getAllStories = (req, res) => {
	User.find({ "stories.0": { $exists: true } })
		.select("-password -following -followers")
		.populate("stories")
		.then((stories) => {
			res.json(stories);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.storyViewed = async (req, res) => {
	const { storyId } = req.params;
	const myUserId = req.user._id;

	console.log("1");
	let isViewed = false;
	await Story.findById(storyId)
		.then((story) => {
			isViewed = story.viewed_by.includes(myUserId);
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});
	console.log("2");
	if (!isViewed) {
		Story.findByIdAndUpdate(storyId, {
			$push: { viewed_by: myUserId },
		})
			.then(() => {
				return res.send("ok");
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	}
	return res.send("ok");
};

module.exports.deleteStory = (req, res) => {
	const { storyId } = req.params;
	const myUserId = req.user._id;

	Story.findById(storyId).exec((err, story) => {
		if (err || !story) {
			return res.status(422).json({ error: err });
		} else if (story.uploaded_by.toString() === myUserId.toString()) {
			story
				.remove()
				.then((result) => {
					User.findByIdAndUpdate(myUserId, {
						$pull: { stories: storyId },
					})
						.then(() => {
							res.json({ message: "Successfully Deleted" });
						})
						.catch((err) => {
							return res.status(500).json({ message: err.message });
						});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return res.status(401).json({ message: "you are not allowed to delete other users stories" });
		}
	});
};
