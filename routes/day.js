var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();

var models = require('../models');

// GET /days
dayRouter.get('/', function (req, res, next) {
    models.Day.find().exec(function(err, days){
    	res.send(days);
    });
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    var data = req.body;
    console.log(data);
    var newDay = new models.Day({
        number: data.number,
        hotel: data.hotel,
        restaurants: data.restaurants,
        thingsToDo: data.thingsToDo
    });
    newDay.save(function(err, day) {
        if (!err){
            res.send(day._id.toString());
        }
        else{
        	console.log(err);
        	res.send(err);
        }
    });
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
});

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = dayRouter;