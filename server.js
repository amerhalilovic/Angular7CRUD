const db = "mongodb://amer:Amer1206@ds159216.mlab.com:59216/crud";
var mongoose = require('mongoose');
var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
const PORT = 8080 || process.env.PORT;
mongoose.connect(db, err => {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongoose')
    }
})

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String },
    address: { type: String },
}, { versionKey: false });

var model = mongoose.model('users', UserSchema, 'users');

app.post("/api/SaveUser", function (req, res) {
    var mod = new model(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: "Record has been inserted" });
        }
    });
})

app.post("/api/UpdateUser", function (req, res) {
    var mod = new model(req.body);
    model.findByIdAndUpdate(req.body._id, { name: req.body.name, address: req.body.address },
        function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been Updated" });
            }
        })
})

app.post("/api/deleteUser", function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: "Record has been Deleted" });
        }
    })
})

app.get("/api/getUser", function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

app.listen(PORT, function () {
    console.log('Example app listening on port 8080')
})