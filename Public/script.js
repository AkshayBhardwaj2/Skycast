const apiKey = "58a06b838add95f0278a43762325b0b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetails = document.querySelector(".weather .details");
const forecastContainer = document.querySelector(".forecast");

async function checkWeather(city){
	 document.querySelector(".weather").style.display = "none";
    document.querySelector(".forecast").style.display = "none"; // Hide the forecast section
    document.querySelector(".error").style.display = "none";
	
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
        console.log(data);

        // Current weather data
        const currentWeather = data.list[0];  // Get the first item from the forecast data (current weather)
        document.querySelector(".city").innerHTML = data.city.name;
        document.querySelector(".temp").innerHTML = Math.round(currentWeather.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = currentWeather.main.humidity + "%";
        document.querySelector(".wind").innerHTML = currentWeather.wind.speed + " km/h";

        if(currentWeather.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(currentWeather.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(currentWeather.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(currentWeather.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(currentWeather.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
		 document.querySelector(".forecast").style.display = "block";

        // Display 3 day forecast (tomorrow and day after)
        const day1 = data.list[8]; // Next day (weather data for the first time block after 24 hours)
        const day2 = data.list[16]; // The day after tomorrow (48 hours from now)
        
        displayForecast(day1, day2);
    }
}

// Function to display forecast
function displayForecast(day1, day2) {
    forecastContainer.innerHTML = `
        <div class="forecast-day">
            <h3>Tomorrow</h3>
            <img src="images/${day1.weather[0].main.toLowerCase()}.png" alt="weather-icon" class="forecast-icon">
            <p>${Math.round(day1.main.temp)}°C</p>
            <p>${day1.weather[0].main}</p>
        </div>
        <div class="forecast-day">
            <h3>Day After Tomorrow</h3>
            <img src="images/${day2.weather[0].main.toLowerCase()}.png" alt="weather-icon" class="forecast-icon">
            <p>${Math.round(day2.main.temp)}°C</p>
            <p>${day2.weather[0].main}</p>
        </div>
    `;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
