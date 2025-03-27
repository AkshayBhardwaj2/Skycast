const apiKey = "58a06b838add95f0278a43762325b0b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetails = document.querySelector(".weather .details");
const forecastContainer = document.querySelector(".forecast");

async function checkWeather(city) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".forecast").style.display = "none"; // Hide the forecast section
    document.querySelector(".error").style.display = "none";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);

        // Current weather data
        const currentWeather = data.list[0]; // Get the first item from the forecast data (current weather)
        document.querySelector(".city").innerHTML = data.city.name;
        document.querySelector(".temp").innerHTML = Math.round(currentWeather.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = currentWeather.main.humidity + "%";
        document.querySelector(".wind").innerHTML = currentWeather.wind.speed + " km/h";

        if (currentWeather.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (currentWeather.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (currentWeather.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (currentWeather.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (currentWeather.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".forecast").style.display = "flex";

        // Get 5-day forecast (data.list contains 3-hour intervals, 8 intervals = 1 day)
        const forecastDays = [
            data.list[8],  // Day 1 (24 hours from now)
            data.list[16], // Day 2 (48 hours from now)
            data.list[24], // Day 3 (72 hours from now)
            data.list[32], // Day 4 (96 hours from now)
            data.list[39]  // Day 5 (120 hours from now, last available in 5-day forecast)
        ];

        displayForecast(forecastDays);
    }
}

// Function to display 5-day forecast
function displayForecast(forecastDays) {
    const dayNames = ["Tomorrow", "Day 2", "Day 3", "Day 4", "Day 5"];
    forecastContainer.innerHTML = forecastDays.map((day, index) => `
        <div class="forecast-day">
            <h3>${dayNames[index]}</h3>
            <img src="images/${day.weather[0].main.toLowerCase()}.png" alt="weather-icon" class="forecast-icon">
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].main}</p>
        </div>
    `).join('');
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
