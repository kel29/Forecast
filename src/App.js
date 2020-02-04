import React, { useState } from 'react';
import './App.css';
import { Container, Form, Button, Segment, Grid } from 'semantic-ui-react'
import Geocode from 'react-geocode'
import DailyWeather from './components/DailyWeather'
import HourlyWeather from './components/HourlyWeather'

function App() {
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState(47.6062)
  const [lng, setLng] = useState(122.3321)

  const fetchWeather = () => {
    return fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY}/${lat},${lng}`)
    .then(resp => resp.json())
    .then(console.log)
  }

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
    .then(() => fetchWeather())
  }

  return (
    <Container>
      <h1>Forecast</h1>
      <Segment>
        <Form onSubmit={() => getForecast()}>
          <label>Location</label>
          <input
            type='text'
            name='location'
            placeholder='Enter a location i.e. Seattle'
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
      <Segment>
        <h2>Hourly weather forcast:</h2>
        <Container>
          <Grid>
            <HourlyWeather />
          </Grid>
        </Container>
      </Segment>
      <Segment>
        <h2>Seven day weather forcast:</h2>
        <Container>
          <Grid>
            <DailyWeather />
          </Grid>
        </Container>
      </Segment>
    </Container>
  );
}

export default App;
