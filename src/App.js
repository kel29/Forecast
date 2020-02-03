import React, { useState } from 'react';
import './App.css';
import { Container, Form, Button } from 'semantic-ui-react'
import Geocode from 'react-geocode'

function App() {
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState(47.6062)
  const [lng, setLng] = useState(122.3321)

  const fetchWeather = () => {
    fetch(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}`)
    .then(resp => resp.json())
    .then(console.log)
  }

  const getCoordinates = () => {
    return Geocode.fromAddress(location, GOOGLE_API_KEY)
    .then(resp => {
      setLat(resp.results[0].geometry.location.lat)
      setLng(resp.results[0].geometry.location.lng)
      console.log(lat, lng)
    },
    error => console.log(error))
  }
  const getForecast = () => {
    getCoordinates()
    .then(() => fetchWeather())
  }

  return (
    <Container>
      <h1>Forecast</h1>
    <Form onSubmit={() => getForecast()}>
      <label>Location</label>
      <input
        type='text'
        name='location'
        placeholder='Enter a location ie. Seattle'
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <Button type='submit'>Submit</Button>
    </Form>
    </Container>
  );
}

export default App;
