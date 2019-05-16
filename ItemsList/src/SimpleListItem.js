import React, { Component } from 'react';
import { TextInput, CardActions, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';

class SimpleListItem extends Component {


    onChange(e){
        this.props.onChange({
            text:e.target.value
        },this.props.index)
    }

    render() {
        return (
            <Dragable className="item" index={this.props.index} onMove={this.props.onMove}>
                <CardActions className="item-actions">
                    <DropdownList>
                        <DropdownListItem onClick={() => {this.props.onRemove(this.props.index)}}>Delete</DropdownListItem>
                    </DropdownList>
                </CardActions>
                <TextInput value={this.props.item.text} className="item-input" onChange={this.onChange.bind(this)} />
            </Dragable>
        );
    }
}

export default SimpleListItem;