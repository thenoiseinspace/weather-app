let weather ={
    "apiKey": "7580a995f9e494f6242cd7f55176487d"
    fetchWeather: function(){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7580a995f9e494f6242cd7f55176487d"
        ).then((response) => response.json())
        .then((data) => console.log(data))
    }
}; 

//Note - fetchWeather sbove is not stated properly i think? 
////Note - need to update longitude and latitude in the url

function fiveDayForecast(lat, long){
    fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7580a995f9e494f6242cd7f55176487d" + apiKey)
}

function getWeatherInfo(){
    var city = $("#city-search").val(); 
    fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7580a995f9e494f6242cd7f55176487d" + city + "&units-impereial&appid-" + apikey)
    .then(function (response){
        return response.json(); 
    })
    .then(function (data){
        console.log(data);
        fiveDayForecast; 
    }); 
}

$(#"search-btn").on('click', getWeatherInfo); 
//check the button's actual id, i don;t think this is it