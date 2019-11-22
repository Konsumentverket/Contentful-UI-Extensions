import React, { Component } from 'react';
import { Textarea,TextInput,CheckboxField,FormLabel } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';
import Deleteable from './Deleteable';
import Foldable from './Foldable';

class AirlineListItem extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: props.item.name,
            information: props.item.information,
            europeanCompany: props.item.europeanCompany
        }
    }

    onChange(e){

        var name = e.target.name;
        var value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
        
        this.setState({
            [name]:value
        },() => {
            this.props.onChange({
                name: this.state.name,
                information: this.state.information,
                europeanCompany: this.state.europeanCompany
            },this.props.index)
        });


        
    }

    render() {
        return (
            <Dragable className="item airlines" index={this.props.index} onMove={this.props.onMove}>
                <Foldable headline={this.state.name} visible={this.state.name == "" ? true : null}>
                    <Deleteable onRemove={this.props.onRemove} index={this.props.index}> 
                        <FormLabel className="item-inputlabel" htmlFor={`name${this.props.index}`}>Namn</FormLabel>
                        <TextInput id={`name${this.props.index}`} autoComplete="false" name="name" placeholder="Namn" value={this.state.name} className="item-input" onChange={this.onChange.bind(this)} />

                        <FormLabel className="item-inputlabel" htmlFor={`information${this.props.index}`}>Information</FormLabel>
                        <Textarea id={`information${this.props.index}`} name="information" placeholder="Information" value={this.state.information} className="item-input" onChange={this.onChange.bind(this)} />


                        <CheckboxField id={`europeanCompany${this.props.index}`} className="item-input checkbox" name="europeanCompany" labelText="Ifrån EU?" checked={this.state.europeanCompany} onChange={this.onChange.bind(this)} />
                    </Deleteable>
                </Foldable>
            </Dragable>
        );
    }
}

export default AirlineListItem;