import React, { Component } from 'react';
import { Textarea,TextInput,CheckboxField,FormLabel } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';
import Deleteable from './Deleteable';

class DeniedReasonListItem extends Component {

    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            reason: props.item.reason,
            aircraftCarrierHasTheRightToDeny: props.item.aircraftCarrierHasTheRightToDeny,
        }
    }

    onChange(e){

        var name = e.target.name;
        var value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]:value
        },() => {
            this.props.onChange({
                reason: this.state.reason,
                aircraftCarrierHasTheRightToDeny: this.state.aircraftCarrierHasTheRightToDeny,
            },this.props.index)
        });


        
    }

    render() {
        return (
            <Dragable className="item deniedreason" index={this.props.index} onMove={this.props.onMove}>
                    <Deleteable onRemove={this.props.onRemove} index={this.props.index}> 
                        <FormLabel className="item-inputlabel" htmlFor={`name${this.props.index}`}>Anledning</FormLabel>
                        <TextInput id={`reason${this.props.index}`} autoComplete="false" name="reason" placeholder="Anledning" value={this.state.reason} className="item-input" onChange={this.onChange.bind(this)} />
                        <CheckboxField id={`aircraftCarrierHasTheRightToDeny${this.props.index}`} className="item-input checkbox" name="aircraftCarrierHasTheRightToDeny" labelText="Har flygbolaget eventuellt rätt att neka ombordstigning?" checked={this.state.aircraftCarrierHasTheRightToDeny} onChange={this.onChange.bind(this)} />
                    </Deleteable>
            </Dragable>
        );
    }
}

export default DeniedReasonListItem;