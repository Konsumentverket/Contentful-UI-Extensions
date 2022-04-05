import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import regeneratorRuntime from 'regenerator-runtime';

import { createClient } from 'contentful-management';

export const App = ({ sdk }) => {
  const [value, setValue] = useState(sdk.field.getValue() || '');
  const [teams, setTeams] = useState([]);

  const onExternalChange = (value) => {
    setValue(value);
  };

  const onChange = (e) => {
    const value = e.currentTarget.value;
    setValue(value);
    if (value) {
      sdk.field.setValue(value);
    } else {
      sdk.field.removeValue();
    }
  };

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  useEffect(() => {
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    const detatchValueChangeHandler = sdk.field.onValueChanged(onExternalChange);
    return detatchValueChangeHandler;
  });

  useEffect(() => {
    const client = process.env.REACT_APP_ACESS_TOKEN,
    });

    client
      .getSpace(process.env.REACT_APP_SPACE)
      .then((space) => space.getTeams())
      .then((teamsCollection) => setTeams(teamsCollection.items))
      .catch(console.error);
  }, []);

  return (
    <select className="teamSelect" value={value} onChange={onChange}>
      <option value="">Välj ett team</option>
      {teams.map((team) => (
        <option key={team.sys.id} value={team.sys.id}>
          {team.name}
        </option>
      ))}
    </select>
  );
};

App.propTypes = {
  sdk: PropTypes.object.isRequired,
};

init((sdk) => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
