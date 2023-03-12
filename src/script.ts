interface weekDataProps {
    list: dataProps[];
}

interface positionProps {
    coords: CoordsProps;
}

interface dataProps {
    name: string;
    main: MainProps;
    weather: WatherProps[];
    sys: SysProps;
    dt_txt?: string;
}

type CoordsProps = {
    latitude: number;
    longitude: number;
};

type MainProps = {
    temp: number;
    feels_like: number;
};

type WatherProps = {
    main: string;
    icon: string;
};

type SysProps = {
    country: string;
};
function weatherWidget() {
    const contentBLock = <HTMLDivElement>document.querySelector('.content');
    const input = <HTMLInputElement>(
        contentBLock.querySelector('#name__of-city')
    );
    const resetInput = <HTMLButtonElement>(
        contentBLock.querySelector('.reset-value')
    );
    const weatherBlock = <HTMLDivElement>contentBLock.querySelector('.weather');
    const weekWeatherBlock = <HTMLDivElement>(
        contentBLock.querySelector('.week-weather')
    );
    const selectedCity = <HTMLSpanElement>(
        contentBLock.querySelector('.city-name')
    );

    let cityName: string;

    function getLocation() {
        async function coordinates(position: positionProps) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const location = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}8&lon=${lon}&limit=5&appid=d19dadd189b257742710fa794253f0ff`;
            const getLocation = await fetch(location, {
                method: 'GET',
            });

            const getCity = await getLocation.json();
            loadTodaysWeather(getCity[0].name);
            loadWeekWeather(getCity[0].name);
        }

        function error() {
            weatherBlock.innerHTML = `
                <div class="error">
                    <span>Access is denied</span>
                </div>
            `;
        }
        navigator.geolocation.getCurrentPosition(coordinates, error);
    }
    getLocation();

    async function loadTodaysWeather(value: string) {
        const serverTodays = `https://api.openweathermap.org/data/2.5/weather?&q=${value}&appid=d19dadd189b257742710fa794253f0ff`;
        const responseTodays = await fetch(serverTodays, {
            method: 'GET',
        });
        const responseResultTodays = await responseTodays.json();

        if (responseTodays.ok) {
            getTodaysWeather(responseResultTodays);
        } else {
            weatherBlock.innerHTML = `
                <div class="error">
                    <span>Please enter a valid city name</span>
                </div>
            `;
            weekWeatherBlock.innerHTML = '';
        }

        function getTodaysWeather(data: dataProps) {
            const location = data.name;
            const temp = Math.round(data.main.temp - 273);
            const feelsLike = Math.round(data.main.feels_like - 273);
            const weatherStatus = data.weather[0].main;
            const weatherIcon = data.weather[0].icon;
            const country = data.sys.country;

            const template = `
                <div class="todays-weather">
                    <div class="degrees">
                        <span class="main-temperature">${temp}&deg;C</span>
                        <span class="feels-like">Feels like ${feelsLike}&deg;C</span>
                    </div>
                    <div class="weather-status">
                        <span>${weatherStatus}</span>
                        <span class="city-name">${location}</span>
                    </div>
                        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
                </div>
            `;

            selectedCity.innerHTML = `${location}, ${country}`;
            weatherBlock.innerHTML = template;
        }
    }

    async function loadWeekWeather(value: string) {
        const serverWeek = `https://api.openweathermap.org/data/2.5/forecast?&q=${value}&appid=d19dadd189b257742710fa794253f0ff`;

        const responseWeek = await fetch(serverWeek, {
            method: 'GET',
        });
        const responseResultWeek = await responseWeek.json();

        if (responseWeek.ok) {
            getWeekWeather(responseResultWeek);
        }
    }

    function getWeekWeather(data: weekDataProps) {
        function getWeekDay(date: Date) {
            let daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SUT'];
            return daysOfWeek[date.getDay()];
        }

        let template = '';

        data.list.forEach((item, index: number) => {
            const spliceData = item.dt_txt?.split(' ')[0];
            const temp = Math.round(item.main.temp - 273);
            const feelsLike = Math.round(item.main.feels_like - 273);
            const weatherStatus = item.weather[0].main;
            const weatherIcon = item.weather[0].icon;
            const date = new Date(spliceData!);

            if (index % 8 === 0) {
                template += `
                    <div class="next-day-weather">
                        <div class="day-of-week">
                            <span >${getWeekDay(date)}</span>
                        </div>
                        <div class="icon">
                            <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="light rain">
                        </div>
                        <div class="weather-status">
                            <span>${weatherStatus}</span>
                        </div>
                        <div class="degrees">
                            <span class="main-temperature">${temp}&deg;C</span>
                            <span class="feels-like">${feelsLike}&deg;C</span>
                        </div>
                    </div>
                `;
            }
        });
        weekWeatherBlock.innerHTML = template;
    }

    input &&
        input.addEventListener('change', () => {
            cityName = input.value;
            loadTodaysWeather(cityName);
            loadWeekWeather(cityName);
        });

    resetInput &&
        resetInput.addEventListener('click', () => (input.value = ''));
}

weatherWidget();
