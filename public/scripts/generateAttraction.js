var generateAttraction;


$(document).ready(function () {

	generateAttraction = function (config) {
		config.$all.find('.add').on('click', function () {
			
			var attraction = config.$all.find(':selected').data();
			var newAttraction = new config.constructor(attraction);
			var attrObj = { attrId: newAttraction._id.toString()};
			console.log(newAttraction);
			var dayNum = $('#day-title span').text().split(' ')[1];
			var url = '/day/' + dayIds[dayNum-1] + '/' + attraction.attractionType;
			if (attraction.attractionType == 'hotel') {
				$.ajax({type: 'POST', url: url, data: attrObj, success: function(data) {
				console.log(data);	
				}});
			} else if (attraction.attractionType == 'restaurant') {

			} else {

			}
		});
		config.all.forEach(function (attraction) {
			var $option = $('<option></option>').text(attraction.name).data(attraction);
			config.$all.find('select').append($option);
		});
		return {
			// erase an attraction's marker
			eraseMarker: function () {
				this.marker.setMap(null);
				narrowBounds(this.marker);
				return this;
			},

			// build but do not render an attraction's marker
			buildMarker: function () {
				var location = this.place[0].location;
				this.marker = new google.maps.Marker({
					position: new google.maps.LatLng(location[0], location[1]),
					icon: config.icon
				});
				return this;
			},

			// draw an attraction's marker on the screen
			drawMarker: function () {
				this.marker.setMap(map);
				extendBounds(this.marker);
				return this;
			},

			// erase an attraction's itinierary item view
			eraseItineraryItem: function () {
				this.$itineraryItem.detach();
				return this;
			},

			// build but do not render an attraction's itinierary item view
			buildItineraryItem: function () {
				var $title = $('<span class="title"></span>').text(this.name),		
					$button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');
				$title.data({id: this._id, attractionType: this.attractionType});
				var $item = $('<div class="itinerary-item"></div>')
					.append($title)
					.append($button);
				//console.log(this);
				this.$itineraryItem = $item;
				var self = this;
				$button.on('click', function () {
					self.delete();
				});
				return this;
			},
			
			// draw an attraction's itinerary view on the screen
			drawItineraryItem: function () {
				config.$listGroup.append(this.$itineraryItem);
				return this;
			}
		};
	}
});