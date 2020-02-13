import React from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'

const MenuNav = (props) => {
  return (
    <Menu borderless>
      <Menu.Item>
        <h1>Forecast</h1>
      </Menu.Item>
      <Menu.Item position='right'>
        <Checkbox slider
          label={props.tempUnit}
          onChange={() => props.handleChangeUnits()}
        />
      </Menu.Item>
      <Menu.Item position='right'>
        <div className='ui category search item'>
          <div className='ui transparent icon input'>
            <input
              type='text'
              name='location'
              placeholder='Search a location'
              value={props.location}
              onChange={e => props.handleSetLocation(e.target.value)}
            />
            <i 
              className='search link icon'
              onClick={() => props.handleGetForecast()}
            />
          </div>
        </div>
      </Menu.Item>
    </Menu>
  )
}

export default MenuNav
