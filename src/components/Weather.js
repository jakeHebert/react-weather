import React from 'react'

const Weather = (props) => {

  return (
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
  )
}

export default Weather;