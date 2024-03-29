//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listComments', function (req, res) {
  console.log("Got a GET request for /listComments");
  fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
})

app.post('/addComment', function (req, res) {
  console.log("Got a POST request for /addComment");
  // First read existing comments.
  fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data["comment" + req.body.id] = req.body.comment;
    console.log( data );
    fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.end( JSON.stringify(data));
  });
})

app.delete('/deleteComment', function (req, res) {
  console.log("Got a DELETE request for /deleteComment");
  fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    delete data["comment" + req.body.id];
    console.log( data );
    fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.end( JSON.stringify(data));
  });
})

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})
