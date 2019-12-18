import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import FlightAdminApp from './FlightAdmin/FlightAdminApp';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class DialogExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  render() {
    console.log(this.props.sdk.parameters.invocation);
    return (
      <div style={{ 
            margin: tokens.spacingM,
            height: 800,
          }
      }>
        <FlightAdminApp sdk={this.props.sdk} settings={this.props.sdk.parameters.invocation} />
      </div>
    );
  }
}

export class SidebarExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onButtonClick = async () => {
    console.log("installation",this.props.sdk.parameters.installation);
    await this.props.sdk.dialogs.openExtension({
      width: 1000,
      parameters: this.props.sdk.parameters.installation,
      title: 'Administrera flygplatser'
    });
  };

  render() {
    return (
      <Button
        buttonType="positive"
        isFullWidth={true}
        testId="open-dialog"
        onClick={this.onButtonClick.bind(this)}>
        Administrera flygplatser
      </Button>
    );
  }
}

export const initialize = sdk => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    ReactDOM.render(<DialogExtension sdk={sdk} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<SidebarExtension sdk={sdk} />, document.getElementById('root'));
  }
};

init(initialize);

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
