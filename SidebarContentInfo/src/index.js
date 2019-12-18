import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button, HelpText, TextLink } from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class DialogExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  render() {
    return (
      <div style={{ margin: tokens.spacingM }}>
        <Button
          testId="close-dialog"
          buttonType="muted"
          onClick={() => {
            this.props.sdk.close('data from modal dialog');
          }}>
          Close modal
        </Button>
      </div>
    );
  }
}

export class SidebarExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      contentType: "",
      container: "",
      contentId: null
    };
  }


  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    init(extension => {

      /* extension.space.getEntry(page.fields.content.getValue().sys.id).then(async (content) => {
        let contentType = await extension.space.getContentType(content.sys.contentType.sys.id)
        this.setState({ contentType: contentType.name })
      }) */

      extension.space.getEntries({
        links_to_entry: extension.entry.getSys().id
      }).then(entries => {
        let filtered = entries.items.filter(e => e.sys.contentType.sys.id === "webpage" && e.fields.contentSysId.sv === extension.entry.getSys().id)
        filtered.length && this.setState({ container: filtered[0].fields.title.sv, contentId: filtered[0].sys.id })
      })
    })
  }

  onButtonClick = async () => {
    const result = await this.props.sdk.dialogs.openExtension({
      width: 800,
      title: 'The same extension rendered in modal window'
    });
  };

  navigateToContainer() {
    let containerId = this.state.contentId
    this.props.sdk.navigator.openEntry(containerId, { slideIn: true })
  }

  render() {
    return (
      <>
        {this.state.container ? <HelpText>
          Webbsida: <TextLink icon="Entry" onClick={this.navigateToContainer.bind(this)}> {this.state.container}</TextLink>.
        </HelpText> : null}
      </>
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
