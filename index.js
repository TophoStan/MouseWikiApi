//Imports
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//let port = process.env.PORT || 3000;

const userRoute = require("./routes/User");
const miceRoute = require("./routes/Mice");
const switchRoute = require("./routes/Switch");
const sensorsRoute = require("./routes/Sensors");
app.use("/switch", switchRoute);
app.use("/user", userRoute);
app.use("/mice", miceRoute);
app.use("/sensors", sensorsRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
