var showLoc = document.querySelector("#showLoc")
var 
geo = navigator.geolocation



function getFood() {
  console.log(Food)
}


///this is the location finder for the app
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

  



var userInput = document.querySelector("#area");

  iframe.src.textContent = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAHXkB1ZGsu6wrnXWJ7nFPjel9MDTbh1z4&q="+userInput