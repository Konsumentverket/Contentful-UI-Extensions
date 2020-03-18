import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextLink } from '@contentful/forma-36-react-components';
import ChildItem from './ChildItem';
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
      value: props.sdk.field.getValue() || [],
      fetchedItems: [],
      hasFetched: false,
      contentTypes: []
    };
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    // Get entries that link to this entry
    init(extension => {

      const defaultLocale = extension.locales.default;
      const parentRefs = extension.entry.fields.parentReferences.getValue()
      const currentItemParentIds = parentRefs && parentRefs.length && parentRefs.map(ref => ref.sys.id) || []
      const currentEntryId = extension.entry.getSys().id
      var stateItems = this.state.value ? [...this.state.value] : []

      var currentItemIds = this.state.value ? this.state.value.map(function (item) {
        return item.id;
      }) : []

      var fetchedItemIds = [];


      console.log(currentEntryId)

      extension.space.getEntries({
        links_to_entry: currentEntryId
      })
        .then(async (data) => {

          // Get content type names
          if (!this.state.contentTypes.length) {
            var ct = []
            await extension.space.getContentTypes().then(types => {
              types.items.map(type => {
                ct[type.sys.id] = type.name
              })
              this.setState({ contentTypes: ct }, () => { })
            })
          }

          this.asyncForEach(data.items, async (item) => {

            // Check if this entrys parent is also a child and warn about it
            currentItemParentIds.length && currentItemParentIds.includes(item.sys.id) && extension.notifier.error("Denna sidas 'Referens till föregående sida' finns även med som underliggande sida");

            // Make sure the relation is as a child to this parent
            let parentIds = item.fields.parentReferences && item.fields.parentReferences[defaultLocale].map(i => i.sys.id)
            let isTrueChild = parentIds && parentIds.length && parentIds.includes(currentEntryId)

            if (isTrueChild && !currentItemIds.includes(item.sys.id)) {
              let containerType = this.state.contentTypes[item.sys.contentType.sys.id] || ""
              let contentContentTypeName = item.fields.contentType[defaultLocale].charAt(0).toLowerCase() + item.fields.contentType[defaultLocale].substring(1)
              let innerContentType = this.state.contentTypes[contentContentTypeName] || "not found"
              stateItems.push({
                'id': item.sys.id,
                'contentTypeName': containerType + " med " + innerContentType,
                'title': item.fields.title ? item.fields.title[defaultLocale] : item.fields.headline[defaultLocale],
                'order': stateItems.length,
              });
              currentItemIds.push(item.sys.id);
            }
            else {
              ; //EMPTY
            }
            fetchedItemIds.push(item.sys.id);
          }).then(() => {
            // Cleanup - remove dead references. If it's not fetched it is no longer valid.
            let filtered = stateItems.filter((val) => {
              return fetchedItemIds.includes(val.id);
            });

            this.setState({
              value: filtered,
              hasFetched: true
            }, () => {
              this.props.sdk.field.setValue(this.state.value);
            });
          });
        })
    });
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

  render() {
    var self = this;
    var items = this.state.value && this.state.value.map(function (e, i) {
      return (
        <ChildItem
          key={i}
          index={i}
          title={e.title}
          contentTypeName={e.contentTypeName}
          onMove={self.onMove.bind(self)}
          onClick={self.onClick.bind(self, e.id)}
        />);
    });

    return (
      <>
        {items}
      </>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

