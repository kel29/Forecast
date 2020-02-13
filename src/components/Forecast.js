import React from 'react'
import { Segment } from 'semantic-ui-react'

const Forecast = (props) => {
  return (
    <Segment.Group raised>
      <Segment inverted>
        <h2>Seven Day Weather Forecast</h2>
      </Segment>
      <Segment>
        <iframe
          id="forecast_embed"
          title='Weekly weather forecast'
          frameBorder="0"
          height="250"
          width="100%"
          src={props.weatherSource}
        />
      </Segment>
    </Segment.Group>
  )
}

export default Forecast