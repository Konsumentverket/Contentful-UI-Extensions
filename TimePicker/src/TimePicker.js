import React from 'react';
import TimeField from 'react-simple-timefield';

const HourMinutePicker = ({type, text, value, setTime}) => {

    const onChange = (event, value) => {
        setTime({type: type, time: value});
    }

    return (
        <><span className="label">{text}</span>
        <TimeField value={value && value.time || ""} className="TextInput__TextInput__input___27vDB a11y__focus-border--default___60AXp" 
        onChange={onChange} style={{ width: '100px', marginRight: '16px' }}/></>
    );
}

export default HourMinutePicker;