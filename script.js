let map;
let service;
let infowindow;
var selectState = document.querySelector("#selectState");
var selectCampGround = document.querySelector("#selectCampGround");

selectState.addEventListener("change", fetchCampGrounds);

function fetchCampGrounds() {
  var selectStateValue = selectState.value
  console.log(selectStateValue);
 
fetch ("https://developer.nps.gov/api/v1/campgrounds?parkCode=GA&parkCode=GA&stateCode="+selectStateValue+"&limit=10&start=1&api_key=pFVYhxDAvLr1f1KWRD4Vas6nDZ8aoGJf4fm7R8SD")
  .then(function (response){
    console.log(response);
    return response.json()
  }) .then (function (data){
    console.log(data);
    var select = document.createElement("select");
    data.data.forEach(function(item){
    var option = document.createElement("option");
    option.textContent= item.name
   // var lat= item.LatLng.lat
   // var long= item.LatLng.lng
   console.log(item.latLong);
    option.setAttribute("value", JSON.stringify({
      lat:item.latitude, long:item.longitude
    }));
    select.appendChild(option)
    })
    select.addEventListener("change", function (evt){
      handleChooseCampGround(evt.target.value);
    })
    selectCampGround.innerHTML = "";
    selectCampGround.appendChild(select);
  })
}

function handleChooseCampGround(value) {
console.log(value);
console.log(map);
var latLong =JSON.parse(value);
console.log(latLong);
var lat= latLong.lat
var long= latLong.long
console.log(lat);
console.log(long);
initMap(lat, long);
}

function initMap(lat, long) {
  if (!lat || !long) {return}
  const parks = new google.maps.LatLng(lat, long);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: parks,
    zoom: 15,
  });
  /*const request = {
    location: parks,
    //query: "Downtown ATL",
    //fields: ["name", "geometry"],
  };
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  }); */
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

/*
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
var userinput = document.querySelector("#area");
*/

// TEST SECTION


const inputVal = document.getElementsByClassName('inputVal')[0];

 const addTaskBtn = document.getElementsByClassName('btn')[0];
 

addTaskBtn.addEventListener('click', function (){
  
if(inputVal.value.trim()!=0){
       let localItems = JSON.parse( localStorage.getItem('localItem'))
    if(localItems === null){
         taskList = []

    }else{
        taskList = localItems;
    }
    taskList.push(inputVal.value)
    localStorage.setItem('localItem', JSON.stringify(taskList)); 
}

    showItem()
})

function showItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    if(localItems === null){
         taskList = []

    }else{
        taskList = localItems;
    }


let html = '';
let itemShow = document.querySelector('.todoLists');
taskList.forEach((data, index )=> {
    

    html += `
    <div class="todoList">
    <p class="pText">${data}</p>
    <button class="deleteTask" onClick="deleteItem(${index})">x</button>
    </div>
    `
})
itemShow.innerHTML = html;
}
showItem()

function deleteItem(index){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showItem()
}

function clearTask(){
    
localStorage.clear()
showItem()
}