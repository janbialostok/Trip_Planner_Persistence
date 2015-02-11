var Hotel;

$(document).ready(function () {

	$.get('/hotels', function (data) {
		Hotel.prototype = generateAttraction({
			icon: '/images/lodging_0star.png',
			$listGroup: $('#my-hotel .list-group'),
			$all: $('#all-hotels'),
			all: data,
			constructor: Hotel
		});
		// remove a hotel from the current day
		Hotel.prototype.delete = function () {
			var hotelData = $(this).prev().data();
			console.log($(this).prev());
			var dayNum = $('#day-title span').text().split(' ')[1];
			var hotelId = '/day/' + dayIds[dayNum-1] + '/' + hotelData.attractionType;
			currentDay.hotel
				.eraseMarker()
				.eraseItineraryItem();
			currentDay.hotel = null;
			// $.ajax({type: 'DELETE', url: 'days' )
			// };
		};
	// construct a new hotel for the current day
	});
	Hotel = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this;
	}	
});