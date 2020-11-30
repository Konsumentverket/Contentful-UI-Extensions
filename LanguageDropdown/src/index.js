import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

const supportedLangs = {
  en: "Engelska",
  ar: "Arabiska",
  es: "Spanska",
  fi: "Finska",
  pl: "Polska",
  bs: "Bosniska/Kroatiska/Serbiska",
  ku: "Nordkurdiska (Kurmanchî)",
  so: "Somaliska",
  fa: "Persiska",
  ckb: "Centralkurdiska (sorani)",
  ti: "Tigrinska",
  yi: "Jiddisch",
  fiu: "Meänkieli",
  rom: "Romska",
  se: "Samiska"
}

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
    
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue() || '',
      isOpen: false
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    this.setState({ value });
  };

  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  render() {
    return <select onChange={this.onChange.bind(this)}>
      <option value="">Välj ett språk</option>
      { Object.keys(supportedLangs).map(x => <option selected={this.state.value == x ? true : null} key={x} value={x}>{supportedLangs[x]}</option>) }

    </select>
    
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
