import React, { Component } from 'react';
import { TextInput } from '@contentful/forma-36-react-components';
import { CheckboxField } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';
import Deleteable from './Deleteable';

class AnswerListItem extends Component {

    constructor(props){
        super(props);

        console.log(this.props);

        this.state = {
            answer: this.props.item.answer,
            feedback: this.props.item.feedback,
            iscorrectanswer: this.props.item.iscorrectanswer,
            identifier: this.props.item.identifier
        }
    }

    handleInputChange(event, field){ 
        var state = this.state;
        state[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState(state);
        this.props.onChange(state,this.props.index);
          
    }

    render() {
        return (
            <Dragable className="item" index={this.props.index} onMove={this.props.onMove}>
                <Deleteable onRemove={this.props.onRemove} index={this.props.index}> 
                    <TextInput value={this.state.answer} placeholder="Svarsalternativ" className="item-input" onChange={(e) => this.handleInputChange(e, "answer")} />
                    <TextInput value={this.state.feedback} placeholder="Feedback" className="item-input" onChange={(e) => this.handleInputChange(e, "feedback")} />
                    <CheckboxField id={"isCorrectAnswer"+this.props.index} checked={this.state.iscorrectanswer} labelText="Korrekt svarsalternativ" className="item-input" onChange={(e) => this.handleInputChange(e, "iscorrectanswer")} />
                </Deleteable> 
            </Dragable>
        );
    }

    onChange = (event) => {
        const iscorrectanswer = event.target.checked;
        this.setState({
            iscorrectanswer
        });
        
    }

}

export default AnswerListItem; 