const express = require("express");
const mongoose = require("mongoose");
const v1Routes = require("./versions/v1");
const cache = require("apicache").middleware;

require("dotenv").config()

const app = express();

app.use(express.json());
app.get(cache("5 minutes"));
app.use("/v1", v1Routes);

mongoose.connect(process.env.DB_CONNECT, () => console.log("connected"));
app.listen(process.env.PORT, () => console.log("listening"))