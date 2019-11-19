import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Button } from '@contentful/forma-36-react-components'
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css'
import './index.css'

const App = ({ sdk }) => {
  const defaultLocale = sdk.locales.default
  const space = sdk.space

  const id = sdk.parameters.instance.id
  const metaName = sdk.parameters.instance.metaName

  const [items, setItems] = useState([])
  const [showSelection, setShowSelection] = useState(false)

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
        let storedValues = sdk.field.getValue()
        if (storedValues !== undefined) {
          storedValues = cleanUnusedValues(storedValues, res)
          res = res.map(r => ({
            name: r.name,
            checked: r.checked = storedValues.tags.includes(r.name)
          }))
        }

        setItems(res)
      })
  }, [])

  const cleanUnusedValues = (storedValues, res) => {
    const temp = res.map(r => r.name)
    return {
      metaName: storedValues.metaName,
      tags: storedValues.tags.filter(tag => temp.includes(tag))
    }
  }

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
    console.log(metaName)
    sdk.field.setValue({
      metaName: metaName,
      tags: temp
    })
  }

  return (
    <>
      <Button
        icon='Settings'
        onClick={() => {
          console.log(sdk.field.getValue())
          setShowSelection(callback => !callback)
        }}
      >{showSelection ? 'Stäng Metataggar' : 'Öppna Metataggar'}</Button>
      {showSelection && <div className='wrapper'>
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
      </div>}
    </>
  )
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
})
