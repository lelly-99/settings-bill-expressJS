import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import settingsBill from "./factory-functions/settingsBill.js";
import moment from 'moment'
moment().format();


//instance for Express app
const app = express();

//instance for settingsBill factory function 
const settingsBillFunction = settingsBill();


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//add css
app.use(express.static("public"));

// enables body-parser to parse URL-encoded and JSON data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// homepage route
app.get("/", function (req, res) {
  // critical level
  const criticalLevelReached = settingsBillFunction.critcalLevelIsReached();
  // warning level
  const warningLevelReached = settingsBillFunction.getTotalCost() >= settingsBillFunction.getWarningLevel();
  // Get the settings data to check if the settings have been submitted
  const getSettings = settingsBillFunction.getSettings();

  // Check if the settings have been submitted
  const settingsSubmitted = (
    getSettings.callCost !== 0 &&
    getSettings.smsCost !== 0 &&
    getSettings.warningLevel !== 0 &&
    getSettings.criticalLevel !== 0
  );

  res.render("index", {
    renderSettings: getSettings,
    totals: settingsBillFunction.totals(),
    criticalLevelReached,
    warningLevelReached,
    settingsSubmitted,// Pass the settingsSubmitted variable to the template
  });
});


//route for updating settings
app.post("/settings", function (req, res) {
  //get user imput
  settingsBillFunction.setSettings({
    callCost: Number(req.body.callCost),
    smsCost: Number(req.body.smsCost),
    warningLevel: Number(req.body.warningLevel),
    criticalLevel: Number(req.body.criticalLevel),
  });
  // Redirect the user back to the homepage ("/")
  res.redirect("/");
});

// action route
app.post("/action", function (req, res) {
  const billItemType = req.body.billItemTypeWithSettings;
  settingsBillFunction.callAction(billItemType, settingsBillFunction.getCallCost(), settingsBillFunction.getSmsCost());
  const selectedRadio = req.body.selectedRadio;
  res.redirect("/");
});

app.get("/actions", function (req, res) {
  const actions = settingsBillFunction.actions().map((action) => {
    return {
      ...action,
      isoTimestamp: action.timestamp.toISOString(),
      formattedTimestamp: action.timestamp.fromNow(),
    };
  });

  res.render("actions", { actions });
});

app.get("/actions/:type", function (req, res) {
  const type = req.params.type;
  const actionList = settingsBillFunction.actionsFor(type);
  const time = actionList.forEach((list) => {
    list.timestamp = moment().startOf('hour').fromNow()
  })
  res.render("actions", { 
    actions : settingsBillFunction.actionsFor(type),
    time
   });
});

app.post("/reset", function (req, res) {
  settingsBillFunction.reset();
  res.render("index", {
    renderSettings: settingsBillFunction.reset(),
    totals: settingsBillFunction.reset(),
  });
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});








