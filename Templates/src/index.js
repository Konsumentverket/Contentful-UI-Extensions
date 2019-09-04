import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput, ValidationMessage } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
// import speakingurl from 'speakingurl'
import './index.css';

class App extends React.Component {
  // static propTypes = {
  //   sdk: PropTypes.object.isRequired,
  // };

  detachExternalChangeHandler = null;
  detachTitleValueChangeHandler = null;
  inputTimeoutDebounce = null

  constructor(props) {
    super(props);
    console.log('wohoo')
    console.log(props)

    this.state = {
      // value: props.sdk.field.getValue(),
      // initialValue: props.sdk.field.getValue(),
      error: null
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  componentWillUnmount() {
  }

  render() {
    return (<>
      <p>hmmm</p>
      {/* <TextInput
        type="text"
        value={this.state.value}
        onChange={this.onChange}
        name="urlslug"
        id="urlslug"
      />
      {this.state.error ? <ValidationMessage>{this.state.error}</ValidationMessage> : null} */}
      </>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});