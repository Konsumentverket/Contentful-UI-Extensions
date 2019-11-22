import React, {useState} from 'react';
import { Icon } from '@contentful/forma-36-react-components';

export default (props)=>{

    var [visible,setVisible] = useState(props.hasOwnProperty("visible") && props.visible != null ? props.visible : false)

    return <>
        <div className="folder" onClick={() => setVisible(!visible)}>
            {props.headline}

            {props.headline == "" ? <p> </p> : <Icon icon={visible ? "ChevronDown" : "ChevronRight"} />}
        </div>
        {visible ? props.children : null}
    </>

}