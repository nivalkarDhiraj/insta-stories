const express = require("express");
require("dotenv").config();
const morgan = require("morgan"); //logger
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const storyRouter = require("./routes/story");

const app = express();
const PORT = process.env.PORT || 3000;

const mongodbURI = `mongodb+srv://admin:admin@cluster0.fs9mp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
	console.log("Database Connected...");
});
mongoose.connection.on("error", (error) => {
	console.log("Error connecting database..."), error;
});

app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/story", storyRouter);
app.get("/", (req, res) => res.send("Hello World!!!"));

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
