const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = (req, res) => {
	const { name, email, password, image_url } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ message: "please enter all fieds" });
	}
	User.findOne({ email: email }).then((user) => {
		if (user) {
			return res.status(400).json({ message: "User already exist" });
		} else {
			//create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					const newUser = new User({
						name: name,
						email: email,
						password: hash,
						image_url: image_url,
					});
					newUser
						.save()
						.then((user) => {
							// console.log(user);
							return res.status(201).json({ message: "User saved successfully." });
						})
						.catch((error) => {
							return res.status(500).json({ message: error.message });
						});
				});
			});
		}
	});
};

module.exports.login = (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all the fields." });
	}
	User.findOne({ email: email }).then((user) => {
		if (!user) {
			return res.status(400).json({ message: "User does not exist." });
		}
		//password validation
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid email or password." });
			}
			jwt.sign(
				{ id: user._id },
				process.env.JWT_KEY,
				{
					/*expiresIn: 3600*/
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					return res
						.status(200)
						.json({ token: token, user: { id: user._id, name: user.name, email: user.email } }); //remove user later
				}
			);
		});
	});
};

module.exports.getAll = (req, res) => {
	User.find()
		.select("-password")
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.getProfile = (req, res) => {
	User.findById(req.user._id)
		.select("-password")
		.then((user) => {
			return res.status(200).json(user);
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});
};

module.exports.getUser = (req, res) => {
	const _id = req.params.id;
	User.findById(_id)
		.select("-password")
		.then((user) => {
			return res.status(200).json(user);
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});
};

module.exports.follow = (req, res) => {
	const _id = req.params.id;

	//add in profile's following
	User.findById(_id)
		.select("-password")
		.then(async (user) => {
			let isFollowing = false;
			await User.findById(req.user._id).then((profile) => {
				isFollowing = profile.following.includes(_id);
			});
			if (isFollowing) {
				return res.status(400).json({ message: "You are already following the user" });
			} else {
				// Update following list in profile
				User.findByIdAndUpdate(req.user._id, {
					$push: { following: _id },
				})
					.select("-password")
					.then(async (profile) => {
						await User.findByIdAndUpdate(_id, {
							$push: { followers: req.user._id },
						});
						return res.status(200).json({ message: `You followed ${user.name}` });
					})
					.catch((err) => {
						return res.status(500).json({ message: err.message });
					});
			}
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});

	//add your profile in others followers list
};

module.exports.unfollow = (req, res) => {
	const _id = req.params.id;

	//remove from profile's following
	User.findById(_id)
		.select("-password")
		.then(async (user) => {
			let isFollowing = false;
			await User.findById(req.user._id).then((profile) => {
				isFollowing = profile.following.includes(_id);
			});
			if (!isFollowing) {
				return res.status(400).json({ message: "You are not following the user" });
			} else {
				User.findByIdAndUpdate(req.user._id, {
					$pull: { following: _id },
				})
					.select("-password")
					.then(async (profile) => {
						await User.findByIdAndUpdate(_id, {
							$pull: { followers: req.user._id },
						});
						return res.status(200).json({ message: `You unfollowed ${user.name}` });
					})
					.catch((err) => {
						return res.status(500).json({ message: err.message });
					});
			}
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});

	//add your profile in others followers list
};
