import React, { useState } from 'react';
import './App.css';
import MenuNav from './components/MenuNav'
import { Container, Segment } from 'semantic-ui-react'
import Geocode from 'react-geocode'

function App() {
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState(47.6062)
  const [lng, setLng] = useState(-122.3321)
  const [units, setUnits] = useState('us')
  const [tempUnit, setTempUnit] = useState('Fahrenheit')
  const [weatherSource, setWeatherSource] = useState(`http://forecast.io/embed/#lat=${lat}&lon=${lng}&units=${units}`)
  const [forecastFor, setForecastFor] = useState('Seven day weather forecast')

  const getCoordinates = () => {
    return Geocode.fromAddress(location, process.env.REACT_APP_GOOGLE)
    .then(resp => {
      setLat(resp.results[0].geometry.location.lat)
      setLng(resp.results[0].geometry.location.lng)
    },
    error => console.log(error))
  }

  const getForecast = () => {
    getCoordinates()
    .then(() => {
      setWeatherSource(`http://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=${units}`)
      setForecastFor(`Seven day weather forecast for ${location}`)
    })
  }

  const changeUnits = () => {
    if (tempUnit !== 'Celcius') {
      setUnits('uk')
      setTempUnit('Celcius')
      setWeatherSource(`http://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=uk`)
    } else {
      setUnits('us')
      setTempUnit('Fahrenheit')
      setWeatherSource(`http://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=us`)
    }
  }

  return (
    <>
      <MenuNav
        location={location}
        tempUnit={tempUnit}
        handleSetLocation={setLocation}
        handleGetForecast={getForecast}
        handleChangeUnits={changeUnits}
      />
      <Container>
        <Segment.Group raised>
          <Segment inverted>
            <h2>{forecastFor}</h2>
          </Segment>
          <Segment>
            <iframe
              id="forecast_embed"
              title='Weekly weather forecast'
              frameBorder="0"
              height="275"
              width="100%"
              src={weatherSource}
            />
          </Segment>
        </Segment.Group>
      </Container>
    </>
  )
}

export default App;
