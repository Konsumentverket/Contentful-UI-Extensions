import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { EntryCard, Icon, TextLink, Button } from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';


export class DialogExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      content: []
    }
  }

  componentDidMount() {
    init(api => {
      console.log("Invocation: ", api.parameters.invocation.contentTypes.join(','))
      api.space.getEntries({
        content_type: 'webpage',
        locale: 'sv',
        'fields.contentType.sv[in]': api.parameters.invocation.contentTypes.join(',')
      }).then(result => {
        console.log("Result: ", result)
        this.setState({
          content: result.items
        })
      })
    })
  }



  render() {
    return (
      <div style={{ margin: tokens.spacingM }}>
        <Button
          testId="close-dialog"
          buttonType="muted"
          onClick={() => {
            this.props.sdk.close(this.state.content);
          }}>
          Close modal
        </Button>
      </div>
    );
  }
}

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue() || new Array,
      contentTypes: []
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    init(extension => {

      let page = extension.entry

      if (page.fields.contentType) {
        let contentTypes = this.getAvailableParentContentTypes()
        this.setState({ contentTypes: contentTypes }, () => console.log(this.state.contentTypes))
      }
      else {
        console.log("Could not set content types")
      }
    })
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  getAvailableParentContentTypes() {
    if (this.props.sdk.entry.fields.contentType) {
      let availableContentTypes = this.props.sdk.parameters.instance.hasOwnProperty(this.props.sdk.entry.fields.contentType.getValue())
        ? this.props.sdk.parameters.instance[this.props.sdk.entry.fields.contentType.getValue()].split(',')
        : []
      return availableContentTypes
    }
    return []
  }

  onExternalChange = value => {
    this.setState({ value });
  };

  onMove(fromIndex, toIndex) {
    var newVal = [...this.state.value];
    var element = newVal[fromIndex];
    newVal.splice(fromIndex, 1);
    newVal.splice(toIndex, 0, element);
    this.setState({
      value: newVal
    }, function () {
      this.props.sdk.field.setValue(this.state.value);
    })
  }

  onClick(id) {
    this.props.sdk.navigator.openEntry(id, { slideIn: true })
  }

  async selectParentEntry() {
    /* this.props.sdk.dialogs.selectMultipleEntries({ contentTypes: ["webpage"] }).then(arrayOfSelectedEntries => {
      console.log({ arrayOfSelectedEntries })
      let newState = this.state.value || []
      this.setState({
        value: [...newState, ...arrayOfSelectedEntries]
      }, console.log(this.state.value))
    }) */
    const result = await this.props.sdk.dialogs.openExtension({
      width: 800,
      title: 'The same extension rendered in modal window',
      parameters: { contentTypes: this.state.contentTypes }
    });
    console.log(result);
  }

  render() {
    let self = this
    return (
      <>
        {self.state.value && self.state.value.map(item => {
          return <EntryCard
            key={item.sys.id}
            title="Titel"
            contentType="Innehållstyp"
            withDragHandle={true}
            size="small"
            onClick={self.onClick.bind(self, this.id)}
          />
        })}

        <TextLink onClick={self.selectParentEntry.bind(self)} iconPosition="left" icon="Link">Link parent items</TextLink>
      </>
    );
  }
}

export const initialize = sdk => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    ReactDOM.render(<DialogExtension sdk={sdk} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
  }
};

init(initialize);

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept();
}
