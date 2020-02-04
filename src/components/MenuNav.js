import React from 'react'
import { Menu } from 'semantic-ui-react'

const MenuNav = (props) => {
  return (
    <Menu borderless>
      <Menu.Item>
        <h1>Forecast</h1>
      </Menu.Item>
      <div className='right item'> 
        <div className='ui slider checkbox'>
          <input
            type='checkbox'
            name='public'
            onChange={() => props.handleChangeUnits()}
          />
          <label>{props.tempUnit}</label>
        </div>
      </div>
      <div className='right item'>
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
      </div>
    </Menu>
  )
}

export default MenuNav
