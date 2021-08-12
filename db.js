const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");

const mongodbURI = `mongodb+srv://admin:admin@cluster0.fs9mp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

const conn = mongoose.createConnection(mongodbURI);

mongoose.Promise = global.Promise;

let gfs;

mongoose.connection.once("open", () => {
	console.log("Database Connected...");
});

conn.once("open", () => {
	// Init stream
	console.log("Stream connected...");
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("uploads");
});

mongoose.connection.on("error", (error) => {
	console.log("Error connecting database..."), error;
});

const storage = new GridFsStorage({
	url: mongodbURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads",
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });

module.exports = { conn, storage, upload };
