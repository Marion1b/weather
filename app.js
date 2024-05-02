function createLater(day, tempMax, tempMin, weather, toAppend){
    const card = document.createElement('div');
    card.className='card';
    toAppend.appendChild(card);
    const left = document.createElement('div');
    left.className='left-later';
    card.appendChild(left)
    const date = document.createElement('p');
    date.className = "card-date";
    date.innerText = day;
    left.appendChild(date);
    const temperatureMax  = document.createElement('p');
    temperatureMax.innerText = 'max : ' + tempMax + '°';
    temperatureMax.className = "card-temp";
    left.appendChild(temperatureMax);
    const temperatureMin = document.createElement('p');
    temperatureMin.innerText = 'min : ' + tempMin + '°';
    temperatureMin.className = "card-temp";
    left.appendChild(temperatureMin);
    const weatherImg = document.createElement('p');
    weatherImg.innerHTML = weather;
    card.appendChild(weatherImg);
    return card;
}

function caseNight(weatherCode){
    switch(weatherCode){
        case 0:
            return `<img src = "weather-icons-master/production/fill/all/clear-night.svg">`
        case 1:
        case 2:
        case 3:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-night.svg">`
        case 45:
        case 48:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-night-fog.svg">`
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-night-drizzle.svg">`
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-night-rain.svg">`
        case 66:
        case 67:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-night-sleet.svg">`
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-night-snow.svg">`
        case 95:
            return `<img src = "weather-icons-master/production/fill/all/thunderstorms-night.svg">`
        case 96:
        case 99:
            return `<img src = "weather-icons-master/production/fill/all/thunderstorms-night-rain.svg">`
        default:
            return data.current.weather_code;
    }
}

function caseDay(weatherCode){
    switch(weatherCode){
        case 0:
            return `<img src = "weather-icons-master/production/fill/all/clear-day.svg">`
        case 1:
        case 2:
        case 3:
            return `<img src = "weather-icons-master/production/fill/all/partly-cloudy-day.svg">`
        case 45:
        case 48:
            return `<img src = "weather-icons-master/production/fill/all/fog.svg">`
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return `<img src = "weather-icons-master/production/fill/all/drizzle.svg">`
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return `<img src = "weather-icons-master/production/fill/all/rain.svg">`
        case 66:
        case 67:
            return `<img src = "weather-icons-master/production/fill/all/sleet.svg">`
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return `<img src = "weather-icons-master/production/fill/all/snow.svg">`
        case 95:
            return `<img src = "weather-icons-master/production/fill/all/thunderstorms.svg">`
        case 96:
        case 99:
            return `<img src = "weather-icons-master/production/fill/all/thunderstorms-rain.svg">`
        default:
            return data.current.weather_code;
    }
}

async function getWeather(temp, weather, settingRoot, settingContainer, cardContainerToAppend){
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=48.112&longitude=-1.6743&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timezone=Europe%2FBerlin`
    let response = await fetch(apiUrl);
    let data = await response.json();
    if(data.message === "Not Found"){
        return alert('API unfound')
    }else{
        if(data.current.is_day === 0){
            settingRoot.style.setProperty('--main-color', "#0e385e");
            settingRoot.style.setProperty('--box-shadow-1', "#0a2843");
            settingRoot.style.setProperty('--box-shadow-2', "#124879");
            settingContainer.style.color = '#fff';
            weather.innerHTML = caseNight(data.current.weather_code);
        }else{
            settingRoot.style.setProperty('--main-color', "#f0f8ff");
            settingRoot.style.setProperty('--box-shadow-1', "#ccd3d9");
            settingRoot.style.setProperty('--box-shadow-2', "#ffffff");
            settingContainer.style.color = "#000";
            weather.innerHTML = caseDay(data.current.weather_code);
        }
        const tempDemainMax = data.daily.temperature_2m_max[1];
        const tempDemainMin = data.daily.temperature_2m_min[1];
        const weatherDemain = caseDay(data.daily.weather_code[1]);
        const temp2jMax = data.daily.temperature_2m_max[2];
        const temp2jMin = data.daily.temperature_2m_min[2];
        const weather2j = caseDay(data.daily.weather_code[2]);
        const temp3jMax = data.daily.temperature_2m_max[3];
        const temp3jMin = data.daily.temperature_2m_min[3];
        const weather3j = caseDay(data.daily.weather_code[3]);
        createLater('Demain', tempDemainMax, tempDemainMin, weatherDemain, cardContainerToAppend);
        createLater('2 jours', temp2jMax, temp2jMin, weather2j, cardContainerToAppend);
        createLater('3 jours', temp3jMax, temp3jMin, weather3j, cardContainerToAppend);
        console.log(data);
        temp.innerText = data.current.temperature_2m + '°';
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const root = document.documentElement;
    const container = document.querySelector('.container');
    const temperature = document.querySelector('.js-temperature');
    const weatherCode = document.querySelector('.js-weather-code');
    const cardContainer = document.querySelector('.js-card-container');
    getWeather(temperature, weatherCode, root, container, cardContainer);
})