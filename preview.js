#!/usr/bin/env node
process.title = "preview-ide";
const express = require("express");
const fs = require("fs");
var app = express();

app.get("/*", (req, res) => {
  if (fs.existsSync("." + req.originalUrl)) {
    if (req.originalUrl.substring(req.originalUrl.length - 4) === ".css") {
      res.header({ "Content-Type": "text/css" });
    }
    res.send(fs.readFileSync("." + req.originalUrl, "utf-8"));
  } else {
    res.sendStatus(204);
  }
});

app.listen(1567);
