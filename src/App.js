import React, { Component } from 'react'
import Titles from "./components/Titles"
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = "f3ad3f95e78b9a4eb515b6f22f6b2ae0"

export default class App extends Component {
  
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    forecast: undefined,
    weatherQueried: false
  }

  getWeather = async (e) => {
    e.preventDefault()
    let city = e.target.elements.city.value
    city = city.replace(' ', '+')
    const country = e.target.elements.country.value
    console.log(city, country)
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`)   
    const data = await api_call.json()
  
    if (city && country){
      const fiveDayForecast = await this.get5DayForecast(city, country)
      console.log(data)

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
        forecast: fiveDayForecast,
        weatherQueried: true
      })
    }else{
      this.setState({
        error: "Please enter valid values"
    })
  }}

  get5DayForecast = async (city, country) => {
    const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=imperial`)
    const data = await api_call2.json()
    return data
  }

  render() {
    return (
        <div className="wrapper">
          <div className="main">
              <div className="row">
                <div className="col-xs-5 col-lg-5 title-container">
                  <Titles />
                </div>
                <div className='col-xs-7 col-lg-7 form-container'>
                  <Form getWeather={this.getWeather}/>
                  {this.state.weatherQueried &&
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    forecast={this.state.forecast}
                  />
                  }
                </div>
            </div>
          </div>
        </div>
    )
  }
}

        