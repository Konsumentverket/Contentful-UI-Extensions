import React from 'react';
import { EntryCard } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';

const ChildItem = ({ index, title, contentTypeName, onMove, onClick }) => {

    return (
        <Dragable className="item" index={index} onMove={onMove}>
            <EntryCard
                title={title}
                key={index}
                contentType={contentTypeName}
                withDragHandle={true}
                size="small"
                onClick={onClick}
            />
        </Dragable>
    )

}

export default ChildItem;