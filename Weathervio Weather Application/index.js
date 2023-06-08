const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const SpitCelcius=(Kelvin)=>{
    celcius = Math.round(Kelvin-273.15);
    return celcius;
}

const isDaytime=(icon)=>{
    if(icon.includes('d')){
        return true;
    } else {
        return false;
    }
}

updateWeatherApp = (city) => {
    console.log(city);
    const imageName = city.weather[0].icon;
    console.log(imageName);
    const iconSrc = ` http://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
                    <div class="col-8 text-center temp">
                        <span>${SpitCelcius(city.main.temp)}&deg;C</span>
                    </div>
                    <div class="col-4 condition-temp">
                        <p class="condition">${city.weather[0].description}</p>
                        <p class="high">${SpitCelcius(city.main.temp_max)}&deg;C</p>
                        <p class="low">${SpitCelcius(city.main.temp_min)}&deg;C</p>
                    </div>
                </div>

                <div class="icon-container card shadow mx-auto">
                    <img src="${iconSrc}" alt="">
                </div>
             <div class="card-bottom px-5 py-4 row">
                <div class="col text-center">
                    <p>${SpitCelcius(city.main.feels_like)}&deg;</p>
                    <span>Feels Like</span>
                </div>
                <div class="col text-center">
                    <p>${city.main.humidity}%</p>
                    <span>Humidity</span>
                </div>
             </div>
    `;

    if(isDaytime(imageName)){
        console.log('Day')
        timeImage.setAttribute('src','Assets/Img/day_image.svg');
        if(cityName.classList.contains('text-white')){
            cityName.classList.remove('text-white');
        } else{
            cityName.classList.add('text-black');
        }
    } else{
        console.log('Night')
        timeImage.setAttribute('src','Assets/Img/night_image.svg');
        if(cityName.classList.contains('text-black')){
            cityName.classList.remove('text-black');
        } else{
            cityName.classList.add('text-white');
        }
    }

    cardInfo.classList.remove('d-none');
}

//add event listener in form

searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    const citySearched= cityValue.value.trim();
    console.log(citySearched);

    searchForm.reset();

    requestCity(citySearched)
    .then((data)=>{
        updateWeatherApp(data)
    })
    .catch((error)=> {console.log(error)})



})