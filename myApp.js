var express = require('express');
var app = express();
var path = require('path');
require('dotenv').config();

app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
  })
  
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send(res.json({time: req.time}));
})


app.get('/test', function(req, res) {
    res.send("Hello Express");
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/json', function(req, res) {
    res.json({"message": "Hello json"})
})

app.get('/json', function(req, res) {
    let message = "Hello json";
    if(process.env.MESSAGE_STYLE === 'uppercase') {
        return res.json({'message': message.toUpperCase()});
    }
    return res.status(200).json({'message': message})
  })
  



















 module.exports = app;
