const apiKey = "58a06b838add95f0278a43762325b0b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetails = document.querySelector(".weather .details");
const forecastContainer = document.querySelector(".forecast");

async function checkWeather(city) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".forecast").style.display = "none";
    document.querySelector(".error").style.display = "none";

    // Trim and format the city name
    const formattedCity = city.trim();
    console.log(`Fetching weather for: ${formattedCity}`);

    const response = await fetch(apiUrl + formattedCity + `&appid=${apiKey}`);
    console.log(`API Response Status: ${response.status}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else if (!response.ok) {
        console.error(`API Error: ${response.statusText}`);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log("API Response Data:", data);

        // Current weather data
        const currentWeather = data.list[0];
        document.querySelector(".city").innerHTML = data.city.name;
        document.querySelector(".temp").innerHTML = Math.round(currentWeather.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = currentWeather.main.humidity + "%";
        document.querySelector(".wind").innerHTML = currentWeather.wind.speed + " km/h";

        // Update weather icon
        const weatherMain = currentWeather.weather[0].main.toLowerCase();
        const iconMap = {
            "clouds": "clouds.png",
            "clear": "clear.png",
            "rain": "rain.png",
            "drizzle": "drizzle.png",
            "mist": "mist.png"
        };
        weatherIcon.src = `images/${iconMap[weatherMain] || "clear.png"}`;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".forecast").style.display = "flex";

        // Get 5-day forecast
        const forecastDays = [
            data.list[8],  // Day 1 (24 hours from now)
            data.list[16], // Day 2 (48 hours from now)
            data.list[24], // Day 3 (72 hours from now)
            data.list[32], // Day 4 (96 hours from now)
            data.list[39]  // Day 5 (120 hours from now)
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
    const city = searchBox.value;
    if (city) {
        checkWeather(city);
    }
});
