import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput, ValidationMessage } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };

  detachExternalChangeHandler = null;
  inputTimeoutDebounce = null

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue(),
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
      this.onExternalChange
    );
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

    this.setState({
      value
    });

    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }

    this.inputTimeoutDebounce = clearTimeout(this.inputTimeoutDebounce);
    this.inputTimeoutDebounce = setTimeout(() => (this.validateUniqueness(value)
      .then(hasDuplicates => {
        if (hasDuplicates) {
          this.setState({
            error: "Det finns redan ett innehåll med detta url-segment!",
          });
          this.props.sdk.field.setInvalid(true);
          return;
        }
        this.props.sdk.field.setInvalid(false);
        this.setState({
          error: null
        });
      })), 250);
  };

  validateUniqueness = value => {
    var query = {}
    query['content_type'] = this.props.sdk.entry.getSys().contentType.sys.id
    query['fields.' + this.props.sdk.field.id] = value
    query['sys.id[ne]'] = this.props.sdk.entry.getSys().id
    query['sys.publishedAt[exists]'] = true
    return this.props.sdk.space.getEntries(query).then(function (result) {
      if (!value) return false;
      return result.total > 0
    })
  }

  render() {
    return (
      <>
        <TextInput
          width="large"
          type="text"
          id="incoming"
          value={this.state.value}
          onChange={this.onChange}
        />
        {this.state.error ? <ValidationMessage>{this.state.error}</ValidationMessage> : null}
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
