const express = require("express");
const router = express.Router();
const storyController = require("../controllers/story");
const checkAuth = require("../middlewares/checkAuth");

const { upload } = require("../db");

// router.post("/", upload.single("file"), (req, res) => {
// 	console.log(req);
// 	res.send(req);
// });

router.post("/video", checkAuth, storyController.postVideo); //add video story
router.post("/image", checkAuth, storyController.postImage); //add image story
router.get("/myStories", checkAuth, storyController.getMyStories); //get my stories 
router.get("/:id", checkAuth, storyController.getStoriesById); //get stories by user id
router.get("/", checkAuth, storyController.getAllStories); //get all stories
router.post("/:storyId", checkAuth, storyController.storyViewed); //add user to viewedby array of stories
router.delete("/:storyId", checkAuth, storyController.deleteStory); //delete story

module.exports = router;
