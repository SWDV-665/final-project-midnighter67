// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/events");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Event = mongoose.model('Event', {
    location: String,
});


// Get event 
app.get('/api/events', function (req, res) {

    console.log("Listing events...");

    //use mongoose to get all events in the database
    Event.find(function (err, events) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(events); // return all events in JSON format
    });
});

// Create an event
app.post('/api/events', function (req, res) {

    console.log("Creating event...");

    Event.create({
        location: req.body.location,
        done: false
    }, function (err, event) {
        if (err) {
            res.send(err);
        }

        // create and return all events
        Event.find(function (err, events) {
            if (err)
                res.send(err);
            res.json(events);
        });
    });

});



// Delete an event
app.delete('/api/events/:id', function (req, res) {
    Event.remove({
        _id: req.params.id
    }, function (err, event) {
        if (err) {
            console.error("Error deleting event ", err);
        }
        else {
            Event.find(function (err, events) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(events);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Parking server listening on port  - ", (process.env.PORT || 8080));