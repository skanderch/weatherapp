const apiKey = '782211be26ad91a67e3da283e70037c3'; // Replace this with your OpenWeatherMap API key;

const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherOutput = document.getElementById('weather-output');

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while fetching the weather: ', error);
    return null;
  }
}

getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  weatherOutput.textContent = 'Loading...';

  const data = await getWeather(city);

  if (data) {
    weatherOutput.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Description: ${data.weather[0].description}</p>
    `;
  } else {
    weatherOutput.textContent = 'Error: City not found.';
  }
});