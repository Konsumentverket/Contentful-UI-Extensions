import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import { Button, TextField } from '@contentful/forma-36-react-components'
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

const App = ({ sdk }) => {
  const [date, setDate] = useState()
  const [isvalidDateMsg, setIsValidDateMsg] = useState()

  useEffect(() => {
    sdk.window.startAutoResizer()
    const storedDate = sdk.field.getValue()
    console.log(storedDate)

    if (storedDate === undefined) {
      const oneYearLater = getOneYearLater()
      sdk.field.setValue(oneYearLater)
      setDate(oneYearLater)
    } else {
      setDate(storedDate)
    }
  }, [])

  return <div className='wrapper'>
    <TextField
      onChange={e => {
        const inputDate = e.target.value
        setDate(e.target.value)
        console.log(isValidDate(inputDate))
        console.log(e.target.value)
        if (isValidDate(inputDate)) {
          sdk.field.setValue(inputDate)
            .then(msg => console.log(msg))
            .catch(e => console.log(e))
          setIsValidDateMsg('')
        } else {
          setIsValidDateMsg('Datumet felaktigt formaterat')
        }
      }}
      id='inputdate'
      name='inputdate'
      value={date}
      validationMessage={isvalidDateMsg}
      labelText='Skriv datum i formatet YYYY-MM-DD'
      className='textfield'
    />
    <Button className='button'
      onClick={() => {
        const oneYearLater = getOneYearLater()

        setDate(oneYearLater)
        setIsValidDateMsg('')
        sdk.field.setValue(getOneYearLater(oneYearLater))
          .then(msg => console.log(msg))
          .catch(e => console.log(e))
      }}
    >Sätt nytt datum ett år senare</Button>
  </div>
}

const getOneYearLater = () => {
  let now = new Date();
  let todayUTC = new Date(Date.UTC(now.getFullYear() + 1, now.getMonth(), now.getDate()))
  return todayUTC.toISOString().slice(0, 10)
}

const isValidDate = dateString => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
