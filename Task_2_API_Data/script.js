async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const message = document.getElementById("message");
    const weather = document.getElementById("weather");

    if (city === "") {
        message.textContent = "Please enter a city name.";
        weather.classList.add("hidden");
        return;
    }

    message.textContent = "Loading weather...";
    weather.classList.add("hidden");

    try {

        // Find city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];

        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
        );

        const data = await weatherResponse.json();
        const current = data.current;

        document.getElementById("cityName").textContent =
            `${location.name}, ${location.country}`;

        document.getElementById("temperature").textContent =
            Math.round(current.temperature_2m);

        document.getElementById("feelsLike").textContent =
            `${Math.round(current.apparent_temperature)}°C`;

        document.getElementById("humidity").textContent =
            `${current.relative_humidity_2m}%`;

        document.getElementById("wind").textContent =
            `${current.wind_speed_10m} km/h`;

        const weatherInfo = getWeatherInfo(current.weather_code);

        document.getElementById("condition").textContent =
            weatherInfo.text;

        document.getElementById("weatherIcon").textContent =
            weatherInfo.icon;

        message.textContent = "";

        weather.classList.remove("hidden");

    } catch (error) {

        message.textContent =
            "Unable to find weather data. Please check the city name.";

        weather.classList.add("hidden");
    }
}


function getWeatherInfo(code) {

    if (code === 0) {
        return { text: "Clear Sky", icon: "☀️" };
    }

    if (code <= 3) {
        return { text: "Partly Cloudy", icon: "⛅" };
    }

    if (code >= 51 && code <= 67) {
        return { text: "Rainy", icon: "🌧️" };
    }

    if (code >= 71 && code <= 77) {
        return { text: "Snowy", icon: "❄️" };
    }

    if (code >= 80 && code <= 82) {
        return { text: "Rain Showers", icon: "🌦️" };
    }

    if (code >= 95) {
        return { text: "Thunderstorm", icon: "⛈️" };
    }

    return { text: "Cloudy", icon: "☁️" };
}