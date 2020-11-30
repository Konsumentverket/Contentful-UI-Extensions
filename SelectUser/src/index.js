import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

const App = ({ sdk }) => {
  const [users, setUsers] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    sdk.window.startAutoResizer()
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const users = await sdk.space.getUsers()
      const res = users.items.map(user => ({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        id: user.sys.id
      }))
      setUsers(res)
      const value = await sdk.field.getValue()
      setSelectedId(value || null)
    }
    getUsers()
  }, [])

  return <select onChange={e => {
    setSelectedId(e.target.value)
    sdk.field.setValue(e.target.value)
  }}>
    <option value="">Välj en användare</option>
    {users && users.map(user => <option
      key={user.email}
      value={user.id}
      selected={selectedId === user.id}
    >{user.name} {`<${user.email}>`}</option>)}
  </select>
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
