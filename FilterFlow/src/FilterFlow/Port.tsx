import * as React from "react"
import styled from 'styled-components'

import { IPortDefaultProps } from "../ReactFlowChart";
import { FlowContext } from "./FlowContext";
import setPortPosition from "./misc/setPortPosition";

var Wrapper = styled.div`
        background-color: ${props => props.color};
        border: 2px solid #000;
        width: 20px;
        height: 20px;
        font-size: 13px;
        cursor: pointer;
        font-weight: 400;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        color: #fff;
        user-select: none;
        &:focus{
            outline:none;
        }
        &:hover {
            opacity: .75;
        }
        &.selected{
            border-color: #DC143C;
            box-shadow: 0px 0px 3px 3px rgba(0,0,0,.2);
        }
    `
var debouncer:number;

const Port: React.FunctionComponent<IPortDefaultProps> = (props) => {

    var context = React.useContext(FlowContext)

    // var ref = React.useRef<any>()
    React.useLayoutEffect(() => {
        setPortPosition({chart:context.chart, portPositionChange:context.defaultCallbacks.onPortPositionChange,port:props.port});
    });
    
    // //fix to be able to delete the item before the main 'canvas' has focus
    // React.useLayoutEffect(()=>{
    //     clearTimeout(debouncer);
    //     debouncer = setTimeout(() => {
    //         ref.current.focus();
    //     },50);
    // })


    var portSelected = context.chart.selected && context.chart.selected.type == "port" && context.chart.selected.id == props.port.id;

    return <Wrapper data-portid={props.port.id} 
                    // ref={ref}
                    className={portSelected ? "selected": ""} 
                    color={props.port.properties.color}
                    tabIndex={0}
                    onClick={(e) => {
                        if(props.port.type != "input"){
                            context.defaultCallbacks.onPortClick(props.port.id)
                        }
                        e.stopPropagation();
                    }}>
                    
        {props.port.properties.index == 0 ? null : <span>#{props.port.properties.index}</span>}
    </Wrapper>
}

export default Port;