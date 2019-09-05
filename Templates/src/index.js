import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { SelectField, Option, Button } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import Promise from 'bluebird'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      api: props.sdk,
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  componentWillUnmount() {
  }

  getPresetAndReplaceValues () {
    const contentTypeName = this.state.api.contentType.name
    this.state.api.space.getEntries({
      content_type: contentTypeName,
      'query':'[mall]'
    }).then(data => {
      const arr = []
      Object.entries(data.items[0].fields).map(([key, value]) => {
        arr.push({ key: key, value: value})
      })

      return Promise.each(arr, obj => {
        return new Promise((resolve, reject) => {
          const { key, value } = obj
          if (this.state.api.entry.fields[key].getValue() !== undefined) {
              this.showDialog(key)
              .then(result => {
                if (result) {
                  this.state.api.entry.fields[key].setValue(this.removeMallFromString(value['en-US']))
                  console.log('satte nytt varde')
                }
                resolve()
              })
          } else {
            this.state.api.entry.fields[key].setValue(this.removeMallFromString(value['en-US']))
            resolve()
          }
        })
      })
    }).then(data => console.log(data))
    .catch(e => console.log(e))
  }

  showDialog(key) {
    return this.state.api.dialogs.openConfirm({
        title: 'Värdet redan ifyllt för ' + key,
        message: 'Är du säker på att du vill skriva över?',
        intent: 'positive',
        confirmLabel: 'Ja',
        cancelLabel: 'Nej'
      }).then(result => result)
      .catch(e => console.log(e))
  }

  removeMallFromString(str) {
    let strFixed = str.replace('[mall] ', '')
    strFixed = strFixed.replace('[mall]', '')
    return strFixed
  }

  render() {
    return (<>
      <Button
        style={{ marginTop: '15px' }}
        buttonType='primary'
        onClick={() => {
          this.getPresetAndReplaceValues()
        }}
      >Hämta standardvärden</Button>
    </>
    )
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
})