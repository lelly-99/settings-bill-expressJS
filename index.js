import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import settingsBill from "./factory-functions/settingsBill.js";
import moment from "moment";
import handlebars from "handlebars";
moment().format();

const app = express();
const settingsBillFunction = settingsBill();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

handlebars.registerHelper("equal", function (value1, value2, options) {
  return value1 === value2 ? options.fn(this) : options.inverse(this);
});


app.get("/", function (req, res) {
  const criticalLevelReached = settingsBillFunction.critcalLevelIsReached();
  const warningLevelReached =
    settingsBillFunction.getTotalCost() >= settingsBillFunction.getWarningLevel();
  const getSettings = settingsBillFunction.getSettings();
  const selectedRadio = req.query.billItemTypeWithSettings;
  const settingsSubmitted =
    getSettings.callCost !== 0 &&
    getSettings.smsCost !== 0 &&
    getSettings.warningLevel !== 0 &&
    getSettings.criticalLevel !== 0;

  res.render("index", {
    renderSettings: getSettings,
    totals: settingsBillFunction.totals(),
    criticalLevelReached,
    warningLevelReached,
    settingsSubmitted,
    selectedRadio: selectedRadio,
  });
});

app.post("/settings", function (req, res) {
  settingsBillFunction.setSettings({
    callCost: Number(req.body.callCost),
    smsCost: Number(req.body.smsCost),
    warningLevel: Number(req.body.warningLevel),
    criticalLevel: Number(req.body.criticalLevel),
  });
  res.redirect("/");
});


app.post("/action", function (req, res) {
  const billItemType = req.body.billItemTypeWithSettings;

  settingsBillFunction.callAction(
    billItemType,
    settingsBillFunction.getCallCost(),
    settingsBillFunction.getSmsCost()
  );

  res.render("index", {
    renderSettings: settingsBillFunction.getSettings(),
    totals: settingsBillFunction.totals(),
    criticalLevelReached: settingsBillFunction.critcalLevelIsReached(),
    warningLevelReached: settingsBillFunction.getTotalCost() >= settingsBillFunction.getWarningLevel(),
    settingsSubmitted: true,
    selectedRadio: billItemType, // Pass the selected radio value back to the template
  });
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
    list.timestamp = moment().startOf("hour").fromNow();
  });
  res.render("actions", {
    actions: settingsBillFunction.actionsFor(type),
    time,
  });
});

app.post("/reset", function (req, res) {
  settingsBillFunction.reset();
  res.redirect("/");
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});

