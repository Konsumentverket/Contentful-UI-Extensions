import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextLink, Tag, Tab, Tabs, Icon } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import MicrocopyEdit from './MicrocopyEdit';
import speakingurl from 'speakingurl';

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };
 
  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue(),
      selectedTab: null,
      newlyCreatedMicrocopys: [],
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onChange(area,index,val){
    
    var areaList = [...this.state.value[area]];
    areaList[index] = val;
    var newVal = Object.assign({},this.state.value);
    newVal[area] = areaList;

    this.setState({
      value: newVal
    },() => this.props.sdk.field.setValue(newVal));
  }

  onDelete(area,index){

    this.props.sdk.dialogs.openConfirm({
      title: "Are you sure?!",
      message: `This action is not revertable`,
      intent: "negative", 
      confirmLabel: "Yes",
      cancelLabel: "No"
    }).then(result => {
      if(result){
        var areaList = [...this.state.value[area]];
        areaList.splice(index, 1);
        var newVal = Object.assign({},this.state.value);
        newVal[area] = areaList;
        this.setState({
          value: newVal
        },() => this.props.sdk.field.setValue(newVal));
      }
    });
  }

  removeArea(area){
    this.props.sdk.dialogs.openConfirm({
      title: "Are you sure?!",
      message: `All microcopy text connected to '${area}' will be removed. This action is not revertable`,
      intent: "negative", 
      confirmLabel: "Yes",
      cancelLabel: "No"
    }).then(result => {
      if(result){
        var newVal = Object.assign({},this.state.value)
        delete newVal[area];
        this.setState({
          value: newVal,
          selectedTab: null
        },() => this.props.sdk.field.setValue(newVal));
      }
    });
  }

  addMicrocopy(area){
    var val = Object.assign({},this.state.value);
    var index = val[area].push({
      key: "",
      value: "",
      id: this.generateRandomId()
    });
    var newlyCreatedMicrocopys = [...this.state.newlyCreatedMicrocopys,{area: area, index: --index}]
    this.setState({
      value: val,
      newlyCreatedMicrocopys: newlyCreatedMicrocopys
    },() => this.props.sdk.field.setValue(this.state.value));
  }

  generateRandomId(){
    return Math.random().toString(36).substring(7);
  }

  addMicrocopyArea(){
    this.props.sdk.dialogs.openPrompt({
      title: "New area",
      message: "Name of the area",
      defaultValue: ""
    }).then(result => {
      if(!result) return;
      var val = speakingurl(result,{separator: "-"}).replace(/-/g, '').trim()
      this.setState(currentState => { 
        var value = Object.assign(currentState.value || {}, {[val]: [] })
        return {
          value : value
        }
      },() => this.props.sdk.field.setValue(this.state.value))
    });
  }

  renderSelectedTab(){
    var key = this.state.selectedTab || Object.keys(this.state.value || {})[0];
    if(key == null) return null;
    var values = Object.keys(this.state.value[key]).map((v, i) => {
        var obj = this.state.value[key][v];
        return <li key={obj.id}>
          <MicrocopyEdit value={obj} area={key} index={i} 
                          onChange={this.onChange.bind(this)}
                          onDelete={this.onDelete.bind(this)}
                          editmode={this.state.newlyCreatedMicrocopys.filter((x) => {
                            return (x.area == key && x.index == i)}).length > 0
                          }
          />
        </li>
      }
    )
    return <>
      <ul className="values">
        {values}
      </ul>
      <TextLink text={`New microcopy for: ${key}`} 
                icon={"Plus"} 
                onClick={() => this.addMicrocopy(key)}
      />
      <TextLink text={`Remove area`}
                className="removearea" 
                icon={"Close"} 
                onClick={this.removeArea.bind(this,key)}
      />
    </>
  }

  render() {
    var areas = Object.keys(this.state.value || {}).map((key,i) => {
      return <Tab id={key} 
                  key={key}
                  className="tab"
                  selected={this.state.selectedTab == key || (this.state.selectedTab == null && i == 0)}
                  onSelect={() => this.setState({
                    selectedTab: key,
                    newlyCreatedMicrocopys: []
                  })}
              >
                <Tag tagType="secondary">{key}</Tag>
              </Tab>
    });
    
    return (
      <>
        {
          this.props.sdk.user.spaceMembership.admin ? 
            <TextLink text="New microcopy area" icon={"Plus"} onClick={this.addMicrocopyArea.bind(this)} /> :
            null
        }
        <Tabs className="tabswrap">
          {areas}
        </Tabs>
        {this.renderSelectedTab()}
        
      </>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});
