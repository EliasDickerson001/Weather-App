// import React, { Component } from 'react';
import React from 'react';
import logo from '../Styles/logo.svg';
import '../Styles/App.css';
import {WeatherInterfaceContainer} from './WeatherInterfaceContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <WeatherInterfaceContainer/>
      </div>
    );
  }
}

export default App;
