import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select'
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export const App = ({sdk}) => {
  
  const [value,setValue] = useState(sdk.field.getValue() || '')
  const [alloccupations,setAlloccupations] = useState([]);
  useEffect(() => {
    sdk.window.updateHeight(360)

    fetch("https://api.kontaktregistret.kov.se/api/occupation/getalloccupations/2",{
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Accept' : 'application/json',
      }
    })
    .then((response) => response.json())
    .then(json => setAlloccupations(json))

  },)

  const onChange = (selectedOption) => {
    setValue(selectedOption.value);
    sdk.field.setValue(selectedOption.value);
  }

  const arrayUniqueById = [...new Map(alloccupations.map(item =>
    [item["Id"], item])).values()];

  const options = arrayUniqueById.map((m) => {
    return {
      value:m.Id,
      label:m.Name
    }
  })
  const customStyles = {
    menu: (defaultStyle) => ({
      ...defaultStyle,
      // position: "static"
    })
  };

  const selectedOccupation = alloccupations.find(x => x.Id == value);
  const selectedOption = options.find(x => x.value == value);
  return (<div>
    <Select options={options} value={selectedOption} styles={customStyles} isLoading={alloccupations.length == 0} onChange={onChange} />
    {selectedOccupation && <div style={{marginTop:"10px"}}>

      <strong>Vald enhet: <br/>{selectedOccupation.Name}</strong><br/>
      <p>{selectedOccupation.Description}</p>
      <p>Id: {selectedOccupation.Id}</p>
      </div>}
    </div>
  );

};


init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});
