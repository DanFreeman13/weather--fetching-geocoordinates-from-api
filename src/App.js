import React, { Component } from 'react';
import request from 'superagent'
import API_KEY from './components/secret.js';


//onClick={ this.getFranceWeather}

import './App.css';

var index=0;
var nameLoc="";
var dailyInfo = [];

class App extends Component {

  constructor() {
    super();

    this.state = {
      cities: [],
      show: false,
      dailyprops: []
    };
  }

  showInput = () => {
    if (this.state.show === false) {
      this.setState({
        show: true
      });
    }

  }


  addCity = (e) => {

    if (e.keyCode===13) {
      this.setState({
        show: false
      });
      nameLoc = e.currentTarget.value;

      var city = {};
      var coord = {};
      let googleAPIkey = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + nameLoc;

      request
      .get(googleAPIkey)
      .then(response => {
        coord.lati = response.body.results[0].geometry.location.lat;
        coord.long = response.body.results[0].geometry.location.lng;
        city={key: index, name: nameLoc, coords: {lat: coord.lati, lng: coord.long}};

        this.setState({
          cities: [...this.state.cities,city]
        })

        index++;
        nameLoc="";
      });
    }

  }


  getCountryWeather = (e) => {
    e.preventDefault()

    var lati = e.currentTarget.attributes.latitud.nodeValue;
    var long = e.currentTarget.attributes.longitud.nodeValue;

    const API_URL = 'https://api.darksky.net/forecast/'+API_KEY+"/"+lati+","+long;

    var countryName=e.currentTarget.textContent;
    var newprops=[];

    request
    .get(API_URL)
    .then(weather => {
      var zone =  weather.body.timezone;
      var summaryText =  weather.body.currently.summary;
      dailyInfo = []

      {weather.body.daily.data.map(each => {
        dailyInfo=[...dailyInfo,{
          key: dailyInfo.length,
          pressure: each.pressure,
          humidity: each.humidity,
          summary: each.summary,
          mintemp: each.temperatureMin,
          maxtemp: each.temperatureMax,
        }]
          return dailyInfo
        })
      }

      newprops={countryname: countryName, timezone: zone, summary: summaryText};
      this.setState({
        dailyprops: "",
      })

      this.setState({
        dailyprops: newprops,
      })

      console.log(dailyInfo)


    })
  }


  render() {
    return (
      <div className='app'>
        <header className='app__header'>
          <button onClick={ this.showInput } className='app__add'>
            <i className='fa fa-plus-circle' /> New city
          </button>
        </header>
        <div className='grid'>
          <aside className='app__aside'>
            <h1 className='app__title'>All countries</h1>

            <hr />

            {this.state.cities.map(city => {
              return (
              <a onClick={this.getCountryWeather} key={city.key} className='app__country' latitud={city.coords.lat} longitud={city.coords.lng}>{city.name}</a>
            )})
            }

              { this.state.show && <input onKeyUp={ this.addCity } autoFocus type='text' placeholder='Location' className='app__input' /> }

          </aside>

          <div className="dayContainer">
            <section className="header">
              <h1>{this.state.dailyprops.countryname}</h1>
              <h2>{this.state.dailyprops.timezone}</h2>
              <h3>{this.state.dailyprops.summary}</h3>
            </section>

            <div className="dayInfo">
            {dailyInfo.map(each => {
              return (
                <div key={each.key} className="info" >
                <p>{ each.pressure }</p>
                <p>{ each.humidity }</p>
                <p>{ each.summary }</p>
                <p>{ each.mintemp }</p>
                <p>{ each.maxtemp }</p>
                </div>
              )
            })}
            </div>

          </div>


        </div>
      </div>
    );
  }
}

export default App;

// {this.state.dailyprops.daily.map(each => {
//   return(
//     <p>{each.temperatureMax}</p>
//   )
// })}
//
