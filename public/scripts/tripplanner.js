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
			$.ajax({type: 'POST', url: '/day', data: dayObj, error: function(obj, status, err){console.log(err)}, success: function (day) {
				//console.log(day);
				dayIds.push(day);
				console.log(dayIds);
			}});
		} else {
			for (var i=0, len = data.length; i < len; i++) {
				if (i==0) {
					dayIds.push(data[i]._id.toString());
				} else {
					dayIds.push(data[i]._id.toString());
					new Day();
				}
			};
		}
	}});
	currentDay.$button.addClass('current-day');
});