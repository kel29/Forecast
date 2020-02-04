import React, { useState } from 'react'
import { Segment } from 'semantic-ui-react'

const SearchAlert = (props) => {
  return (
    <Segment inverted color='red' secondary>
      <h3 id='search-alert'>Unfortunately your didn't turn up any search results. Please double check your search and try again.</h3>
    </Segment>
  )
}

export default SearchAlert
