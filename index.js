var express = require("express");
var path = require('path');
var app = express();

// app.use('/data', express.static(__dirname + '/data'));
app.get('/', function(req,res){
  app.use('/data', express.static(__dirname + '/data'));
  app.use('/static', express.static(path.join(__dirname,'assets')));
  res.sendFile(__dirname + "/index.html")
})

app.listen(8080);
