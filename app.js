const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
const config = require("./config");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const authRoute = require("./routers/api/auth");
const usersRoute = require("./routers/api/users");

const { MONGO_URI, MONGO_DB_NAME } = config;

const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

module.exports = app;