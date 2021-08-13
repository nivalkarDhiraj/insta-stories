const express = require("express");
const router = express.Router();
const storyController = require("../controllers/story");
const checkAuth = require("../middlewares/checkAuth");

const { upload } = require("../db");

router.post("/", upload.single("file"), (req, res) => {
	res.json(req);
});

router.post("/video", checkAuth, storyController.postVideo);
router.post("/image", checkAuth, storyController.postImage);
router.get("/myStories", checkAuth, storyController.getMyStories);
router.get("/:id", checkAuth, storyController.getStoriesById);
router.get("/", checkAuth, storyController.getAllStories);
router.post("/:storyId", checkAuth, storyController.storyViewed);
router.delete("/:storyId", checkAuth, storyController.deleteStory);

module.exports = router;
