import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Checkbox } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);

    this.state = {
      value: props.sdk.field.getValue() || true
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    if (this.props.sdk.field.getValue() === undefined) {
      this.props.sdk.field.setValue(true)
    }
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    console.log("Ext.Changed!", value)
    if (value === undefined) {
      this.setState({ value: true }, () => this.props.sdk.field.setValue(this.state.value));
    } else {
      this.setState({ value });
    }

  };

  onChange = e => {
    console.log("Changed")
    this.setState({ value: !this.state.value }, () => this.props.sdk.field.setValue(this.state.value));
  };

  render() {
    return (<>
      <Checkbox checked={this.state.value} labelText="text" onChange={this.onChange.bind(this)} />
    </>
    );
  }
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
