function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	days = [];
	currentDay = new Day();
	var dayObj = {
			number: currentDay.number
	};


	$.ajax({type: "GET", url: "/day", success: function(data){
		if (data.length == 0){
			$.ajax({type: 'POST', url: '/day', data: dayObj, error: function(obj, status, err){console.log(err)}, success: function (days) {
				//console.log(day);
				dayIds.push(days);
			}});
		} else {
			data.forEach(function(day, index){
				dayIds.push(day._id.toString());
				if (index == 0){
					$.ajax({ type: "GET", url: "/day/" + day._id, success: function(data){
						console.log(data.hotel, data.restaurants, data.thingsToDo);
						 days[0].hotel = new Hotel(data.hotel);
						 data.restaurants.forEach(function(r){
						 	days[0].restaurants.push(new Restaurant(r));
						 });
						 data.thingsToDo.forEach(function(t){
						 	days[0].thingsToDo.push(new ThingToDo(t));
						 });
					}});
				}
				else{
					new Day();
					$.ajax({ type: "GET", url: "/day/" + day._id, success: function(data){
						//console.log(data.hotel, data.restaurants, data.thingsToDo);
						 days[1].hotel = new Hotel(data.hotel);
						 data.restaurants.forEach(function(r){
						 	days[1].restaurants.push(new Restaurant(r));
						 });
						 data.thingsToDo.forEach(function(t){
						 	days[1].thingsToDo.push(new ThingToDo(t));
						 });
					}});
				}
			});
		}
	}});
	currentDay.$button.addClass('current-day');
});