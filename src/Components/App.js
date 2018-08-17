import React from 'react';
import '../Styles/App.css';
import {WeatherInterfaceContainer} from './WeatherInterfaceContainer';
import {YouTubePlayer} from './YouTubePlayer';

let videoID = "QiX0fEgErns";
let videoSpecs = {
  width:"650",
  height:"365",
  loop: true,
  controls: false,
  showInfo: false,
  autoplay: true
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: "",
      country: ""
    }
    this.getCity = this.getCity.bind(this);
  }
  getCity(_city, _country){
    this.setState({
      city: _city,
      country: _country
    })
  }
  videoOverlay(city, country){
    let currentCity = city&&country?<h2>Current City: {city}, {country}</h2>: null;
    return (
      <div>
        <h1>Welcome to <i>Eli's Weather App</i></h1>
        {currentCity}
        <h4 style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>Search for weather in cities below:</h4>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <YouTubePlayer specs={videoSpecs} video={videoID} htmlOverlay={(<div>{this.videoOverlay(this.state.city, this.state.country)}</div>)}/>
        <WeatherInterfaceContainer updateCity={this.getCity}/>
      </div>
    );
  }
}

export default App;
