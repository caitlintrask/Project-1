var APIKey = "3772214fc0f50dcfebaa475c98dfa002";
var cityID;
// var searchInput=$("#search").val();

$("#clear-results").on("click", function (event) {
    event.preventDefault();
    $("#search-submit-button").attr("disabled", false);
    $("#results").empty();
    $("#indRestPage").empty();
})

$("#search-submit-button").on("click", function(event) {
	event.preventDefault();
  $("#spinner").css("display", "block");
  $("#search-submit-button").attr("disabled", true);

	var locationQueryURL =
		"https://developers.zomato.com/api/v2.1/cities?q=" +
		$("#search").val() +
		"&user-key=" +
		APIKey;

	$.ajax({
		url: locationQueryURL,
		headers: { "user-key": APIKey },
		method: "GET"
	}).then(function(response) {
		console.log(response);
		cityID = response.location_suggestions[0].id;
		console.log("city id: " + response.location_suggestions[0].id);
		localStorage.setItem("city id", response.location_suggestions[0].id);

		var searchURL =
			"https://developers.zomato.com/api/v2.1/search?entity_id=" +
			cityID +
			"&entity_type=city&cuisines=" +
			$("#cuisineType")
				.find(":selected")
				.val() +
			"&user-key=" +
			APIKey;
		console.log(searchURL);
		console.log("Search input: " + $("#search").val());

		$.ajax({
			url: searchURL,
			headers: { "user-key": APIKey },
			method: "GET"
		}).then(function(response) {
			console.log("SEARCH", response);
            $("#spinner").css("display", "none");
            $("#results").css("display", "block");

			// window.open("search-results.html", "_blank");

			// console.log(response.restaurants[0].restaurant.featured_image);

			// NEXT TIME: work on getting results to load on another page
			// use .load()??? idk how to apply that here though
			for (var i = 0; i < 4; i++) {
				var stars =
					response.restaurants[i].restaurant.user_rating.aggregate_rating;
				$("#results").append(
					`<div class="divider"></div>
                    <div class="row">
                        <div class="section">
                            <div class="col s4 m4 l4">
                                <img src="${response.restaurants[i].restaurant.featured_image}" alt="" style="width: 200px;">
                            </div>
                
                            <div class="col s8 m8 l8">
                                <h5>${response.restaurants[i].restaurant.name}</h5>
                                <div value="${stars}"></div>
                                <div>${response.restaurants[i].restaurant.cuisines}</div>
                                <div class="moreBtn" id="moreBtn${response.restaurants[i].restaurant.id}" data-id="${response.restaurants[i].restaurant.id}"></div>
                            </div>

                        </div>
                    </div>`
                );
                
				var moreBtns = $("<button>")
                
                moreBtns.text("More Info").addClass("waves-effect waves-light btn")

                console.log('ID', i)
                console.log(response.restaurants[i].restaurant.id)

                $('#moreBtn' + response.restaurants[i].restaurant.id).append(moreBtns)
            }
            

            // moreBtns.appendTo(".moreBtn");

			// $("#results1").load("index.html #results");

			// NEED HELP WITH THIS PART idk how to call different id's without having to reiterate all of this 4 times...

			// var rating = response.restaurants[i].restaurant.user_rating.aggregate_rating;

			// if (rating === 5) {
			// 	$("#yelp-stars0").attr(
			// 		"src",
			// 		"assets/yelp_stars/web_and_ios/small/small_5.png"
			// 	);
			// } ...

			// same question as above, getting a button click to display results on another html page, but for individual restaurant results

			$(document).on("click", ".moreBtn", function() {
                // window.open("restaurantPage.html", "_blank");
                $("#results").css("display", "none");
                $("#spinner").css("display", "block");
                $("#indRestPage").css("display", "block");
                
				console.log($(this))
				console.log('DATA ID', $(this).attr("data-id"))
                
				var dataID=($(this).attr("data-id"))
				
				var individualRestURL =
                "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
                dataID +
                "&user-key=" +
                APIKey;
                
				$.ajax({
                    url: individualRestURL,
					headers: { "user-key": APIKey },
					method: "GET"
				}).then(function(response) {
                    console.log("latitude: " + response.location.latitude);
                    console.log("longitude: " + response.location.longitude);

                    $("#spinner").css("display", "none");
                    
                    $("#indRestPage").empty();

                    $("#indRestPage").append(
                        `<br>
                        <br>
                        <div class="row">
                            <div class="col s4 m4 l4"><img src="" alt="Featured Image" style="height: 200px; width: 200px;"
                                    id="featuredImg"></div>
                            <div class="col s6 m6 l6">
                                <div class="row">
                                    <div>
                                        <h3 id="rName"></h3>
                                    </div>
                                    <div><img src="" id="rating"></div>
                                    <div>
                                        <h5 id="rCuisine"></h5>
                                    </div>
                                    <div id="cost"></div>
                                    <div><a href="" id="rWebsite">Website</a></div>
                                </div>
                            </div>
                            <div class="col s2 m2 l2" id="contactInfo">
                                <p id="address"></p>
                                <p id="phoneNum"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6 m6 l6" id="photosDiv">
                                <div class="row">
                                    <div style="display: flex">
                                        <img src="" alt="photo1" id="photo1">
                                        <img src="" alt="photo1" id="photo2">
                                        <img src="" alt="photo1" id="photo3">
                                    </div>
                                </div>
                                <div class="row">
                                    <div style="display: flex">
                                        <img src="" alt="photo1" id="photo4">
                                        <img src="" alt="photo1" id="photo5">
                                        <img src="" alt="photo1" id="photo6">
                                    </div>
                                </div>
                            </div>
                            <div class="col s6 m6 l6" id="map" style="display: flex"></div>
                        </div>`);

					var lat = response.location.latitude;
					var lon = response.location.longitude;
					var map;
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
					console.log(
						"aggregate rating: " + response.user_rating.aggregate_rating
					);

					console.log("cost for two: " + response.average_cost_for_two);
					$("#cost").text(
						"Average Cost for Two: $" + response.average_cost_for_two
					);

					$("#rating").text("Rating: " + response.user_rating.aggregate_rating);

					var rating = response.user_rating.aggregate_rating;

					if (rating === 5) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_5.png"
						);
					} else if (rating < 5 && rating >= 4.5) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_4_half.png"
						);
					} else if (rating >= 4 && rating <= 4.5) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_4@2x.png"
						);
					} else if (rating >= 3.5 && rating <= 4) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_3_half.png"
						);
					} else if (rating >= 3 && rating <= 3.5) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_3.png"
						);
					} else if (rating >= 2.5 && rating <= 3) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_2_half.png"
						);
					} else if (rating >= 2 && rating <= 2.5) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_2.png"
						);
					} else if (rating >= 1.5 && rating <= 2) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_1_half.png"
						);
					} else if (rating >= 1 && rating <= 1.5) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_1.png"
						);
					} else if (rating < 1) {
						$("#rating").attr(
							"src",
							"assets/yelp_stars/web_and_ios/small/small_0.png"
						);
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
			});
		});
	});
});
