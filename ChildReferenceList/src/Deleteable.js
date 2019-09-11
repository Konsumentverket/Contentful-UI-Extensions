import React, { Component } from 'react';
import { CardActions, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';

class Deleteable extends Component {
    render() {
        return (
            <>
                <CardActions className="item-actions">
                    <DropdownList>
                        <DropdownListItem onClick={() => {this.props.onRemove(this.props.index)}}>Delete</DropdownListItem>
                    </DropdownList>
                </CardActions>
                {this.props.children}
            </>
        );
    }
}

export default Deleteable;