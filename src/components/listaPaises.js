import React, { Component } from 'react';
import request from 'superagent'
import API_KEY from './secret.js';



class List extends Component {



  getCountryWeather = e => {

    var lati = e.currentTarget.attributes.latitud.nodeValue;
    var long = e.currentTarget.attributes.longitud.nodeValue;

    const API_URL = 'https://api.darksky.net/forecast/'+API_KEY+"/"+lati+","+long;

    console.log(API_URL)

    request
    .get(API_URL)
    .then(response => console.log(response));





  }

  render() {
    return (
      <a onClick={this.getCountryWeather} className='app__country' latitud={this.props.data.coords.lat} longitud={this.props.data.coords.lng}>{this.props.data.name}</a>
    );
  }

}
export default List;
