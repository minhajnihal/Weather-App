const API_KEY = "051f6796a24c2402663a0b1d3f212459";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const error = document.getElementById("error");


async function getWeather(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"051f6796a24c2402663a0b1d3f212459"}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    const data = await response.json();

    return data;
}


async function searchWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        error.textContent = "Please enter a city";
        return;
    }

    try {

        loading.style.display = "block";
        error.textContent = "";
        weatherCard.style.display = "none";

        const data = await getWeather(city);

        weatherCard.innerHTML = `
            <h2>📍 ${data.name}</h2>

            <p>🌡️ Temperature: ${Math.round(data.main.temp)}°C</p>

            <p>🤔 Feels Like: ${Math.round(data.main.feels_like)}°C</p>

            <p>☁️ Weather: ${data.weather[0].description}</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p>💨 Wind: ${data.wind.speed} m/s</p>
        `;

        weatherCard.style.display = "block";

    }
    catch (err) {

        error.textContent = err.message;

    }
    finally {

        loading.style.display = "none";

    }
}


searchBtn.addEventListener("click", searchWeather);