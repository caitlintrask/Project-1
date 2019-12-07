var APIKey = "3772214fc0f50dcfebaa475c98dfa002";

// "Denver Cuisines" API Call
var cuisineQueryURL =
	"https://developers.zomato.com/api/v2.1/cuisines?city_id=305";

$.ajax({
	url: cuisineQueryURL,
	headers: { "user-key": APIKey },
	method: "GET"
}).then(function(response) {
	console.log(response);
	localStorage.setItem("cuisine", JSON.stringify(response));
});

// "Location" API Call
var locationQueryURL = "https://developers.zomato.com/api/v2.1/cities?q=Denver";

$.ajax({
	url: locationQueryURL,
	headers: { "user-key": APIKey },
	method: "GET"
}).then(function(response) {
	console.log(response);

	console.log("city name: " + response.location_suggestions[0].name);
	localStorage.setItem("city name", response.location_suggestions[0].name);

	console.log("city id: " + response.location_suggestions[0].id);
	localStorage.setItem("city id", response.location_suggestions[0].id);
});

// "Restaurant" API Call
var ratingTextQueryURL =
	"https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318";

$.ajax({
	url: ratingTextQueryURL,
	headers: { "user-key": APIKey },
	method: "GET"
}).then(function(response) {
	console.log(response);

	console.log("latitude: " + response.location.latitude);
	console.log("longitude: " + response.location.longitude);

	var lat = response.location.latitude;
	var lon = response.location.longitude;
	// var map;
	function initMap() {
		var myLatLng =  { lat: parseFloat(lat), lng: parseFloat(lon) };

		var map = new google.maps.Map(document.getElementById("map"), {
			center: myLatLng,
			zoom: 18
		});

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			animation: google.maps.Animation.DROP
        });
        google.maps.Data.StyleOptions.fillOpacity = 1;
    	}
	initMap();

	// restaurant contact info
	console.log("restaurant name: " + response.name);
	console.log("restaurant cuisine: " + response.cuisines);
	console.log("address: " + response.location.address);
	console.log("phone number: " + response.phone_numbers);

	// restaurant website links
	console.log("website: " + response.url);
	console.log("menu: " + response.menu_url);

	// restaurant rating and price info
	console.log("rating text: " + response.user_rating.rating_text);
	console.log("aggregate rating: " + response.user_rating.aggregate_rating);
	console.log("price range: " + response.price_range);

	// restaurant photos
	console.log("feautured photo url: " + response.thumb);
	console.log("photo gallery urls: ", response.photos);
});
