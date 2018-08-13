import React from 'react';
import {Icon} from './Icon';
import {SearchForm} from './SearchForm';

export class WeatherInterfaceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currCity: "",
            currTemp: "",
            iconUrl : ""
        }
        this.getCurrWeatherData = this.getCurrWeatherData.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    getCurrWeatherData(event){
        event.preventDefault();
        let apiKey = "5dc1a6d0183b60c9deeb6b1830b72d84";
        let requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.currCity}&units=imperial&APPID=${apiKey}`;
        fetch(requestUrl).then(response => response.json())
        .then(json => {
            //If code starts with 4, give alert
            if (json.cod[0] === "4"){
                window.alert("City not found!");
                return
            };
            this.setState({
                currTemp: json.main.temp.toFixed(),
                iconUrl: "http://openweathermap.org/img/w/"+json.weather[0].icon+".png",
            });
        }
        ,networkError => {
            console.log(networkError);
        });
    }
    onInputChange(event){
        this.setState({
            currCity: event.target.value
        });
    }
    render(){
        return (
            <div>
                <SearchForm onChange={this.onInputChange} onSearch={this.getCurrWeatherData}/>
                <Icon srcUrl={this.state.iconUrl}/>
                <h1>{this.state.currTemp}</h1>
            </div>
        )    
    }
}