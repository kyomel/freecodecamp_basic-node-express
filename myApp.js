var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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

app.get('/:word/echo', function(req,res) {
    let { word } = req.params;
    res.json({
        echo: word
    });
})

app.get('/name', function(req, res) {
    let first = req.query.firs;
    let last = req.query.last;
    let objRes = {name:`${first} ${last}`};
    res.send(objRes);
})

app.post('/name', function(req, res) {
    let string  = req.body.first + " " + req.body.last;
    res.json({ name: string});
})
  



















 module.exports = app;
