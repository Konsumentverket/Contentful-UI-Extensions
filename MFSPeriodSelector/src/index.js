import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue() || '',
      isOpen: false,
      periods: [],
      url: props.sdk.parameters.instance.url
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    fetch(this.state.url)
      .then(res => res.json())
      .then(res => {
        this.setState({ periods: res })
        console.log(res)
      })
      .catch(e => console.error(e))
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
      <option value="">Hämta senaste</option>
      {this.state.periods.map(item => (
        <option
          selected={this.state.value === item ? true : null}
          key={item}
          value={item}
        >
          {item}
        </option>
      ))}


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
