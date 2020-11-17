import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { DateEditor } from '@contentful/field-editor-date';


const getOneYearLater = () => {
  let now = new Date();
  let todayUTC = new Date(Date.UTC(now.getFullYear() + 1, now.getMonth(), now.getDate()))
  return todayUTC.toISOString().slice(0, 10)
}

const App = ({ sdk }) => {

  useEffect(() => {
    sdk.window.startAutoResizer()
    const storedDate = sdk.field.getValue()
    
    if (storedDate === undefined) {
      sdk.field.setValue(getOneYearLater())
    }
  }, [])

  return <DateEditor
      isInitiallyDisabled={false}
      field={sdk.field}
      parameters={{
          instance: {
            format: 'dateonly'
          }
      }}
    />
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
