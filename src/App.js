import React, { useState, useEffect } from 'react';
import './App.css';
import MenuNav from './components/MenuNav'
import SearchAlert from './components/SearchAlert'
import { Container, Segment } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import Geocode from 'react-geocode'
import Forecast from './components/Forecast';

function App() {
  const [location, setLocation] = useState('Seattle')
  const [lat, setLat] = useState(47.6062)
  const [lng, setLng] = useState(-122.3321)
  const [units, setUnits] = useState('us')
  const [tempUnit, setTempUnit] = useState('Fahrenheit')
  const [weatherSource, setWeatherSource] = useState(`https://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=${units}`)
  const [searchError, setSearchError] = useState(false)

  useEffect(() => {
    geolocateUser()
  }, [])

  const getCoordinates = () => {
    return Geocode.fromAddress(location, process.env.REACT_APP_GOOGLE)
    .then(resp => {
      setLat(resp.results[0].geometry.location.lat)
      setLng(resp.results[0].geometry.location.lng)
      setSearchError(false)
    })
    .catch(error => setSearchError(true))
  }

  const geolocateUser = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      setLat(lat)
      setLng(lng)
      Geocode.fromLatLng(lat, lng, process.env.REACT_APP_GOOGLE).then(resp => {
        setLocation(resp.results[0].formatted_address)
      })
      .then(() => setWeatherSource(`https://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=${units}`))
    })
  }

  const getForecast = () => {
    getCoordinates()
    .then(() => {
      setWeatherSource(`https://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=${units}`)
    })
  }

  const changeUnits = () => {
    if (tempUnit !== 'Celcius') {
      setUnits('uk')
      setTempUnit('Celcius')
      setWeatherSource(`https://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=uk`)
    } else {
      setUnits('us')
      setTempUnit('Fahrenheit')
      setWeatherSource(`https://forecast.io/embed/#lat=${lat}&lon=${lng}&name=${location}&units=us`)
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
        {searchError ? <SearchAlert /> : <Forecast weatherSource={weatherSource} />}
      </Container>
    </>
  )
}

export default App;
