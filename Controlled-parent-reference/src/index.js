import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { EntryCard, TextLink, Button, TextInput } from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import CardItem from './CardItem'
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
      api.space.getEntries({
        content_type: 'webpage',
        locale: 'sv',
        'fields.contentType.sv[in]': api.parameters.invocation.contentTypes,
        'sys.id[nin]': api.parameters.invocation.selectedItems
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
      value: props.sdk.field.getValue() || [],
      contentTypes: [],
      selectedEntries: []
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
        this.setState({ contentTypes: contentTypes })
      }
      else {
        console.log("Could not set content types")
      }
      this.getSelectedEntries(this.state.value)
    })
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  getSelectedEntries(stateItemArray) {
    let itemIds = stateItemArray.map(item => item.sys.id)
    this.props.sdk.space.getEntries({
      content_type: 'webpage',
      locale: 'sv',
      'sys.id[in]': itemIds.join(",")
    }).then(result => {
      result.items.forEach(item => {
        itemIds.splice(itemIds.indexOf(item.sys.id), 1, item)
      })
      this.setState({ selectedEntries: itemIds.filter(i => i.hasOwnProperty("sys")) })
    })
  }

  getAvailableParentContentTypes() {

    const allowedTypes = this.props.sdk.field.items.validations.reduce((acc, val) => {
      if (val.linkContentType) {
        acc = acc.concat(val.linkContentType)
      }
      return acc
    }, [])

    return allowedTypes
  }

  onExternalChange = value => {
    if (value) {
      this.setState({ value })
    }
  };

  onClick(id) {
    this.props.sdk.navigator.openEntry(id, { slideIn: true })
  }

  doMove(fromIndex, toIndex) {
    var newVal = [...this.state.selectedEntries];
    var element = newVal[fromIndex];
    newVal.splice(fromIndex, 1);
    newVal.splice(toIndex, 0, element);
    this.saveItems(newVal)
  }

  doRemove(index) {
    var newVal = [...this.state.selectedEntries];
    let removed = newVal.splice(index, 1)
    this.saveItems(newVal)
  }

  onMove(fromIndex, toIndex) {
    let fi = parseInt(fromIndex, 10)
    let ti = parseInt(toIndex, 10)
    if (!fi || !ti) {
      this.props.sdk.dialogs.openConfirm({
        title: "Ändra primär förälder?",
        message: "Den primära föräldern håller på att ändras. Detta kommer att påverka bl a canonical URL, brödsmula och övrig SEO.",
        intent: "negative",
        confirmLabel: "Ändra förälder",
        cancelLabel: "Avbryt"
      }).then(result => {
        result && this.doMove(fi, ti)
      })
    }
    else {
      this.doMove(fi, ti)
    }
  }

  onRemove(index) {
    let idx = parseInt(index, 10)
    if (!idx) {
      this.props.sdk.dialogs.openConfirm({
        title: "Ta bort primär förälder?",
        message: "Den primära föräldern håller på att tas bort. Detta kommer att påverka bl a canonical URL, brödsmula och övrig SEO.",
        intent: "negative",
        confirmLabel: "Ta bort förälder",
        cancelLabel: "Avbryt"
      }).then(result => {
        result && this.doRemove(idx)
      })
    }
    else {
      this.doRemove(idx)
    }

  }

  fixContentTypes(contentTypes) {
    let fixed = contentTypes.map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(",")
    return fixed
  }

  createStateItem(item) {
    let stateItem = {
      sys: {
        id: item.sys.id,
        linkType: "Entry",
        type: "Link"
      }
    }

    return stateItem
  }

  async selectParentEntry() {

    let selectedItems = this.state.value ? this.state.value.map(v => v.sys.id) : []

    // Don't allow selecting this entry as its own parent..
    selectedItems.push(this.props.sdk.entry.getSys().id)

    const result = await this.props.sdk.dialogs.openExtension({
      width: "large",
      title: 'Välj överliggande sida',
      parameters: { contentTypes: this.fixContentTypes(this.state.contentTypes), selectedItems: selectedItems.join(',') }
    });

    if (result) {
      let items = this.state.selectedEntries ? [...this.state.selectedEntries, result] : [result]
      this.saveItems(items)

    }
  }

  saveItems(selectedEntriesArray) {

    let stateItems = selectedEntriesArray.map(item => this.createStateItem(item))

    this.setState({
      value: stateItems,
      selectedEntries: selectedEntriesArray
    }, function () {
      this.props.sdk.field.setValue(this.state.value)
        .catch(error => console.log("Error: ", error));
    })
  }

  render() {

    return (
      <>
        {this.state.selectedEntries && this.state.selectedEntries.map((item, idx) => {
          return <CardItem key={item.sys.id} index={idx} onMove={this.onMove.bind(this)} onRemove={this.onRemove.bind(this)} onClick={this.onClick.bind(this)} item={item} />

        })}

        <TextLink onClick={this.selectParentEntry.bind(this)} iconPosition="left" icon="Link">Link parent itemz</TextLink>
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
/* if (module.hot) {
  module.hot.accept();
} */
