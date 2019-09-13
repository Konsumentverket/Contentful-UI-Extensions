import React, { Component } from 'react';
import { Icon } from '@contentful/forma-36-react-components';

class IconButton extends Component {

    constructor(props){
        super(props);

        this.state = {
            icon: this.props.item.icon
        }
    }

    render() {
        return (
            <Icon icon={this.props.item.icon}></Icon>
            
        ); 
    }
}

export default IconList; 