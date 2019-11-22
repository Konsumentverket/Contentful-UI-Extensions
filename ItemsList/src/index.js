import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextLink } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import TextListItem from './TextListItem';
import TextareaListItem from './TextareaListItem';
import AirlineListItem from './AirlineListItem';
import DeniedReasonListItem from './DeniedReasonListItem';
import { v4 } from 'uuid'

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };

  detachExternalChangeHandler = null;
  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue(),
    };
  }

  getComponentType(){
    var type = this.props.sdk.parameters.instance.listItemType;
    switch(type){
      case "Text":
        return TextListItem;
      case "Textarea":
        return TextareaListItem;
      case "Airlines":
        return AirlineListItem;
      case "DeniedReasons":
        return DeniedReasonListItem;
      default:
        console.log("No item type for "+type+" found"); 
        return null;
    }
  }

  getDefaultValueForType(){
    var type = this.props.sdk.parameters.instance.listItemType;
    switch(type){
      case "Text":
      case "Textarea":
        return {
          text:"",
          id: v4()
        }
      case "Airlines":
        return {
          name:"",
          information:"",
          europeanCompany:false,
          id: v4()
        }
      case "DeniedReasons":
        return {
          reason:"",
          aircraftCarrierHasTheRightToDeny:false
        }
      default:
        console.log("No default value for type " + type);
        return null;
    }
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
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

  addItem(){
    this.setState(prevState => ({
        value: [...(prevState.value == null ? [] : prevState.value), this.getDefaultValueForType()]
    }),function(){
      this.props.sdk.field.setValue(this.state.value);
    });
    return false;
  }

  onChange(item,index){
      var oldVal = this.state.value[index];
      item.id = oldVal.id;
      if(item.id == null){
        item.id = v4();
      }
      var newVal = Object.assign([...this.state.value], {[index]: item});
      this.setState({
        value: newVal
      },function(){
        this.props.sdk.field.setValue(this.state.value);
      });
  }

  onRemove(index){
    var newVal = [...this.state.value];
    newVal.splice(index,1);
    this.setState({
      value: newVal
    },function(){
      this.props.sdk.field.setValue(this.state.value);
    })
  }

  onMove(fromIndex,toIndex){
    var newVal = [...this.state.value];
    var element = newVal[fromIndex];
    //console.log(`from:${fromIndex}  to:${toIndex}`)
    newVal.splice(fromIndex, 1);
    newVal.splice(toIndex, 0, element);
    this.setState({
      value: newVal
    },function(){
      this.props.sdk.field.setValue(this.state.value);
    })
  }

  render() {
    var ItemType = this.getComponentType();
    var self = this;  
    console.log(this.state.value);

    return (
      <>
        {(this.state.value == null ? [] : this.state.value).map((e,i) =>
         <ItemType onChange={self.onChange.bind(self)} 
                    index={i} 
                    key={e.id}
                    item={e}
                    onRemove={self.onRemove.bind(self)}
                    onMove={self.onMove.bind(self)}
                />
        )}
        <TextLink text="Create new item" icon={"Plus"} onClick={this.addItem.bind(this)} />
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
