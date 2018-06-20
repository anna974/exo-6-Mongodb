var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;

server.use(bodyParser.urlencoded({ extended: true }))


var url = "mongodb://localhost:27017/Anna";


server.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// A REVOIR
server.post('/ajoute', function (req, res) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Connecté à la base de données");
    var dbo = db.db("Anna");

    var obj1 = req.query.donnee1;
    var obj2 = req.query.donnee2;
    
    dbo.collection("personnages").insertOne({ obj1, obj2 }, function (err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      // console.log(obj1);
      // res.json(result)
      return result;
      db.close()

    });
  });
});

server.get('/affiche', function (req, res) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Connecté à la base de données");
    var dbo = db.db("Anna");

    dbo.collection("personnages").find({}).toArray(function (err, result) {
      if (err) throw err;
      tab = result;
      res.json(tab);
      db.close();

    });
  });
});



server.listen(3043);


// FONCTION CALLBACK A REVOIR

// function afficheDonnees(callback) {
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("Anna");
//     dbo.collection("personnages").find({}).toArray(function (err, result) {
//       if (!err) {
//         tab = JSON.parse(result);
//         console.log(tab);
//         db.close();
//         return callback(null, tab);
//       } else {
//         return callback(err, null);
//       }
//     })
//   })
// };


// server.get('/affiche', function (req, res) {

//   afficheDonnees(function (err, data) {
//     if (!err) {
//       console.log(data);
//       res.send(data);
//     }
//     else {
//       res.send(err);
//     }
//   });
// });

