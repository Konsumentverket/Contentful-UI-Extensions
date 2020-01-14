import * as React from 'react';
import { render } from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import { init, FieldExtensionSDK,locations, DialogExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import FilterFlow from './FilterFlow'
import { ADDRGETNETWORKPARAMS } from 'dns';
import { IChart } from './ReactFlowChart';

interface AppProps {
  sdk: FieldExtensionSDK | DialogExtensionSDK;
}

interface AppState {
  value?: string;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    if(this.props.sdk.location.is(locations.LOCATION_ENTRY_FIELD)){
      var api = props.sdk as FieldExtensionSDK;
      this.state = {
        value: api.field.getValue() || ''
      };
    }
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
    
    if(this.props.sdk.location.is(locations.LOCATION_ENTRY_FIELD)){
      var api = this.props.sdk as FieldExtensionSDK;
      this.detachExternalChangeHandler = api.field.onValueChanged(this.onExternalChange);
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


  render = () => {

    if(this.props.sdk.location.is(locations.LOCATION_DIALOG)){
        var dialogSdk = this.props.sdk as DialogExtensionSDK
        var invocation = dialogSdk.parameters.invocation as any
        return <FilterFlow sdk={dialogSdk} chart={invocation.value} />
    }
    else{

      var parameters:any = {
        value: this.state.value
      }
      Object.keys(this.props.sdk.parameters.instance).forEach((key) => {
        parameters[key] = (this.props.sdk.parameters.instance as any)[key];
      })

      return (
        <Button onClick={()=> {
          this.props.sdk.dialogs.openExtension({
            id:"FilterFlow",
            width: 1500,
            parameters:parameters
          })
          .then(data => {
            if(data){
              var api = this.props.sdk as FieldExtensionSDK
              api.field.setValue(data);
              this.setState({
                value: data
              })
            }
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
// if (module.hot) {
//   module.hot.accept();
// }
