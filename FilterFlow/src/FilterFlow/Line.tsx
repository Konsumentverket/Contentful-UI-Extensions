import * as React from "react"
import styled from 'styled-components'


import { FlowContext } from "./FlowContext";
import { ILinkDefaultProps, LinkDefault } from "../ReactFlowChart";



const Line: React.FunctionComponent<ILinkDefaultProps> = (props) => {

    var context = React.useContext(FlowContext)
    
    return <LinkDefault {...props} />
}

export default Line;