import React, {useEffect, useState} from 'react'

const Weather = (props) => {

  const [forecasts, setForecasts] = useState(undefined)

  const findMinMax = () => {
    const listOfForecast = props.forecast.list
    let minMaxes = []
    let days = []
    minMaxes = listOfForecast.map(item =>{
      return {
        date: item.dt_txt.split(" ")[0],
        min: item.main.temp_min,
        max: item.main.temp_max
      }
    })
    const uniqueDays = [...new Set(minMaxes.map(item => item.date))]
    for(let i = 0; i < uniqueDays.length; i++){
      let day = uniqueDays[i]
      let temps = minMaxes.filter(item => item.date === day)
      let dayForecast = {
        date: day,
        min: Math.min(...temps.map(item => item.min)),
        max: Math.max(...temps.map(item => item.max))
      }
      days.push(dayForecast)
    }
    setForecasts(days)
  }

  useEffect(()=>{
    findMinMax()
  }, [])

  return (
    <div className='container'>
      <div className="row">
        <div className="col">
          <div className="weather__info">
            {props.city && props.country && 
              <p>
                <span className="weather__key">Location: </span>
                <span className="weather__value">{props.city}, {props.country}</span>
              </p>}
            {props.temperature && 
              <p>
                <span className="weather__key">Temperature: </span>
                <span className="weather__value">{props.temperature}</span>
              </p>}
            {props.humidity && 
              <p>
                <span className="weather__key">Humidity: </span>
                <span className="weather__value">{props.humidity}</span>
              </p>}
            {props.description && 
              <p>
                <span className="weather__key"> Conditions: </span>
                <span className="weather__value">{props.description}</span>
              </p>}
            {props.error && 
              <p className="weather__error">
                {props.error}
              </p>}
          </div>
        </div>
      </div>
      <div className='row pt-5'>
          {forecasts &&
            forecasts.map((item, index) => 
              <div className='pl-3' key={index}>
                <p className='weather__key'>{item.date}</p>
                <p className="weather__value">High: {item.min}</p>
                <p className="weather__value">Low: {item.max}</p>
              </div>
              )
          }
      </div>
    </div>
  )
}

export default Weather;