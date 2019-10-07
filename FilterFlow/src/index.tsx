import * as React from 'react';
import { render } from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import { init, FieldExtensionSDK,locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import FilterFlow from './FilterFlow'
import { ADDRGETNETWORKPARAMS } from 'dns';

interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  value?: string;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    if(this.props.sdk.location.is(locations.LOCATION_ENTRY_FIELD)){
      this.state = {
        value: props.sdk.field.getValue() || ''
      };
    }
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    if(this.props.sdk.location.is(locations.LOCATION_ENTRY_FIELD)){
      this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
    }
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = (value: string) => {
    this.setState({ value });
  };

  onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      await this.props.sdk.field.setValue(value);
    } else {
      await this.props.sdk.field.removeValue();
    }
  };

  render = () => {
    
    if(this.props.sdk.location.is(locations.LOCATION_DIALOG)){

        console.log("frameElement",window.parent);

        return <FilterFlow sdk={this.props.sdk} />
    }
    else{
      return (
        <Button onClick={()=> {
          this.props.sdk.dialogs.openExtension({
            id:"FilterFlow",
            title:"Filterbyggaren",
            width: 1500,
            parameters:{
              value: this.state.value
            }
          })
          .then(data => {
            console.log(data);
          })
        }}>Öppna filterbyggaren</Button>
        );
    }
  };
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept();
}
