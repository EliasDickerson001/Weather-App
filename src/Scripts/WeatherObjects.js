// Weather information for a single day's weather
export class DailyWeatherStats{
    constructor(forecastArray){
        this._forecast = forecastArray;
    }
    get forecastArray(){
        if (this._forecast) {
            return this._forecast;
        } else {
            return undefined;
        }
    }
    getHighTemp(){
        let temp;
        this._forecast.forEach((foreCastItem, index) => {
            if (index === 0) {
                temp = foreCastItem.main.temp;
            } else {
                if (foreCastItem.main.temp > temp) {
                    temp = foreCastItem.main.temp;
                }
            }
        });
        return Math.round(temp);
    }
    getLowTemp(){
        let temp;
        this._forecast.forEach((foreCastItem, index) => {
            if (index === 0) {
                temp = foreCastItem.main.temp;
            } else {
                if (foreCastItem.main.temp < temp) {
                    temp = foreCastItem.main.temp;
                }
            }
        });
        return Math.round(temp);
    }
    //Return day position of 5 day forecast
    static getForecastPosition(forecastDate){
        let currDayTime = new Date();
        let day = currDayTime.getDay();
        let fcDay = forecastDate.getDay();
        let position = 0;
        if (day === fcDay){
            return position;
        } else {
            while (day !== fcDay){
                if (day >= 6){
                    day = 0;
                    position++;
                } else{
                    day++;
                    position++;
                }
            }
        }
        return position;
    }
    //Retrieves most prominent weather category for given day of 5 day forecast.
    //Returns array, even if only 1 prominent category. Occasionally will be 2 categories with equal forecast.
    getProminentWeather(){
        let date = new Date(this._forecast[0].dt*1000);
        let day = DailyWeatherStats.getForecastPosition(date);
        let weatherCategories = {};
        let catArray;
        this._forecast.forEach((foreCastItem) => {
            let forecastDate = new Date(foreCastItem.dt*1000);
            if (DailyWeatherStats.getForecastPosition(forecastDate) === day) {
                catArray = Object.keys(weatherCategories);
                if (!catArray.includes(foreCastItem.weather[0].main)) {
                    weatherCategories[foreCastItem.weather[0].main] = 1
                } else {
                    weatherCategories[foreCastItem.weather[0].main]++
                }
            }
        });
        let countArray = Object.values(weatherCategories);
        let highestCount = Math.max(...countArray);
        let returnArray = [];
        weatherCategories  = Object.entries(weatherCategories);
        weatherCategories.forEach((weather) => {
            if (weather[1] === highestCount) {
                returnArray.push(weather[0]);
            }
        });
        return returnArray;
    }
    chanceOfRain(){
        let chance = false;
        this._forecast.forEach((foreCastItem) => {
            //Weather prop in JSON returned as array, sometimes contains multiple entries.
            foreCastItem.weather.forEach((weatherItem) => {
                if (weatherItem.main === "Rain") {
                    chance = true;
                }
            });
        });
        return chance;
    }
    getDayOfWeek(){
        //Only need to check date in first array entry, forecast already categorized by date
        let date = new Date(this._forecast[0].dt*1000);
        let dayVal = date.getDay();
        switch (dayVal) {
            case 0:
                return "Sunday";
            case 1:    
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:    
                return "Friday";
            case 6:
                return "Saturday";
            default:
                break;
        }
    }
}