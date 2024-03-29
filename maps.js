var map;
function initMap() {
  const styles = {
    default: [],
    hide: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
          {
        featureType: "poi.medical",
        stylers: [{ visibility: "off" }],
      },
              {
        featureType: "poi.place_of_worship",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  var locations = [
    ['Old Post office', 17.69364542889732, 83.29200021177657],
    ['Autonagar', 17.700261683504873, 83.29363395441561],
    ['Purna Market', 17.707948017324185, 83.29716317436036],
    ['Police Barracks', 17.710789771298895, 83.29902344016854],
    ['Jagadamba Circle', 17.71201161438788, 83.30231274869598],
    ['District Court', 17.715398658624913, 83.3039668104703],
    ['GVMC Park Jail Road', 17.722340414926467, 83.30757512661434],
    ['Asilmetta', 17.72483238619613, 83.30857520450377],
    ['Rama Talkies', 17.727941371402572, 83.31146796024944],
    ['HP Petrol Pump', 17.730098321696754, 83.3147339001919],
    ['Maddilapalem Bus Station', 17.736087907316467, 83.32033165068623],
    ['Isakathota', 17.74214227878768, 83.32759712871693],
    ['Venkojipalem', 17.74634343618502, 83.3282777804931],
    ['Hanumanthavaka', 17.754507743792367, 83.331966745749],
    ['VIMS Hospital', 17.756805868557898, 83.32938572200753],
    ['Pedda Gadili Junction', 17.759172484907936, 83.3219097206328],
    ['Ramalingeshwara Swamy Aalayam', 17.760758499283483, 83.31569314066012],
    ['Rama Krishnapuram', 17.766016988592128, 83.28886701551887],
    ['Pineapple Colony', 17.778064291414257, 83.27088399764928],
    ['AP Residential School', 17.781449081955863, 83.25729910252868],
    ['Simhachalam Bus Station', 17.772831183633574, 83.24538608971757],

    // ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    // ['Bondi Beach', -33.890542, 151.274856, 4],
    // ['Coogee Beach', -33.923036, 151.259052, 5],
    // ['Maroubra Beach', -33.950198, 151.259302, 1],
    // ['Cronulla Beach', -34.028249, 151.157507, 3]
  ];



// const selectTest = document.getElementById('end')
// Object.keys(locations).map(key => selectTest.add(new Option(locations[key][0], key)))



  // Map options
  var options = {
    zoom: 15,
    // center:  {lat: 17.7363, lng:83.3205},
    center: new google.maps.LatLng(-33.92, 151.25),
    streetViewControl: false,
    mapTypeControl: false,
    // mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  map = new google.maps.Map(document.getElementById('map'), options);
  map.setOptions({ styles: styles["hide"] });




  var marker, i;
  var request = {
    travelMode: google.maps.TravelMode.DRIVING
  };
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));

    if (i == 0) request.origin = marker.getPosition();
    else if (i == locations.length - 1) request.destination = marker.getPosition();
    else {
      if (!request.waypoints) request.waypoints = [];
      request.waypoints.push({
        location: marker.getPosition(),
        stopover: true
      });
    }

  }





  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({map:map, suppressMarkers: true});
  // var directionsDisplay = new google.maps.DirectionsRenderer;
  // var DirectionsRenderer= new google.maps.DirectionsRenderer({map:map, suppressMarkers: true});

  directionsDisplay.setMap(map);

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });

  // calculateAndDisplayRoute(directionsService, directionsDisplay)





  // adding custom markers
  for(var i=0; i<locations.length; i++){
    addMarker(locations[i])
  }
  // adding custom markers





  // select location details
  // const onChangeHandler = function () {
  //   console.log(document.getElementById("end").value)
  //   console.log('distination selected')
  // };
  // document.getElementById("submit").addEventListener("click", onChangeHandler);
  // select location details




  // geolocation tracking
  // navigator.geolocation.watchPosition( 
  //   (position) => {
  //         console.log(position)
  //         const pos = {
  //           // lat: position.coords.latitude,
  //           // lng: position.coords.longitude,
  //           lat: 17.76544424952842, 
  //           lng: 83.31103435458795
  //         };
  //         infoWindow.setPosition(pos);
  //         infoWindow.setContent("Location found.");
  //         infoWindow.open(map);
  //         map.setCenter(pos);
  //       },
  //       () => {
  //         console.log("Error")
  //         handleLocationError(true, infoWindow, map.getCenter());
  //       }
  //     );
  // geolocation tracking
   





  // current location button
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  // locationButton.textContent = "HERE";
    locationButton.style.backgroundColor = '#fff';
    locationButton.style.border = 'none';
    locationButton.style.outline = 'none';
    locationButton.style.width = '28px';
    locationButton.style.height = '28px';
    locationButton.style.borderRadius = '2px';
    locationButton.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    locationButton.style.cursor = 'pointer';
    locationButton.style.marginRight = '10px';
    locationButton.style.padding = '0px';
    locationButton.title = 'Your Location';
  // locationButton.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
  locationButton.classList.add("custom-map-control-button");



    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    locationButton.appendChild(secondChild);


  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
  locationButton.addEventListener("click", () => {
    // console.log('current location');
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
    // console.log('navigator on');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const pos = {
            // lat: position.coords.latitude,
            // lng: position.coords.longitude,
            lat: 17.76544424952842, 
            lng: 83.31103435458795
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          console.log("Error")
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    // console.log('executed');


    } else {
      console.log("browser doesn't support it")
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  // current location button


}






function addMarker(props){
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(props[1], props[2]),
    map: map,
    animation: google.maps.Animation.DROP,
  });


  if (props.iconImage) {
    marker.setIcon({
      url:props.iconImage,
      scaledSize: new window.google.maps.Size(45,45)
    })
  }else{
     marker.setIcon({
      url:'https://image.flaticon.com/icons/png/512/936/936862.png',
      scaledSize: new window.google.maps.Size(18,18)
    })
  }


  if(props[0]){
    var infoWindow = new google.maps.InfoWindow({
      content: props[0]
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker)
    });
    // window.google.maps.event.addListener(marker, 'click', (function(marker) {
    //   return function() {
    //     infowindow.setContent(props[0]);
    //     infowindow.open(map, marker);
    //   }
    // })(marker));
  }
    


  // if (props.content) {
  //   var infoWindow = new google.maps.InfoWindow({
  //     content: props.content
  //   });

  //   marker.addListener('click', function(){
  //     infoWindow.open(map, marker)
  //   });
  // }
}
// addMarker



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: {lat: 17.727888806365225, lng: 83.31146641826035},
    destination: {lat: 17.693487034044345, lng: 83.29227105679267},
    travelMode: 'DRIVING',
   
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// calculateAndDisplayRoute


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
