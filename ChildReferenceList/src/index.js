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
      value: props.sdk.field.getValue()
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    // Get linked entries
    init(extension => {

      var stateItems = [...this.state.value];
      var currentItemIds = this.state.value.map(function (item) {
        return item.id;
      })

      console.log("Fetching children");

      extension.space.getPublishedEntries({
        content_type: 'seguePage',
        'fields.parent.sys.id': extension.entry.getSys().id
      })
        .then((data) => {
          data.items.forEach(item => {
            if (!currentItemIds.includes(item.sys.id)) {
              stateItems.push({
                'id': item.sys.id,
                'title': item.fields.title
              });
              currentItemIds.push(item.sys.id);
            }
            else {
              console.log("Item already here...")
            }
          });

          // Cleanup dead references
          let filtered = stateItems.filter((val) => {
            return currentItemIds.includes(val.id);
          });

          this.setState({
            value: filtered
          }, () => { this.props.sdk.field.setValue(this.state.value) });
        });
    });
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    console.log("External value: ", value);
    this.setState({ value });
  };

  onChange = e => {
    console.log("Changed");
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  onMove(fromIndex, toIndex) {
    console.log("Indices: ", fromIndex, toIndex);
    var newVal = [...this.state.value];
    var element = newVal[fromIndex];
    newVal.splice(fromIndex, 1);
    newVal.splice(toIndex, 0, element);
    console.log("Moved: ", newVal);
    this.setState({
      value: newVal
    }, function () {
      this.props.sdk.field.setValue(this.state.value);
    })
  }

  addItem(item) {
    this.setState(prevState => ({
      value: [...(prevState.value == null ? [] : prevState.value), item]
    }), function () {
      this.props.sdk.field.setValue(this.state.value);
    });
    return false;
  }

  clearItems() {
    this.setState(({
      value: []
    }), function () {
      this.props.sdk.field.setValue(this.state.value);
    });
    return false;
  }


  render() {
    var self = this;
    var items = this.state.value && this.state.value.map(function (e, i) {
      return (
        <ChildItem
          key={i}
          index={i}
          title={e.title.sv}
          contentType="seguePage"
          onMove={self.onMove.bind(self)}
        />);
    });

    return (
      <>
        {items}
        <TextLink text="Töm listan" icon={"Plus"} onClick={this.clearItems.bind(this)} />
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
