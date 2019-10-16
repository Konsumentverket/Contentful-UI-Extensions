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

    React.useLayoutEffect(() => {
        setPortPosition({chart:context.chart, portPositionChange:context.defaultCallbacks.onPortPositionChange,port:props.port});
    });


    var portSelected = context.chart.selected && context.chart.selected.type == "port" && context.chart.selected.id == props.port.id;

    return <Wrapper data-portid={props.port.id} 
                    
                    className={portSelected ? "selected": ""} 
                    color={props.port.properties.color}
                    onClick={(e) => {
                        if(props.port.type != "input"){

                            //the 'canvas' needs focus to accept the keydown event om a div.. yes this is a hack
                            var canvas:HTMLElement|null = document.querySelector("[tabindex]")
                            if(canvas != null){
                                canvas!.focus();
                            }

                            context.defaultCallbacks.onPortClick(props.port.id)
                        }
                        e.stopPropagation();
                    }}>
                    
        {props.port.properties.index == 0 ? null : <span>#{props.port.properties.index}</span>}
    </Wrapper>
}

export default Port;