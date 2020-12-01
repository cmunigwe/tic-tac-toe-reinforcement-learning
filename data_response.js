/*
const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let states = JSON.parse(rawdata);

const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];

  response.writeHead(200, {'Content-Type': 'application/json'});

  var json = JSON.stringify(states);

  response.end(json);

}).listen(3000);
*/
/*
const express = require('express')
const cors = require("cors")
const app = express()
const port = 3000
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/
const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let states = JSON.parse(rawdata);

const express = require('express')
const cors = require("cors")
const app = express()
const port = 3000
app.use(cors())
var json = JSON.stringify(states);

app.get('/', (req, res) => {
  res.send(json)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})