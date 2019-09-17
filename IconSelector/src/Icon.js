import React, { Component } from 'react';

class IconList extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            url: this.props.url
        }
    }

    render() {
        return (
            <>
                <img src={this.props.url} alt={this.props.title} />
                <span className="title">{this.props.title}</span>
            </>  
        ); 
    }
}

export default IconList; 