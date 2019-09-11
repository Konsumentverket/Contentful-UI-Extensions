import React from 'react';
import { EntityListItem } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';

const ChildItem = ({ index, title, contentType, onMove }) => {

    return (
        <Dragable className="item" index={index} onMove={onMove}>
            <EntityListItem
                className="list-item"
                key={index}
                title={title}
                description="Länkad sida"
                contentType={contentType}
            />
        </Dragable>
    )

}

export default ChildItem;