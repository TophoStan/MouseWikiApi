require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
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
const submissionRoute = require("./src/routes/Submit");

app.use("/api/switch", switchRoute);
app.use("/api/user", userRoute);
app.use("/api/mice", miceRoute);
app.use("/api/sensors", sensorsRoute);
app.use("/api/brand", brandRoute);
app.use("/api/image", imageRoute);
app.use("/api/encoder", encoderRoute);
app.use("/api/submit", submissionRoute);

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./src/routes/SwaggerDocument.json");
const Encoder = require("./src/models/Encoder");
const Brand = require("./src/models/Brand");
const Sensor = require("./src/models/Sensor");
const MicroSwitch = require("./src/models/Switch");
const ItemImage = require("./src/models/Image");
const Mouse = require("./src/models/Mouse");

//Relationships
function initRelationShips() {
  //Encoder
  Encoder.belongsTo(Brand);
  Brand.hasMany(Encoder);

  //Sensor
  Sensor.belongsTo(Brand);
  Brand.hasMany(Sensor);

  //Microswitch
  MicroSwitch.belongsTo(Brand);
  Brand.hasMany(MicroSwitch);

  //Mouse
  Brand.hasMany(Mouse);
  Mouse.belongsTo(Brand);

  //Main mouse switch
  Mouse.belongsTo(MicroSwitch, {
    foreignKey: "main_switch_id"
  });
  MicroSwitch.hasMany(Mouse, {
    foreignKey: "main_switch_id"
  });

  //Main mouse switch
  Mouse.belongsTo(MicroSwitch, {
    foreignKey: "side_switch_id"
  });
  MicroSwitch.hasMany(Mouse, {
    foreignKey: "side_switch_id"
  });


  Mouse.belongsTo(Sensor);
  Sensor.hasMany(Mouse);

  Mouse.belongsTo(Encoder);
  Encoder.hasMany(Mouse);


}
initRelationShips();

//Sync
async function SyncModels() {
  await Encoder.sync({ alter: true });
  await Brand.sync({ alter: true });
  await Sensor.sync({ alter: true });
  await MicroSwitch.sync({ alter: true });
  await ItemImage.sync({ alter: true });
  await Mouse.sync({ alter: true });
}
SyncModels();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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
