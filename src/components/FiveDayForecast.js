import React from 'react'

export default ({date, min, max}) => {
  return (
    <div>
        <div className='pl-4'>
            <p className='weather__key'>{date}</p>
            <p className="weather__value">High: {max}</p>
            <p className="weather__value">Low: {min}</p>
        </div>
    </div>
  )
}
