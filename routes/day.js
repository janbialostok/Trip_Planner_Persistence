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
        if (!err) {
            res.send(day._id.toString());
        }
        else {
        	console.log(err);
        	res.send(err);
        }
    });
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
	console.log("PARAMS", req.params.id)
    models.Day.findOne({ _id: req.params.id }).populate("hotel restaurants thingsToDo").exec(function(err, data){
    	console.log(data);
    	res.json(data);
    });

    // serves a particular day as json
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
    console.log(req.params.id);
    models.Day.remove({ _id: req.params.id }, function(err) {
        if (!err) { res.send("success"); }
        else { res.send(err);}
    })
});

dayRouter.use('/:id', function (req, res, next) {
    req.dayId = req.params.id;
    next();
})

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
    console.log("id?", req.dayId);
    console.log("test", req.body);
    models.Day.findOne({ _id: req.dayId }, function(err, day) {
        if (!err) { 
            models.Hotel.findOne( { _id: req.body.attrId }, function(err, hotel) {
                day.hotel = hotel;
                day.save(function(err, d) {
                    if (!err) { 
                        console.log(hotel);
                        res.send("success", d.hotel);
                    }
                });
            });
        }
    });
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
    console.log(req.body)
    console.log(req.dayId);
    //res.send("Hello World");
    models.Day.findOne({ _id: req.dayId }, function(err, day){
    	day.hotel = undefined;
    	day.save(function(err, d){
    		res.send("Hotel Deleted");
    	});
   });
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
    models.Day.findOne({ _id: req.dayId }, function(err, day) {
        if (!err) { 
            models.Restaurant.findOne( { _id: req.body.attrId }, function(err, restaurant) {
                day.restaurants.push(restaurant)
                day.save(function(err, d) {
                    if (!err) { 
                        console.log(restaurant);
                        res.send("success", d.restaurants);
                    }
                });
            });
        }
    });
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
     models.Day.findOne({ _id: req.dayId }, function(err, day) {
        if (!err) { 
            models.ThingToDo.findOne( { _id: req.body.attrId }, function(err, thing) {
                day.thingsToDo.push(thing)
                day.save(function(err, d) {
                    if (!err) { 
                        console.log(thing);
                        res.send("success", d.thingsToDo);
                    }
                });
            });
        }
    });
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

attractionRouter.get('/:attractionType/:id', function(req, res){
	if (req.params.attractionType == "hotel"){
		models.Hotel.findOne({ _id: req.params.id }, function(err, hotel){
			res.send(hotel);
		});
	}
});

module.exports = dayRouter;