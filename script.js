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
var restaurantQueryURL = "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318";

$.ajax({
	url: restaurantQueryURL,
	headers: { "user-key": APIKey },
	method: "GET"
}).then(function(response) {
	console.log(response);

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
	console.log("cost for two: " + response.average_cost_for_two);

	// restaurant photos
	console.log("feautured photo url: " + response.thumb);
	console.log("photo gallery urls: ", response.photos);
});

// RESTAURANT IDs
var searchResQueryURL = "https://developers.zomato.com/api/v2.1/search";

$.ajax({
	url: searchResQueryURL,
	headers: { "user-key": APIKey },
	method: "GET"
}).then(function(response) {
	console.log(response);
});
    url: searchResQueryURL,
    headers:{ 'user-key': APIKey },
    method: "GET"
})
    .then(function(response) {
    console.log(response);
})

var individualRestURL = "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318";


$.ajax({
	url: individualRestURL,
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
		var myLatLng = { lat: parseFloat(lat), lng: parseFloat(lon) };

		var map = new google.maps.Map(document.getElementById("map"), {
			center: myLatLng,
			zoom: 18
		});

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			animation: google.maps.Animation.DROP
		});
	}
	initMap();

	// restaurant contact info
	console.log("restaurant name: " + response.name);
	$("#rName").text(response.name);
	console.log("restaurant cuisine: " + response.cuisines);
	$("#rCuisine").text(response.cuisines);
	console.log("address: " + response.location.address);
	$("#address").text(response.location.address);
	console.log("phone number: " + response.phone_numbers);
	$("#phoneNum").text(response.phone_numbers);

	// restaurant website links
	console.log("website: " + response.url);
	$("#rWebsite").attr("href", response.url);
	console.log("menu: " + response.menu_url);

	// restaurant rating and price info
	console.log("rating text: " + response.user_rating.rating_text);
	console.log("aggregate rating: " + response.user_rating.aggregate_rating);

	console.log("cost for two: " + response.average_cost_for_two);
	$("#cost").text("Average Cost for Two: $" + response.average_cost_for_two);

	$("#rating").text("Rating: " + response.user_rating.aggregate_rating);
	
	var rating = response.user_rating.aggregate_rating;

	if (rating === 5) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_5.png")
	}
	else if (rating < 5 && rating >= 4.5) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_4_half.png")
	}
	else if (rating >= 4 && rating <= 4.5) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_4@2x.png")
	}
	else if (rating >= 3.5 && rating <= 4) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_3_half.png")
	}
	else if (rating >= 3 && rating <= 3.5) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_3.png")
	}
	else if (rating >= 2.5 && rating <= 3) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_2_half.png")
	}
	else if (rating >= 2 && rating <= 2.5) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_2.png")
	}
	else if (rating >= 1.5 && rating <= 2) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_1_half.png")
	}
	else if (rating >= 1 && rating <= 1.5) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_1.png")
	}
	else if (rating < 1) {
		$("#rating").attr("src", "assets/yelp_stars/web_and_ios/small/small_0.png")
	}


	// restaurant photos
	console.log("feautured photo url: " + response.thumb);
	$("#featuredImg").attr("src", response.thumb);
	console.log("photo gallery urls: ", response.photos);
	$("#photo1").attr("src", response.photos[0].photo.thumb_url);
	$("#photo2").attr("src", response.photos[1].photo.thumb_url);
	$("#photo3").attr("src", response.photos[2].photo.thumb_url);
	$("#photo4").attr("src", response.photos[3].photo.thumb_url);
	$("#photo5").attr("src", response.photos[4].photo.thumb_url);
	$("#photo6").attr("src", response.photos[5].photo.thumb_url);
});
