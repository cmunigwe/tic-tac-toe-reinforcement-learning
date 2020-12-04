
var http = require('http');
var fs = require('fs');

const PORT=8080; 

fs.readFile('./style.css', function(err, data) {
    if (err){
        throw err;
    }
    cssFile = data;
});

fs.readFile('./index.html', function (err, data) {

    if (err) {
        throw err;    
    }
    htmlFile = data
    
});

fs.readFile('./script.js', function (err, data) {

    if (err) {
        throw err;    
    }
    jsFile = data
    
});

var server = http.createServer(function (request, response) {
    switch (request.url) {
        case "/style.css" :
            response.writeHead(200, {"Content-Type": "text/css"});
            response.write(cssFile);
            break;
        case "/script.js" :
            //response.setHeader({'Access-Control-Allow-Origin': 'http://localhost:3000'});
            // Request methods you wish to allow
            //response.setHeader({'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'});

            // Request headers you wish to allow
            //response.setHeader({'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});

            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(jsFile);
            break;
        default :    
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(htmlFile);
    };
    response.end();
}
);

server.listen(PORT)

/*
const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  request(
    { url: 'https://localhost:3000' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

/*
var request = require('request');
request('http://localhost:3000', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
*/
