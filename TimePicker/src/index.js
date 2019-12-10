import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import HourMinutePicker from "./TimePicker";
import { SIGSTKFLT } from 'constants';

const App = ({sdk}) => {

  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();
  const [closedAllDay, setClosedAllDay] = useState(false);

  useEffect(() => {
    sdk.window.startAutoResizer();
    var val = sdk.field.getValue();
    if(val) {
      setOpeningTime(val.openingTime);
      setClosingTime(val.closingTime);
      setClosedAllDay(val.closedAllDay);
    }
  }, [])

  useEffect(() => {
    if(sdk.field.required && !closedAllDay && 
      ((openingTime && closingTime && (openingTime.time == closingTime.time)))) {
      sdk.field.removeValue();
    } else {
    sdk.field.setValue({
      openingTime: openingTime ? openingTime : {type: "opens", time: "00:00"}, 
      closingTime: closingTime ? closingTime : {type: "closes", time: "00:00"},
      closedAllDay: closedAllDay
    })};
    if(!closingTime && !openingTime && !closedAllDay) {
      sdk.field.removeValue();
    }
  }, [openingTime, closingTime, closedAllDay])

  return (
    <>
      <HourMinutePicker value={openingTime} type={"opens"} text={"Öppnar:"} setTime={setOpeningTime} />
      <HourMinutePicker value={closingTime} type={"closes"} text={"Stänger:"} setTime={setClosingTime} />
      <input type="checkbox" id="closedAllDay" checked={closedAllDay} onChange={() => setClosedAllDay(!closedAllDay)}/><label htmlFor="closedAllDay" className="label">Stängt hela dagen</label>
    </>
  );
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
