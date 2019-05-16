import React, { Component } from 'react';
import { Textarea } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';
import Deleteable from './Deleteable';

class TextareaListItem extends Component {
    onChange(e){
        this.props.onChange({
            text:e.target.value
        },this.props.index)
    }

    render() {
        return (
            <Dragable className="item" index={this.props.index} onMove={this.props.onMove}>
                <Deleteable onRemove={this.props.onRemove} index={this.props.index}> 
                    <Textarea value={this.props.item.text} className="item-input" onChange={this.onChange.bind(this)} />
                </Deleteable>
            </Dragable>
        );
    }
}

export default TextareaListItem;