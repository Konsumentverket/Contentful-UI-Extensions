import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput, ValidationMessage } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import speakingurl from 'speakingurl'
import './index.css';

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };

  detachExternalChangeHandler = null;
  detachTitleValueChangeHandler = null;
  inputTimeoutDebounce = null

  constructor(props) {
    super(props);

    this.state = {
      value: props.sdk.field.getValue(),
      initialValue: props.sdk.field.getValue(),
      error: null
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    let headlineField = this.props.sdk.entry.fields["headline"]

    //if no initial value is set, autogenerate slug based on it
    if (this.state.initialValue == null && headlineField) {
      var titleField = this.props.sdk.entry.fields["headline"]
      this.detachTitleValueChangeHandler = titleField.onValueChanged(
        this.setValue
      );
    }

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
      this.onExternalChange
    );
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
    if (this.detachTitleValueChangeHandler) {
      this.detachTitleValueChangeHandler();
    }
  }
  //custom transformation for swedish diacritics
  slugify = value => speakingurl(value, {
    custom: {
      'Å': "a", 'Ä': "a",
      'Ö': "o", 'å': "a",
      'ä': "a", 'ö': "o",
    }
  })

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

  setValue = value => {
    value = this.slugify(value);
    this.setState({
      value
    });

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
        if (value) {
          this.props.sdk.field.setValue(value);
        } else {
          this.props.sdk.field.removeValue();
        }
      })), 250);
  }


  onExternalChange = value => {
    if (value !== this.state.value && this.inputTimeoutDebounce == null) {
      this.setState({ value });
    }
  };

  onChange = e => {
    this.setValue(e.currentTarget.value)
  };

  render() {
    return (<>
      <TextInput
        type="text"
        value={this.state.value}
        onChange={this.onChange}
        name="urlslug"
        id="urlslug"
      />
      {this.state.error ? <ValidationMessage>{this.state.error}</ValidationMessage> : null}
    </>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});