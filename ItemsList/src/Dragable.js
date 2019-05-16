import React, { Component } from 'react';
import { Icon} from '@contentful/forma-36-react-components';

class Dragable extends Component {

    enterCount = 0;

    constructor(props){
        super(props)
        this.state = {
            dragOver:false,
            isBeingDragged: false
        }
    }
    
    onDragStart(ev){
        ev.dataTransfer.setData("item", this.props.index);
        this.setState({
            isBeingDragged: true
        });
    }

    onDragEnd(ev){
        this.setState({
            dragOver: false,
            isBeingDragged: false
        });
    }

    onDragEnter(ev){
        this.enterCount++;
        this.setState((prevState) => ({
                dragOver: prevState.isBeingDragged ? false : true
            }
        ));
        ev.preventDefault();
    }

    onDragLeave(ev){
        this.enterCount--;
        this.setState((prevState) => ({
            dragOver: this.enterCount == 0 || prevState.isBeingDragged  ? false : true
        }));
        ev.preventDefault();
        
    }

    onDrop(ev){
        this.setState({
            dragOver: false
        });
        this.props.onMove(ev.dataTransfer.getData("item"),this.props.index);
    }

    onDragOver(ev){
        ev.preventDefault();
    }

    render() {

        var classes =Object.entries({
            [this.props.className] : true,
            dragOverActice : this.state.dragOver
        })
        .filter(([key,val]) => val)
        .map(([key,val]) => key).join(" ");

        return (
            <div className={classes} draggable="true" 
                 onDragStart={this.onDragStart.bind(this)}
                 onDragEnd={this.onDragEnd.bind(this)}
                 onDragEnter={this.onDragEnter.bind(this)}
                 onDragLeave={this.onDragLeave.bind(this)}
                 onDragOver={this.onDragOver.bind(this)}
                 onDropCapture={this.onDrop.bind(this)}
            >
                <Icon icon={"Drag"} className="dragIcon" />
                {this.props.children}
            </div>
        );
    }
}

export default Dragable;