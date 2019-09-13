import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
//import IconList from './IconList';
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
      selected: {title:'ttääääst', url:'http://simpleicon.com/wp-content/uploads/rocket.svg'},
      icons: [
        {icon: 'car',  title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },        
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },        
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },        
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },        
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },        
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'slk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'osdfiu', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'lskdfjuciur', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: '23294434', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'fd98klj5', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' },
        { title: 'sdlfk', url: 'http://simpleicon.com/wp-content/uploads/rocket.svg' }
      ]
    }

    this.fetchIcons();
  }

fetchIcons()
{
  console.log("fetchIcons");
  console.log(this.props.sdk.parameters.installation);  
  console.log(this.props.sdk.parameters.instance.listItemType);
  var baseurl = this.props.sdk.parameters.installation.iconExport;
  
  fetch(baseurl)
  .then(response => response.json())
  .then((jsonData) => {
    // jsonData is parsed json object received from url
    console.log(jsonData)
  })
}
  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

//hämta json

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

  onChange = e => {
    console.log("change!!");
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  handleClick(event){ 
    
    this.state.selected = event; 
    this.setState(this.state);      
}

handleRemove(){ 
    
  this.state.selected = undefined; 
  this.setState(this.state);      
}



  render() {
    
    var self = this;
    var selectedIcon = this.state.selected !== undefined &&
    <div className="icon icon--selected">
      <span className="info">Vald ikon</span>
      <img src={this.state.selected.url} alt={this.state.selected.title} />
      <span className="title">{this.state.selected.title}</span>
    </div>;


    var icons = (this.state.icons.map(function(e,i){
      return (
               
            <div className="icon" data-url={e.url} onClick={() => self.handleClick(e)}>
              <img src={e.url} alt={e.title} />
              <span className="title">{e.title}</span>
            
      </div>
      )
    }));
   
    return ( <>
    {selectedIcon}
    <div className="iconlist">  
      {icons}
      </div>

     <a className="iconremove" onClick={() => self.handleRemove()}>Ta bort</a> 
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
