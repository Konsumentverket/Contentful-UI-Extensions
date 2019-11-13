import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Checkbox } from '@contentful/forma-36-react-components'
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css'
import './index.css'
import MicrocopyEdit from './MicrocopyEdit'
import speakingurl from 'speakingurl'

const App = ({ sdk }) => {
  const defaultLocale = sdk.locales.default
  const space = sdk.space

  const [items, setItems] = useState([])
  const [resultArr, setResultArr] = useState([])

  useEffect(() => {
    space.getEntry('Ec918LcMh3UhCvPWE69Tz')
      .then(res =>
        Promise.all(res.fields.subLevel[defaultLocale]
          .map(async field => {
            const entry = await space.getEntry(field.sys.id)
            return {
              name: entry.fields.presentation[defaultLocale],
              checked: false
            }
          })))
      .then(res => {
        console.log(sdk.field.getValue())
        setItems(res)
      })
      .catch(e => console.error(e))
  }, [])

  const updateCheckboxStatus = (item, check) => {
    const temp = items.slice()
    const index = items.findIndex(f => f.name === item.name)
    temp[index].checked = check
    setItems(temp)
  }

  return (
    <div>
      <p>Items</p>
      {items.map((item, i) => (
        <div key={`${item.name} ${i}`}>
          <Checkbox
            labelText={item.name}
            id={item.name}
            checked={item.checked}
            onChange={e => {
              if (item.checked) {
                updateCheckboxStatus(item, false)
              } else {
                updateCheckboxStatus(item, true)
              }
            }}
          />
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
      <button
        onClick={() => console.log(sdk.field.getValue())}
      >getValue</button>
    </div>
  )
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});
