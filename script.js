const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');



search.addEventListener('click', () => {
    const APIkey = '207f8edec8fd1c898b00a972bae1e333';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    container.style.height = '400px';
                    weatherBox.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    error.classList.add('active');
                    return;
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            console.log(json); // Add this line to check the structure of the API response

            if (!json || !json.main || !json.weather || json.weather.length === 0 || !json.weather[0].main) {
                console.error('Unexpected data format from the API');
                return;
            }

            container.style.height = '550px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (json && json.main && json.weather && json.weather.length > 0 && json.weather[0].main) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'sun.png';
                        break;
                    case 'Clouds':
                        image.src = 'cloud2.png';
                        break;
                    case 'Rain':
                        image.src = 'rain.png';
                        break;
                    case 'Snow':
                        image.src = 'snow.png';
                        break;
                    default:
                        image.src = 'clouds1.png';
                }
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>&#176;C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
            } else {
                console.error('Unexpected data format from the API');
            }
        })
        .catch(error => console.error('Error fetching or parsing data:', error));
});



