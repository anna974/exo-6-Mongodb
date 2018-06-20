var express = require('express');
var server = express();
var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/Anna";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Connecté à la base de données 'tutoriel'");
  var dbo = db.db("Anna");

  dbo.collection("personnages").find({}).toArray(function (err, result) {
    if (err) throw err;
    tab = result;
    db.close();

  });
});

server.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.get('/affiche', function (req, res) {
  res.json(tab);
});

server.listen(3044);


