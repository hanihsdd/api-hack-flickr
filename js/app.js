/***********************************************

Endpoint: https://api.flickr.com/services
API Key: 92e8383ab9545e92aa81ecf132195be5
Need to use &jsoncallback=? in order to receive JSONP

Endpoint API documentation:
https://www.flickr.com/services/api/misc.overview.html

flickr.photos.search
https://www.flickr.com/services/api/flickr.photos.search.html

Photo Source URLs
https://www.flickr.com/services/api/misc.urls.html

Use the following template for images:
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_m.jpg

Use the following template for links:
https://www.flickr.com/photos/{user-id}/{photo-id} - individual photo

************************************************/


$(document).ready(function(){

	//focus on text input
	$("#search-term").focus();


	$("form").submit(function (event){
		event.preventDefault();
		console.log("Form Submitted")

		var searchTerm = $("#search-term").val().trim();
		getRequest(searchTerm);

		//show search results text and value
		$(".user-area p").show();
		$(".query").text(searchTerm);
	}); // end submit
}); // end ready


	function getRequest(searchTerm) {
		//define parameters for API request
		var api_key = "92e8383ab9545e92aa81ecf132195be5";
		var sort = "relevance";
		var per_page = 18;

		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+ api_key +"&tags=" + searchTerm + "&sort=" + sort + "&per_page=" + per_page + "&format=json&jsoncallback=?";

		$.getJSON(url, function (response){
			showRequest(response);
		}); //end getJSON
	}//end getRequest()


	function showRequest(response) {

		var print = "";

		$.each(response.photos.photo, function(i, photo){
			//variables to store image, link, and title
			var photoImage = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_n.jpg";
			var photoLink = "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
			var photoTitle = photo.title;

			//create li in ul.result for each photo result
			print += "<li class='result'><a href='"+photoLink+"' target='_blank'><img src='"+photoImage+"' alt='"+photoTitle+"'><p class='caption'>"+photoTitle+"</p></a></li>";
		}); //end each

		//print results to HTML
		$(".results").html(print);
	}//end showRequest


//OPTIONAL - create infinite scrolling or "Get more results"
