const express = require("express");
require("dotenv").config();
const morgan = require("morgan"); //logger
const cors = require("cors");
const userRouter = require("./routes/user");
const storyRouter = require("./routes/story");

const app = express();
const PORT = process.env.PORT || 3000;

// var bodyParser = require('body-parser')

// app.use(bodyParser.json({
//     limit: '50mb'
// }));

// app.use(bodyParser.urlencoded({
//     limit: '50mb',
//     paramaterLimit: 100000,
//     extended: true
// }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/user", userRouter);
app.use("/story", storyRouter);
app.get("/", (req, res) => res.send("Hello World!!!"));

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
