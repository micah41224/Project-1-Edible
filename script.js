let map;
let service;
let infowindow;

function initMap() {
  const atlanta = new google.maps.LatLng(33.7490, 84.3880);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: atlanta,
    zoom: 15,
  });
  const request = {
    query: "Downtown ATL",
    fields: ["name", "geometry"],
  };
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let  i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

//this is the location finder for the app
function showMyLoc() {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  mapLink.href = '';
  mapLink.textContent = '';
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(longitude);
    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }
  function error() {
    status.textContent = 'Unable to retrieve your location';
  }
  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector('#find-me').addEventListener('click', showMyLoc);