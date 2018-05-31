import express from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { ScenarioCommand } from "./../../simulations-manager/src/models/Scenario";

const PORT = 8080;
const HOST = "0.0.0.0";


const app = express();
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello world\n");
});
app.post("/", (req, res) => {
  const commands: Array<ScenarioCommand> = req.body;
  commands.map(async command => {
    const temp = await axios.get(`http://${command.simulatorName}`);
    console.log(temp);
  });
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);