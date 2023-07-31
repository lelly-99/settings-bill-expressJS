import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import settingsBill from "./factory-functions/settingsBill.js";

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
  //warning level
  const warningLevelReached = settingsBillFunction.getTotalCost() >= settingsBillFunction.getWarningLevel();
  // display data/ user inputs on screen as per action taken
  res.render("index", {
    renderSettings: settingsBillFunction.getSettings(),
    totals: settingsBillFunction.totals(),
    criticalLevelReached,
    warningLevelReached,
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
  res.redirect("/");
});


app.get("/actions", function (req, res) {
  const actions = settingsBillFunction.actions();
  res.render("actions", { actions });
});

app.get("/actions/:type", function (req, res) {
  const type = req.params.type;
  const actions = settingsBillFunction.actionsFor(type);
  res.render("actions", { actions });
});
  
const PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});




