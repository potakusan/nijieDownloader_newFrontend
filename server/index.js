"use strict"

const express = require("express")
const compression = require("compression")
const bodyParser = require("body-parser")
const url = "https://files.poyashi.me/nijie/build/static"
const css1 = "2.8d7f79a6.chunk.css"
const css2 = "main.997c3a52.chunk.css"
const js1 = "2.3824dd97.chunk.js"
const js2 = "main.51796727.chunk.js"
const js3 = "runtime~main.a8a9905a.js"
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

app.get("/main.js", function (req, res) {
  return res.status(200).redirect("https://files.poyashi.me/nijie/main.js")
})

app.get("/", function (req, res) {
  return res.status(200).send(page(req))
})

app.get("/downloader", function (req, res) {
  return res.status(200).send(page(req))
})

app.get("/help+", function (req, res) {
  return res.status(200).send(page(req))
})

app.get("/queue", function (req, res) {
  return res.status(200).send(page(req))
})

app.get("/history", function (req, res) {
  return res.status(200).send(page(req))
})

app.get("/settings", function (req, res) {
  return res.status(200).send(page(req))
})

app.use(function(req, res, next){
  return res.status(404).send(page(req))
})

function page(req,insert = null)  {
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
  ${req.method === "POST" ? `<input id="temp" type="hidden" name="temp" value="${encodeURIComponent(req.body.q).replace("%5B%22","%5B").replace("%22%5D","%5D").replace(/%5C%22/g,"%22").replace(/%22%7D%22%2C%22%7B%22/g,"%22%7D%2C%7B%22")}"/>` : ""}
  ${insert !== null ? insert : ""}
  <script type="text/javascript" src="${url}/js/${js1}" async></script>
  <script type="text/javascript" src="${url}/js/${js2}" async></script>
  <script type="text/javascript" src="${url}/js/${js3}" async></script>
  <link rel="stylesheet" href="${url}/css/${css1}">
  <link rel="stylesheet" href="${url}/css/${css2}"></body>
  </html>`
}

var PORT = process.env.PORT || 8090

app.listen(PORT, function() {
  console.log("Server running at localhost:" + PORT)
})
