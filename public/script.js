"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function weatherWidget() {
    var contentBLock = document.querySelector('.content');
    var input = (contentBLock.querySelector('#name__of-city'));
    var resetInput = (contentBLock.querySelector('.reset-value'));
    var weatherBlock = contentBLock.querySelector('.weather');
    var weekWeatherBlock = (contentBLock.querySelector('.week-weather'));
    var selectedCity = (contentBLock.querySelector('.city-name'));
    var cityName;
    function getLocation() {
        function coordinates(position) {
            return __awaiter(this, void 0, void 0, function () {
                var lat, lon, location, getLocation, getCity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lat = position.coords.latitude;
                            lon = position.coords.longitude;
                            location = "http://api.openweathermap.org/geo/1.0/reverse?lat=".concat(lat, "8&lon=").concat(lon, "&limit=5&appid=d19dadd189b257742710fa794253f0ff");
                            return [4 /*yield*/, fetch(location, {
                                    method: 'GET',
                                })];
                        case 1:
                            getLocation = _a.sent();
                            return [4 /*yield*/, getLocation.json()];
                        case 2:
                            getCity = _a.sent();
                            loadTodaysWeather(getCity[0].name);
                            loadWeekWeather(getCity[0].name);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function error() {
            weatherBlock.innerHTML = "\n                <div class=\"error\">\n                    <span>Access is denied</span>\n                </div>\n            ";
        }
        navigator.geolocation.getCurrentPosition(coordinates, error);
    }
    getLocation();
    function loadTodaysWeather(value) {
        return __awaiter(this, void 0, void 0, function () {
            function getTodaysWeather(data) {
                var location = data.name;
                var temp = Math.round(data.main.temp - 273);
                var feelsLike = Math.round(data.main.feels_like - 273);
                var weatherStatus = data.weather[0].main;
                var weatherIcon = data.weather[0].icon;
                var country = data.sys.country;
                var template = "\n                <div class=\"todays-weather\">\n                    <div class=\"degrees\">\n                        <span class=\"main-temperature\">".concat(temp, "&deg;C</span>\n                        <span class=\"feels-like\">Feels like ").concat(feelsLike, "&deg;C</span>\n                    </div>\n                    <div class=\"weather-status\">\n                        <span>").concat(weatherStatus, "</span>\n                        <span class=\"city-name\">").concat(location, "</span>\n                    </div>\n                        <img src=\"https://openweathermap.org/img/w/").concat(weatherIcon, ".png\" alt=\"").concat(weatherStatus, "\">\n                </div>\n            ");
                selectedCity.innerHTML = "".concat(location, ", ").concat(country);
                weatherBlock.innerHTML = template;
            }
            var serverTodays, responseTodays, responseResultTodays;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serverTodays = "https://api.openweathermap.org/data/2.5/weather?&q=".concat(value, "&appid=d19dadd189b257742710fa794253f0ff");
                        return [4 /*yield*/, fetch(serverTodays, {
                                method: 'GET',
                            })];
                    case 1:
                        responseTodays = _a.sent();
                        return [4 /*yield*/, responseTodays.json()];
                    case 2:
                        responseResultTodays = _a.sent();
                        if (responseTodays.ok) {
                            getTodaysWeather(responseResultTodays);
                        }
                        else {
                            weatherBlock.innerHTML = "\n                <div class=\"error\">\n                    <span>Please enter a valid city name</span>\n                </div>\n            ";
                            weekWeatherBlock.innerHTML = '';
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function loadWeekWeather(value) {
        return __awaiter(this, void 0, void 0, function () {
            var serverWeek, responseWeek, responseResultWeek;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serverWeek = "https://api.openweathermap.org/data/2.5/forecast?&q=".concat(value, "&appid=d19dadd189b257742710fa794253f0ff");
                        return [4 /*yield*/, fetch(serverWeek, {
                                method: 'GET',
                            })];
                    case 1:
                        responseWeek = _a.sent();
                        return [4 /*yield*/, responseWeek.json()];
                    case 2:
                        responseResultWeek = _a.sent();
                        if (responseWeek.ok) {
                            getWeekWeather(responseResultWeek);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function getWeekWeather(data) {
        function getWeekDay(date) {
            var daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SUT'];
            return daysOfWeek[date.getDay()];
        }
        var template = '';
        data.list.forEach(function (item, index) {
            var _a;
            var spliceData = (_a = item.dt_txt) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
            var temp = Math.round(item.main.temp - 273);
            var feelsLike = Math.round(item.main.feels_like - 273);
            var weatherStatus = item.weather[0].main;
            var weatherIcon = item.weather[0].icon;
            var date = new Date(spliceData);
            if (index % 8 === 0) {
                template += "\n                    <div class=\"next-day-weather\">\n                        <div class=\"day-of-week\">\n                            <span >".concat(getWeekDay(date), "</span>\n                        </div>\n                        <div class=\"icon\">\n                            <img src=\"https://openweathermap.org/img/w/").concat(weatherIcon, ".png\" alt=\"light rain\">\n                        </div>\n                        <div class=\"weather-status\">\n                            <span>").concat(weatherStatus, "</span>\n                        </div>\n                        <div class=\"degrees\">\n                            <span class=\"main-temperature\">").concat(temp, "&deg;C</span>\n                            <span class=\"feels-like\">").concat(feelsLike, "&deg;C</span>\n                        </div>\n                    </div>\n                ");
            }
        });
        weekWeatherBlock.innerHTML = template;
    }
    input &&
        input.addEventListener('change', function () {
            cityName = input.value;
            loadTodaysWeather(cityName);
            loadWeekWeather(cityName);
        });
    resetInput &&
        resetInput.addEventListener('click', function () { return (input.value = ''); });
}
weatherWidget();
