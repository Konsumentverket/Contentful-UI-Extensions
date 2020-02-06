import React from 'react'
import { EntryCard } from '@contentful/forma-36-react-components';
import Dragable from './Dragable'
import Deleteable from './Deleteable'

export default class CardItem extends React.Component {

    render() {

        let item = this.props.item
        let defaultLocale = this.props.locale

        return <Dragable className="item" index={this.props.index} onMove={this.props.onMove} >
            <Deleteable onRemove={this.props.onRemove} index={this.props.index}>
                <EntryCard
                    key={item.sys.id}
                    title={item.fields.title[defaultLocale]}
                    contentType={item.fields.contentType[defaultLocale]}
                    withDragHandle={true}
                    size="small"
                    onClick={() => this.props.onClick(item.sys.id)}
                />
            </Deleteable>
        </Dragable>
    }
}