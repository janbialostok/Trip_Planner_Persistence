var Day;
var dayIds = [];

$(document).ready(function () {
	Day = function () {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		this.number = days.push(this);

		this.buildButton()
			.drawButton();
	}

	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
			var dayId = $("#day-title span").text().split(" ")[1];
			//if (days[dayId - 1].hotel == null)
			// $.ajax({ type: "GET", url: "/day/" + dayIds[dayId - 1], success: function(data){
			// 	//console.log(data.hotel, data.restaurants, data.thingsToDo);
			// 	 days[dayId - 1].hotel = new Hotel(data.hotel);
			// 	 data.restaurants.forEach(function(r){
			// 	 	days[dayId - 1].restaurants.push(new Restaurant(r));
			// 	 });
			// 	 data.thingsToDo.forEach(function(t){
			// 	 	days[dayId - 1].thingsToDo.push(new ThingToDo(t));
			// 	 });
			// }});
		});
		return this;
	};

	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};

	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};

	function deleteCurrentDay () {
		if (days.length > 1) {
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				newCurrent = days[index] || days[index - 1];
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			newCurrent.switchTo();
			previousDay.eraseButton();
			$.ajax({type: 'DELETE', url: '/day/' + dayIds[index], success: function(data) {
				dayIds.splice(index, 1);
			}});
		}
	};

	$('#add-day').on('click', function () {
		var newDay = new Day();
		var dayObj = {
			number: newDay.number
		};
		$.ajax({type: 'POST', url: '/day', data: dayObj, error: function(obj, status, err){console.log(err)}}).done(function(data){
			dayIds.push(data);
			console.log(dayIds);
		});
	});

	$('#day-title > .remove').on('click', deleteCurrentDay);
});