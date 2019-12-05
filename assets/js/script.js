(function($) {
	$(function() {
		$(".sidenav").sidenav();
		$(".parallax").parallax();
	}); // end of document ready
})(jQuery); // end of jQuery name space

// Or with jQuery

$(document).ready(function() {
	$(".datepicker").datepicker();
});

// GOOGLE MAPS API CALL
// lat and lon will later be put in vars and set to the responses lat and lon
// var map;
// function initMap() {
// 	map = new google.maps.Map(document.getElementById("map"), {
// 		center: { lat: -34.397, lng: 150.644 },
// 		zoom: 8
// 	});
// }
