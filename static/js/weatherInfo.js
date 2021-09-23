function getWeather() {
    // cityList = ["Delhi", "Mumbai", "Kolkata", "Bangalore", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Surat", "Luckknow", "Jaipur", "Indore", "Bhopal", "Patna", "Madurai", "Vellore", "Nellore", "Jammu", "Belgaum", "Jhansi"]

    var cityName = document.getElementById("getWeatherByCity").value;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=f847023ac7fd05f740bd61dc050203fe', {
            method: 'GET'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayData(data);
        })
        .catch(function(err) {
            alert("Something went wrong!!")
        });
}

function getLocation() {
    if (navigator.geolocation) {
        var val = navigator.geolocation.getCurrentPosition(getWeatherForCurrentLocation);
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

function getWeatherForCurrentLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=f847023ac7fd05f740bd61dc050203fe', {
            method: 'GET'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayData(data);
        })
        .catch(function(err) {
            alert("Something went wrong!!")
            console.log("Something went wrong!", err);
        });

}

function displayData(data) {
    var main = document.getElementById('name');
    var temp = document.getElementById('temp');
    var desc = document.getElementById('desc');
    var humidity = document.getElementById('humidity');
    var lat = document.getElementById('lat');
    var lon = document.getElementById('lon');

    var tempValue = data['main']['temp'];
    var nameValue = data['name'];
    var descValue = data['weather'][0]['description'];
    var humidityValue = data['main']['humidity']
    var latValue = data['coord']['lat']
    var lonValue = data['coord']['lon']

    main.innerHTML = nameValue;
    desc.innerHTML = "Description - " + descValue;
    temp.innerHTML = "Temperature - " + tempValue;
    humidity.innerHTML = "Humidity - " + humidityValue
    lat.innerHTML = "Latitude - " + latValue
    lon.innerHTML = "Longitude - " + lonValue
}