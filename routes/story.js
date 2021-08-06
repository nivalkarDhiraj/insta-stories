const express = require("express");
const router = express.Router();
const storyController = require("../controllers/story");
const checkAuth = require("../middlewares/checkAuth");

router.post("/video", checkAuth, storyController.postVideo);
router.get("/myStories", checkAuth, storyController.getMyStories);
router.get("/:id", checkAuth, storyController.getStoriesById);
router.get("/", checkAuth, storyController.getAllStories);
router.post("/:storyId", checkAuth, storyController.storyViewed);
router.delete("/:storyId", checkAuth, storyController.deleteStory);

module.exports = router;
