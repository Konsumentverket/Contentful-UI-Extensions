import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextLink } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import AnswerListItem from './AnswerListItem';

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
    var defaultValue = {
      answer:"",
      feedback:"", 
      iscorrectanswer:false
      };

    this.setState(prevState => ({
        value: [...(prevState.value == null ? [] : prevState.value), defaultValue]
    }),function(){
      this.props.sdk.field.setValue(this.state.value);
    });
    return false;
  }

  onChange = e => {
    const value = e;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

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
    newVal.splice(fromIndex, 1);
    newVal.splice(toIndex, 0, element);
    this.setState({
      value: newVal
    },function(){
      this.props.sdk.field.setValue(this.state.value);
    })
  }

  render() { 
    var self = this;
    var fields = (this.state.value == null ? [] : this.state.value).map(function(e,i){
      return <AnswerListItem onChange={self.onChange.bind(self)} 
                  index={i} 
                  key={i}
                  item={e}
                  onRemove={self.onRemove.bind(self)}
                  onMove={self.onMove.bind(self)}
              />;
  });

  return (
    <>
      {fields}
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
