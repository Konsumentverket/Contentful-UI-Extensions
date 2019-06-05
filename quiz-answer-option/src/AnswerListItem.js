import React, { Component } from 'react';
import { TextInput } from '@contentful/forma-36-react-components';
import { CheckboxField } from '@contentful/forma-36-react-components';
import Dragable from './Dragable';
import Deleteable from './Deleteable';

class AnswerListItem extends Component {

    handleInputChange(event){ 
/*
        this.setState({
            [answer]: event.answer,
            [feedback]: event.feedback,
            [iscorrectanswer]: event.iscorrectanswer,
          });
*/
          this.changeHandler();
    }

    render() {
        return (
            <Dragable className="item" index={this.props.index} onMove={this.props.onMove}>
                <Deleteable onRemove={this.props.onRemove} index={this.props.index}> 
                    <TextInput value={this.props.answer} placeholder="Svarsalternativ" className="item-input" onChange={this.handleInputChange} />
                    <TextInput value={this.props.feedback} placeholder="Feedback" className="item-input" onChange={this.handleInputChange} />
                    <CheckboxField id={"isCorrectAnswer"+this.props.index} checked={this.props.iscorrectanswer} labelText="Korrekt svarsalternativ" className="item-input" onChange={this.handleInputChange.bind(this)} />
                </Deleteable> 
            </Dragable>
        );
    }

    onChange(e){
        this.props.onChange({
            answer: 'svar',
            feedback: 'feedback',
            iscorrectanswer: true,
        },this.props.index)
    }

    changeHandler() {
        this.props.onChange({
            answer: 'svar',
            feedback: 'feedback',
            iscorrectanswer: true,
        },this.props.index)
    }
}

export default AnswerListItem; 