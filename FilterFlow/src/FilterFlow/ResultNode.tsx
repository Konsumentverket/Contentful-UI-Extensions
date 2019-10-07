import * as React from "react"
import styled from 'styled-components'
import { INodeInnerDefaultProps } from "../ReactFlowChart";
import F36Tokens from '@contentful/forma-36-tokens';
import { FlowContext } from "./FlowContext";
import { Button, Icon } from "@contentful/forma-36-react-components";

export interface OptionProps {
    id: string,
    option: string,
    portId: string
}

const Box = styled.div`
    width: 300px;
`

const Entry = styled.div`
    width: 300px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px;
    line-height: 20px;
    svg{
        vertical-align: bottom;
    }
    a{
        text-decoration: none;
        margin-left: 4px;
    }
`
const Result = styled.div`
    background-color: ${F36Tokens.colorGreenMid};
    color: #fff;
    padding: 10px;
    line-height: 20px;
    svg{
        vertical-align: bottom;
    }
`

const ResultNode: React.FunctionComponent<INodeInnerDefaultProps> = (props) => {
    var context = React.useContext(FlowContext)

    
    return <Box>
        <Result>
            Resultat <Icon icon={"Star"} color="white" />
        </Result>
        <Entry>
            <Icon icon={"Settings"} />
            <a href="#" onClick={() => {
                context.openResultEntryDialog();
            }}>Välj innehåll för resultatet</a>
        </Entry>
    </Box>
    
}

export default ResultNode;