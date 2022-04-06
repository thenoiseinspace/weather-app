//Hello and welcome to my code that does not work! :D I took as much of Travis' time in office hours as I could--it still doesn't work! :D I worked on this with my tutor--it still doesn't work! :D I spent countless hours working on this with the study group, who tried valiently to fix it--it still doesn't work! :D I did learn that you can get javascript errors even on lines that are commented out, so that's something. 

//So now, this has become something else entirely. You thought this was a weather app? Oh, no, my friend. This is something far better--it's a fun game, AND there's a prize! If you can find the issue and explain it to me in a way I'll understand, I'll bake you an extremely delicious cake. 

//Setting up the API key and the initial city
var apiKey = "7580a995f9e494f6242cd7f55176487d"; 
//var city = document.getElementById("search-city");

//Setting up moment to get the dates
var today = moment(); 
$('.current-date').text(today.format('L'));

//Setting up the element for the button
var saveButtonEl = $('.search-button')

//This is the function to retrieve the current weather at the chosen city and also retrieves the lat and log
function getWeatherData(){
    var city = $('.search-city').val(); 
        console.log(city); 
    var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

    console.log(requestURL); //adding these at every single step to see if it's working
    
    //two fetch requests for same function
    fetch(requestURL).then(function(response){
            console.log("the first fetch is connected") //no literally every step
            console.log(response)
            return response.json() 
        }).then(function(sanitizedData){  //calling the json-ified data "sanitized"
            console.log(sanitizedData);
       
            var lat = sanitizedData.coord.lat;
            var lon = sanitizedData.coord.lon; 
            //console.log("lat is", lat); 
            //console.log(lon); 

                        //set these to text content, not variables 
                        //going through the nodes of the dom to find location
                    var cityName = sanitizedData.name;
                    var temperature = sanitizedData.main.temp; 
                        //console.log(temperature); 
                    var humidity = sanitizedData.main.humidity; 
                        //console.log(humidity);
                    var wind = JSON.stringify(sanitizedData.wind.speed); 
                       // console.log("this is wind" + wind);
                       // console.log("this is sanitized", sanitizedData); 
                    var icon = sanitizedData.weather[0].icon; 
                       // console.log("this is icon" , icon); 
                    var todaysWeather = [cityName, temperature, humidity, wind, icon, lat, lon]

                    //console.log(todaysWeather); 

                    //appending all of the values we just got into the text on the page
                    //Thank you to Travis for walking me through this part in office hours
                    document.querySelector('.current-city').innerText += cityName; 
                    document.querySelector('.main-temp').innerText += temperature + "degrees"; 
                    document.querySelector('.main-wind').innerText += wind + "miles per hour"; 
                    document.querySelector('.main-humidity').innerText += humidity; 
                   // document.querySelector('.icon').innerHTML = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                   //look up how to append an image iin js
                    
                    // var uvIndex = sanitizedData.main.uvi; 
                    //     console.log(uvIndex);
                    //var weatherIcon = sanitizedData.current.weather[0].icon; 
                        //console.log(weatherIcon);

            var secondURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apiKey

                console.log("this is second URL", secondURL); 

            //second fetch request
            //I'm nesting both fetch requests in the same function so they can use the same data
            fetch(
                secondURL).then(function(secondFetchResponse){
                    console.log("the second fetch is connected")
                    console.log(secondFetchResponse)
                    return secondFetchResponse.json()
                 }).then(function(data){
                     console.log(" :)" , data)

                     //path is data.daily.[day number in arrar/index, start at 1]

                     //setting up all the query selectors for every single card. Is there a more efficient way to do this with a loop? Probably! But I can't figure that out right now, so I'm doing a method that I know will work. 

                     //day 1
                     document.querySelector('.card-temp-1').innerText += data.daily[1].temp.day;
                     document.querySelector('.card-wind-1').innerText += data.daily[1].wind_speed;
                     document.querySelector('.card-humidity-1').innerText += data.daily[1].humidity;


                     //day 2
                     document.querySelector('.card-temp-2').innerText += data.daily[2].temp.day;
                     document.querySelector('.card-wind-2').innerText += data.daily[2].wind_speed;
                     document.querySelector('.card-humidity-2').innerText += data.daily[2].humidity;

                     //day 3
                     document.querySelector('.card-temp-3').innerText += data.daily[3].temp.day;
                     document.querySelector('.card-wind-3').innerText += data.daily[3].wind_speed;
                     document.querySelector('.card-humidity-3').innerText += data.daily[3].humidity;


                     //day 4
                     document.querySelector('.card-temp-4').innerText += data.daily[4].temp.day;
                     document.querySelector('.card-wind-4').innerText += data.daily[4].wind_speed;
                     document.querySelector('.card-humidity-4').innerText += data.daily[4].humidity;

                     //day 5
                     document.querySelector('.card-temp-5').innerText += data.daily[5].temp.day;
                     document.querySelector('.card-wind-5').innerText += data.daily[5].wind_speed;
                     document.querySelector('.card-humidity-5').innerText += data.daily[5].humidity;

                    //putting the uv call in this same fetch
                    //this homework is very nested in on itself. I don't like it. Gotdang Hapsburg family tree over here. 

                    var uvIndex = data.current.uvi; 
                    console.log(uvIndex);

                    document.querySelector('.uv').innerText = uvIndex; 


                 })
        
         })
        }
 

//making it all run on click
saveButtonEl.on('click', getWeatherData)
