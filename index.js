require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.all("*", (req, res, next) => {
  const method = req.method;
  console.log(`Method ${method} is aangeroepen op URL:${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    result: "Hello World",
  });
});

const userRoute = require("./src/routes/User");
const miceRoute = require("./src/routes/Mice");
const switchRoute = require("./src/routes/Switch");
const sensorsRoute = require("./src/routes/Sensors");
const brandRoute = require("./src/routes/Brand");
const imageRoute = require("./src/routes/Image");
const encoderRoute = require("./src/routes/Encoder");
app.use("/api/switch", switchRoute);
app.use("/api/user", userRoute);
app.use("/api/mice", miceRoute);
app.use("/api/sensors", sensorsRoute);
app.use("/api/brand", brandRoute);
app.use("/api/image", imageRoute);
app.use("/api/encoder", encoderRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    result: "End-point not found",
  });
});
//Error handler
app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
