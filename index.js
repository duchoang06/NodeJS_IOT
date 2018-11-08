var firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyAK_VVrlpW99bJKU7YrCUflwRji78ArYDc",
    authDomain: "weathertracking-1803.firebaseapp.com",
    databaseURL: "https://weathertracking-1803.firebaseio.com",
    storageBucket: "weathertracking-1803.appspot.com",
};

firebase.initializeApp(config);
var express = require('express');
var app = express();

app.get('/temp/:tempValue', function (req, res) {
    console.log(req.params);
    res.send(req.params);
    //Insert key,value pair to database
    var newPostKey = firebase.database().ref().child('Temperature').push().key;
    var updates = {};
    updates['/Temperature/'+Date.now()] = req.params.tempValue;
    firebase.database().ref().update(updates);
});

app.get('/humid/:humidValue', function (req, res) {
  console.log(req.params);
  res.send(req.params);
  //Insert key,value pair to database
  var newPostKey = firebase.database().ref().child('Humidity').push().key;
  var updates = {};
  updates['/Humidity/'+Date.now()] = req.params.humidValue;
  firebase.database().ref().update(updates);
});

app.get('/light/:lightValue', function (req, res) {
  console.log(req.params);
  res.send(req.params);
  //Insert key,value pair to database
  var newPostKey = firebase.database().ref().child('Light').push().key;
  var updates = {};
  updates['/Light/'+Date.now()] = req.params.lightValue;
  firebase.database().ref().update(updates);
});

app.get('/get/temp', function (req, res) {
  var gotTemp;
  return firebase.database().ref('/Temperature').once('value').then(function(snapshot) {
    res.send(snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]]);
  });
});

app.get('/get/light', function (req, res) {
  var gotTemp;
  return firebase.database().ref('/Light').once('value').then(function(snapshot) {
    res.send(snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]]);
  });
});

app.get('/get/humid', function (req, res) {
  var gotTemp;
  return firebase.database().ref('/Humidity').once('value').then(function(snapshot) {
    res.send(snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]]);
  });
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});



