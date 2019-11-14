import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Checkbox } from '@contentful/forma-36-react-components'
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css'
import './index.css'

const App = ({ sdk }) => {
  const defaultLocale = sdk.locales.default
  const space = sdk.space

  const id = sdk.parameters.instance.id
  const metaName = sdk.parameters.instance.metaName

  const [items, setItems] = useState([])

  useEffect(() => {
    sdk.window.startAutoResizer()
    space.getEntry(id)
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
        console.log('stored values')
        console.log(sdk.field.getValue())
        const storedValues = sdk.field.getValue()
        res = res.map(r => ({
          name: r.name,
          checked: r.checked = storedValues.includes(r.name)
        }))

        console.log(res)
        setItems(res)
      })
  }, [])

  const updateCheckboxStatus = (item, check) => {
    const temp = items.slice()
    const index = items.findIndex(f => f.name === item.name)
    temp[index].checked = check
    setItems(temp)
  }

  const saveStatus = () => {
    const temp = items.slice()
      .filter(item => item.checked === true)
      .map(item => item.name)
    console.log('saving')
    console.log(temp)
    sdk.field.setValue(temp)
  }

  return (
    <>
      <div className='wrapper'>
        {items.map((item, i) => (
          <div key={`${item.name} ${i}`} className='item'>
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
                saveStatus()
              }}
            />
            <label htmlFor={item.name} className='label'>{item.name}</label>
          </div>
        ))}
      </div>
      <button
        onClick={() => console.log(sdk.field.getValue())}
      >getValue</button>
    </>
  )
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
})
