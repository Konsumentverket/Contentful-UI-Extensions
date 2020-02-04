import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { EntryCard, Icon, TextLink, Button, TextInput, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import Dragable from './Dragable'
import Deleteable from './Deleteable'
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';


export class DialogExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      content: [],
      filterInput: "",
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {

    init(api => {
      api.window.updateHeight(600)
      console.log("API:", api.parameters.invocation.contentTypes)
      api.space.getEntries({
        content_type: 'webpage',
        locale: 'sv',
        'fields.contentType.sv[in]': api.parameters.invocation.contentTypes
      }).then(result => {
        this.setState({
          content: result.items.filter((item) => item.fields.hasOwnProperty("contentType")),
        })
      })
    })
  }

  inputChanged(event) {
    this.setState({ filterInput: event.target.value }, () => console.log(this.state.filterInput))
  }

  select(item) {
    this.props.sdk.close(item)
  }

  render() {
    let stateChange = this.state.content.filter(i => i.fields.title.sv.toLowerCase().includes(this.state.filterInput.toLowerCase()))

    return (
      <div style={{ margin: tokens.spacingM }}>
        <TextInput
          type="text"
          onChange={(event) => this.inputChanged(event)}
          ref={this.inputRef}
          placeholder="Sök på titel"
          style={{ marginBottom: 20 }}
        />

        <div className="cards">
          {stateChange && stateChange.map(item => {
            return <EntryCard
              key={item.sys.id}
              title={item.fields.title.sv}
              contentType={item.fields.contentType.sv}
              withDragHandle={true}
              size="small"
              onClick={() => {
                this.props.sdk.close(this.select(item));
              }}
            />
          })}
        </div>


        <Button
          testId="close-dialog"
          buttonType="muted"
          onClick={() => {
            this.props.sdk.close(null);
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
    console.log("Mount")
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    init(extension => {

      let page = extension.entry

      console.log("Field data: ", extension.field)

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
    let fields = this.props.sdk.field.items.validations[0].linkContentType
    if (fields) {
      console.log("Types: ", fields)
      return fields
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

  onMove(fromIndex, toIndex) {
    var newVal = [...this.state.value];
    var element = newVal[fromIndex];
    newVal.splice(fromIndex, 1);
    newVal.splice(toIndex, 0, element);
    this.setState({
      value: newVal
    }, function () {
      //this.props.sdk.field.setValue(this.state.value);
      console.log("Moved")
    })
  }

  onRemove(index) {
    var newVal = [...this.state.value];
    newVal.splice(index, 1);
    this.setState({
      value: newVal
    }, function () {
      this.props.sdk.field.setValue(this.state.value);
    })
  }

  fixContentTypes(contentTypes) {
    let fixed = contentTypes.map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(",")
    console.log({ fixed })
    return fixed
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
      width: "large",
      title: 'Välj överliggande sida',
      parameters: { contentTypes: this.fixContentTypes(this.state.contentTypes), selectedItems: this.state.value ? this.state.value.map(v => v.sys.id) : [] }
    });
    result && this.setState({
      value: this.state.value ? [...this.state.value, result] : [result]
    }, () => console.log(this.state))
  }

  render() {
    let self = this
    return (
      <>
        {self.state.value && self.state.value.map((item, idx) => {
          return <Dragable className="item" index={idx} onMove={this.onMove.bind(this)}>
            <Deleteable onRemove={this.onRemove.bind(this)} index={idx}>
              <EntryCard
                key={item.sys.id}
                title={item.fields.title.sv}
                contentType={item.fields.contentType.sv}
                withDragHandle={true}
                size="small"
                onClick={self.onClick.bind(self, item.id)}
              />
            </Deleteable>
          </Dragable>

        })}

        <TextLink onClick={self.selectParentEntry.bind(self)} iconPosition="left" icon="Link">Link parent itemz</TextLink>
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
