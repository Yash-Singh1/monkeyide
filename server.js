#!/usr/bin/env node
process.title = 'preview-ide';
const express = require('express');
const fs = require('fs');
var app = express();

app.get('/*', (req, res) => {
  if (req.originalUrl == '/index.html') {
    return res.redirect('/');
  }
  if (fs.existsSync('.' + req.originalUrl)) {
    res.sendFile(req.originalUrl == '/' ? 'index.html' : req.originalUrl.substring(1), {
      root: './',
    });
  } else {
    res.sendStatus(204);
  }
});

app.listen(1567);

console.log();
