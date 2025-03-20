function searchWeather() {
    const apiKey = '45553970554127d197ce454066911b53'; // مفتاح API
    const cityInput = document.getElementById('cityInput').value.trim();
    const weatherReport = document.getElementById('weatherReport');

    if (cityInput === "") {
        weatherReport.style.display = "none";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const cityName = data.name;
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;
            const temperature = data.main.temp.toFixed(1);
            const weatherCondition = data.weather[0].description;
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherReport.innerHTML = `
                <h2>Weather Report for ${cityName}</h2>
                <p><strong>Latitude:</strong> ${latitude}</p>
                <p><strong>Longitude:</strong> ${longitude}</p>
                <img src="${weatherIcon}" alt="${weatherCondition}">
                <p><strong>${temperature}°C</strong> - ${weatherCondition}</p>
            `;

            weatherReport.style.display = "block";
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherReport.innerHTML = '<p style="color: red;">City not found. Please try again.</p>';
            weatherReport.style.display = "block";
        });
}
