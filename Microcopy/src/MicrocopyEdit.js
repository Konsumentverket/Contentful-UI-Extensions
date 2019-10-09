import React, { Component } from 'react';
import { TextInput, Icon, Pill } from '@contentful/forma-36-react-components';
import speakingurl from 'speakingurl';

class MicrocopyEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editmode: this.props.editmode || false,
            value: this.props.value
        };
        this.keyRef = React.createRef();
      }

    onChange(field,e){

        var value = field == "key" ? 
            speakingurl(e.target.value,{separator: "-"}).replace(/-/g, '').trim() : 
            e.target.value;

        var val = Object.assign({},this.state.value,{[field]:value});
        this.setState({value:val}, () => this.props.onChange(this.props.area,this.props.index,val));
    }
    

    

    render() {
        return ( <div className="microcopyinput">
            <span className="field"><Pill label="Key:" />
            <TextInput className={"microcopyvalue"}
                value={this.state.value.key}
                width="small"
                disabled={!this.state.editmode}
                onChange={this.onChange.bind(this,"key")}
                inputRef={(input) => { this.keyRef = input }}
            />
            </span>
            <Icon icon="Code" className="codeconnection" />
            <span className="field"><Pill label="Text:" />
            <TextInput className={"microcopyvalue large"} 
                value={this.state.value.value}
                width="large"
                disabled={!this.state.editmode}
                onChange={this.onChange.bind(this,"value")}
            />
            </span>

            {this.state.editmode ?
                        <Icon icon="ThumbUp" onClick={()=> this.setState({editmode: false})} /> 
                    :
                    <>
                        <Icon icon="Edit" onClick={()=> this.setState({editmode: true})} />
                        <Icon icon="Close" onClick={() => this.props.onDelete(this.props.area,this.props.index)} />
                    </>
            }
            
        </div>);
    }
    componentDidMount() {
        if(!this.keyRef.disabled){
            this.keyRef.focus();
        }
        
    }
}


export default MicrocopyEdit;