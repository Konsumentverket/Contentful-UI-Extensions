import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import Icon from './Icon';
//import IconButton from './IconButton';

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };


  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      selected: props.sdk.field.getValue(),
      icons: []
    };

    this.fetchIcons();

  }

  fetchIcons() {
    var baseurl = this.props.sdk.parameters.installation.IconUrl;
    fetch(baseurl + "IconExport.json")
      .then(response => response.json())
      .then((jsonData) => {
        var icons = [];
        Array.from(jsonData.icons).map(function (e) {
          icons.push({ icon: e.name, title: e.title, url: baseurl + e.url });
        });
        this.setState({ icons: icons });
      })
  }
  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
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
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  handleClick(event) {
    this.setState({ selected: event }, () => {
      this.props.sdk.field.setValue(this.state.selected);
    });
  }

  handleRemove() {
    this.setState({ selected: undefined }, () => {
      this.props.sdk.field.setValue(this.state.selected);
    });
  }



  render() {

    var self = this;
    var selectedIcon = this.state.selected !== undefined &&
      <div className="icon icon--selected">
        <span className="info">Vald ikon</span>
        <Icon title={this.state.selected.title} url={this.state.selected.url + "?sanitize=true"} />
      </div>;

    var removeIcon = this.state.selected !== undefined &&
      <a className="iconremove" onClick={() => self.handleRemove()}>Ta bort</a>


    var icons = (this.state.icons.map(function (e) {
      return (

        <div className="icon" data-url={e.url} onClick={() => self.handleClick(e)}>
          <Icon imgclass="image" title={e.title} url={e.url + "?sanitize=true"} />

        </div>
      )
    }));

    return (<>
      {selectedIcon}
      <div className="iconlist">
        {icons}
      </div>

      {removeIcon}
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

