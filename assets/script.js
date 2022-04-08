//Setting up the API key, linking libraries
var apiKey = "7580a995f9e494f6242cd7f55176487d"; 
var today = moment(); 
$('.current-date').text(today.format('L'));
var cityArray = []; 

//Setting up the element for the button, variables 
var saveButtonEl = $('.search-button')
// var city = $('.search-city').val(); 

//     localStorage.setItem("formerCity",  )

//This is the function to retrieve the current weather at the chosen city and also retrieves the lat and log
var getWeatherData = function (){
    //var city = $('.search-city').val(); 
        console.log(city); 
        var city = $('.search-city').val(); 
 
    cityArray.push(city);
    //localStorage.setItem("formerCity", city);
    localStorage.setItem("allCities", cityArray); 

    //document.querySelector('.previous-cities').innerText = cityArray; 

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
                       //var icon = sanitizedData.weather[0].icon; 
                       // console.log("this is icon" , icon); 
                    var todaysWeather = [cityName, temperature, humidity, wind, icon, lat, lon]; 
                    var uvIndex = sanitizedData.main.uvi; 
                         console.log("uv is" , uvIndex);

                    //appending all of the values we just got into the text on the page
                    //Thank you to Travis for walking me through this part in office hours
                    document.querySelector('.current-city').innerText += cityName; 
                    document.querySelector('.main-temp').innerText += temperature + "degrees"; 
                    document.querySelector('.main-wind').innerText += wind + "miles per hour"; 
                    document.querySelector('.main-humidity').innerText += humidity; 

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

                     //main uv
                     document.querySelector('.main-uv').innerText += data.daily[0].uvi;

                     //fetching all the icons from the dom
                     var mainIcon = data.daily[0].weather[0].icon;
                        console.log("i am todays icon" , mainIcon)
                     var day1Icon = data.daily[1].weather[0].icon;
                        console.log("tomorrow icon" , day1Icon)
                     var day2Icon = data.daily[2].weather[0].icon;
                     var day3Icon = data.daily[3].weather[0].icon;
                     var day4Icon = data.daily[4].weather[0].icon;
                     var day5Icon = data.daily[5].weather[0].icon;

                    //setting the icon urls as variables to call later
                     var mainIconImage = "http://openweathermap.org/img/wn/" + mainIcon + "@2x.png";
                        console.log("i am the main icon url" , mainIconImage); 
                     var day1Image = "http://openweathermap.org/img/wn/" + day1Icon + "@2x.png";
                        console.log("i am the day 1 icon" , day1Image);
                     var day2Image ="http://openweathermap.org/img/wn/" + day2Icon + "@2x.png";
                     var day3Image = "http://openweathermap.org/img/wn/" + day3Icon + "@2x.png";
                     var day4Image = "http://openweathermap.org/img/wn/" + day4Icon + "@2x.png";
                     var day5Image = "http://openweathermap.org/img/wn/" + day5Icon + "@2x.png";

                     //adding the newly generated icon images to the html
                    document.querySelector('.main-icon').innerHTML = "<img src=" + mainIconImage + "></img>"; 

                    document.querySelector('.card-icon-1').innerHTML = "<img src=" + day1Image + "></img>";

                    document.querySelector('.card-icon-2').innerHTML = "<img src=" + day2Image + "></img>";

                    document.querySelector('.card-icon-3').innerHTML = "<img src=" + day3Image + "></img>";

                    document.querySelector('.card-icon-4').innerHTML = "<img src=" + day4Image + "></img>";

                    document.querySelector('.card-icon-5').innerHTML = "<img src=" + day5Image + "></img>";

                    //five day forecast cards 
                    //day 1
                     document.querySelector('.card-temp-1').innerText += data.daily[1].temp.day;
                     document.querySelector('.card-wind-1').innerText += data.daily[1].wind_speed;
                     document.querySelector('.card-humidity-1').innerText += data.daily[1].humidity;
                     document.querySelector('.card-uv-1').innerText += data.daily[1].uvi;

                     //day 2
                     document.querySelector('.card-temp-2').innerText += data.daily[2].temp.day;
                     document.querySelector('.card-wind-2').innerText += data.daily[2].wind_speed;
                     document.querySelector('.card-humidity-2').innerText += data.daily[2].humidity;
                     document.querySelector('.card-uv-2').innerText += data.daily[2].uvi;

                     //day 3
                     document.querySelector('.card-temp-3').innerText += data.daily[3].temp.day;
                     document.querySelector('.card-wind-3').innerText += data.daily[3].wind_speed;
                     document.querySelector('.card-humidity-3').innerText += data.daily[3].humidity;
                     document.querySelector('.card-uv-3').innerText += data.daily[3].uvi;

                     //day 4
                     document.querySelector('.card-temp-4').innerText += data.daily[4].temp.day;
                     document.querySelector('.card-wind-4').innerText += data.daily[4].wind_speed;
                     document.querySelector('.card-humidity-4').innerText += data.daily[4].humidity;
                     document.querySelector('.card-uv-4').innerText += data.daily[4].uvi;

                     //day 5
                     document.querySelector('.card-temp-5').innerText += data.daily[5].temp.day;
                     document.querySelector('.card-wind-5').innerText += data.daily[5].wind_speed;
                     document.querySelector('.card-humidity-5').innerText += data.daily[5].humidity;
                     document.querySelector('.card-uv-5').innerText += data.daily[5].uvi;

                    //putting the uv call in this same fetch
                    var uvIndex = data.current.uvi; 
                    console.log(uvIndex);

                    document.querySelector('.uv').innerText = uvIndex; 
                 })
         })
       

         

        }
 
//making it all run on click
saveButtonEl.on('click', getWeatherData)

localStorage.getItem("allCities"); 
document.querySelector('.previous-cities').innerText = cityArray; 


//local storage - set item and get item


