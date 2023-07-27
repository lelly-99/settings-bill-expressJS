import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import settingsBill from "./factory-functions/settingsBill.js";

const app = express();
const settingsBillFunction = settingsBill();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// css
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.render("index", { 
    renderSettings: settingsBillFunction.getSettings(), 
    totals : settingsBillFunction.totals()
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
  // capture call type to add
  const billItemType = req.body.billItemTypeWithSettings;
  settingsBillFunction.callAction(billItemType); // Call the handleAction function
  res.redirect("/");
});

app.get("/actions", function (req, res) {});

app.get("/actions/:type", function (req, res) {});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});

