import * as React from "react"
import styled from 'styled-components'
import { INodeInnerDefaultProps } from "../ReactFlowChart";
import F36Tokens from '@contentful/forma-36-tokens';
import { FlowContext } from "./FlowContext";
import { Icon, TextLink } from "@contentful/forma-36-react-components";
import Entry from "./Entry";

export interface OptionProps {
    id: string,
    option: string,
    portId: string
}

const Box = styled.div`
    width: 300px;
`

const EntryWrapper = styled.div`
    width: 300px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px;
    line-height: 20px;
    user-select: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    svg{
        vertical-align: bottom;
    }
`
const Result = styled.div`
    background-color: ${F36Tokens.colorGreenMid};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-shadow: 0px 0px 1px #000000;
    color: #fff;
    padding: 10px;
    line-height: 20px;
    user-select: none;
    font-weight: 500;
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
        <EntryWrapper>
            
        {props.node.properties.entry == null ? 
            <TextLink onClick={() => {
                context.openResultEntryDialog(props.node.id);
            }} className="explanation" icon={"Link"}>Välj innehåll för resultatet</TextLink> 
            : 
            <Entry sys={props.node.properties.entry} onRemove={()=> {
                context.removeNodeEntry(props.node.id,"entry");
            }} />
        }

        


        </EntryWrapper>
    </Box>
    
}

export default ResultNode;