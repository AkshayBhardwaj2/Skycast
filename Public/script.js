const apiKey = "58a06b838add95f0278a43762325b0b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const forecastContainer = document.querySelector(".forecast");

async function checkWeather(city) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".forecast").style.display = "none";
    document.querySelector(".error").style.display = "none";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        // Current weather data
        const currentWeather = data.list[0]; 
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
        document.querySelector(".forecast").style.display = "flex";

        // Extract forecast data for the next 5 days
        let forecastDays = [];
        for (let i = 8; i <= 32; i += 8) { 
            forecastDays.push(data.list[i]);
        }

        // Call function to display forecast with actual dates
        displayForecast(forecastDays);
    }
}

// Function to display the 5-day forecast with actual dates
function displayForecast(forecastDays) {
    forecastContainer.innerHTML = ""; 

    // Get today's date
    let today = new Date();

    forecastDays.forEach((day, index) => {
        // Calculate the future date for each forecast day
        let forecastDate = new Date();
        forecastDate.setDate(today.getDate() + (index + 1));

        // Format the date as "4 April"
        let options = { day: "numeric", month: "long" };
        let formattedDate = forecastDate.toLocaleDateString("en-GB", options);

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <h3>${formattedDate}</h3>
                <img src="images/${day.weather[0].main.toLowerCase()}.png" alt="weather-icon" class="forecast-icon">
                <p>${Math.round(day.main.temp)}°C</p>
                <p>${day.weather[0].main}</p>
            </div>
        `;
    });
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
