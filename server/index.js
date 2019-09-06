"use strict"

const express = require("express")
const compression = require("compression")
const url = "http://localhost:8080/nijie/build/static"
const css1 = "2.8d7f79a6.chunk.css"
const css2 = "main.f935656d.chunk.css"
const js1 = "2.6f2b0e7b.chunk.js"
const js2 = "main.8f60729f.chunk.js"
const js3 = "runtime~main.a8a9905a.js"
const app = express()

app.use(compression())

app.get("/", function (req, res) {
  return res.status(200).send(page())
})

app.get("/downloader", function (req, res) {
  return res.status(200).send(page())
})

app.get("/help+", function (req, res) {
  return res.status(200).send(page())
})

app.get("/queue", function (req, res) {
  return res.status(200).send(page())
})

app.get("/history", function (req, res) {
  return res.status(200).send(page())
})

app.get("/settings", function (req, res) {
  return res.status(200).send(page())
})

app.post("/directlyGet", function (req,res) {
  return res.status(200).send(directlyGet());
})

app.use(function(req, res, next){
  return res.status(404).send(page())
})

function page()  {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Nijie Downloader</title>
  </head>
  <body>
  <noscript>
  You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
  <script type="text/javascript" src="${url}/js/${js1}" async></script>
  <script type="text/javascript" src="${url}/js/${js2}" async></script>
  <script type="text/javascript" src="${url}/js/${js3}" async></script>
  <link rel="stylesheet" href="${url}/css/${css1}">
  <link rel="stylesheet" href="${url}/css/${css2}"></body>
  </html>`
}

var PORT = process.env.PORT || 8081

app.listen(PORT, function() {
  console.log("Server running at localhost:" + PORT)
})
