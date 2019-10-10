import * as React from "react"
import styled from 'styled-components'
import { INodeInnerDefaultProps } from "../ReactFlowChart";

import QuestionNode from "./QuestionNode";
import ResultNode from "./ResultNode";

export interface OptionProps {
    id: string,
    option: string,
    portId: string
}

const Box = styled.div`
    width: 300px;
`


const Node: React.FunctionComponent<INodeInnerDefaultProps> = (props) => {
    var isResultNode = props.node.type == "input-only";
    if(isResultNode){
        return <ResultNode {...props} />
    }
    else{
        return <QuestionNode {...props} />
    }
}

export default Node;