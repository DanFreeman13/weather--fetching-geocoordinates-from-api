import React, { Component } from 'react';
import request from 'superagent'
import List from './components/listaPaises.js';

//onClick={ this.getFranceWeather}

import './App.css';

var index=0;
var nameLoc="";
var listOfCountries = [];


class App extends Component {

  constructor() {
    super();

    this.state = {
      cities: "",
      show: false
    };
  }

  showInput = () => {
    if (this.state.show === false) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }

  }


  readInput = (e) => {
    nameLoc = e.target.value;
  }

  addCity = (e) => {
    e.preventDefault();
    var city = [];
    var coord = {};
    let googleAPIkey = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + nameLoc;

    request
    .get(googleAPIkey)
    .then(response => {
      coord.lati = response.body.results[0].geometry.location.lat;
      coord.long = response.body.results[0].geometry.location.lng;
      city.push({key: index, name: nameLoc, coords: {lat: coord.lati, lng: coord.long}})

      this.setState({ cities: city });
      listOfCountries.push(this.state.cities[0])

      console.log(this.state)
      console.log(listOfCountries)
      index++;
      nameLoc="";
    });

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

          { this.state.show && <form onSubmit={this.addCity}><input autoFocus type='text' placeholder='Location'
          className='app__input' value={this.state.name} onChange={this.readInput} /></form> }

          {listOfCountries.map(function(city) {
            return (
              <List key={ city.key } data={city} />
              )
            })
          }

        </aside>
        <section className='app__view'>Text</section>
      </div>
      </div>
    );
  }
}

export default App;
