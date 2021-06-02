var mylating = {lat:38.3460, lng: -0.4907};
var mapOptions = {
	center: mylating,
	zoom: 7,
	// mapTypeId: window.google.maps.MapTypeId.ROADMAP
};


// create MapTypeId

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)


