import * as React from "react"
import styled from 'styled-components'
import F36Tokens from '@contentful/forma-36-tokens';
import { IconButton, Icon } from '@contentful/forma-36-react-components'
import { INodeInnerDefaultProps, INode } from "../ReactFlowChart";
import { FlowContext, IOption, TypedNode } from "./FlowContext";
import { v4 } from 'uuid';

export interface OptionProps {
    id: string,
    option: string,
    portId: string
}

const Box = styled.div`
    width: 300px;
`
const QuestionContainer = styled.div`
    background-color: ${F36Tokens.colorBlueLight};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 10px;
    min-height: 10px;
    position: relative;
    user-select: none;
    text-shadow: 0px 0px 1px #000000;

    .editQuestion{
        position: absolute;
        top: 3px;
        left: 1px;
    }
`

const OptionContainer = styled.div`
    cursor: default;
    padding: 5px 5px 19px 22px;
    min-height: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;
    .addOptions{
        position: absolute;
        top: 3px;
        left: 1px;
    }
    .addLink{
        position: absolute;
        bottom: -13px;
        background-color: #fff;
        right: -1px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        z-index: 1;
    }
`

const Option = styled.a`
    padding: 2px 5px 3px 5px;
    margin: 3px 0 0 3px;
    font-size: 13px;
    max-height: 19px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
`



const QuestionNode: React.FunctionComponent<INodeInnerDefaultProps> = (props) => {
    const node = props.node as TypedNode;
    var context = React.useContext(FlowContext)

    return <Box data-nodeid={node.id}>
        <QuestionContainer>
            <IconButton iconProps={{ icon: "Edit" }} className="editQuestion" label="Redigera fråga" buttonType="white" onClick={() =>{
                context.editNodeQuestion(props.node);
            }} />
            {node.properties.question}
        </QuestionContainer>
        <OptionContainer
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            onDrop={(e) => {
                e.stopPropagation();
            }}
        >
            {Object.keys(node.ports).length > 0 ?
                <IconButton iconProps={{ icon: "PlusCircle" }}
                    className="addOptions" label="Lägg till alternativ"
                    onClick={() => {
                        const option: IOption = {
                            id: v4(),
                            nodeId: node.id,
                            order: Object.keys(node.properties.options).length + 1
                        }
                        context.editOption(option)
                    }}
                />
                : null}
            {

            Object.keys(node.ports).length > 6 ? 
                null 
                :
                <IconButton iconProps={{ icon: "Link" }} className="addLink" label="Lägg till länk" onClick={() => {
                    context.addPort(node);
                }} />
            }
        
            {/* OPTIONS */}
            {Object.values(node.properties.options).sort((a, b) => a.order - b.order).map((option) => {

                var color = node.ports[option.portId!].properties.color;
                var index = node.ports[option.portId!].properties.index;
                return <Option onClick={(e) => {
                    e.preventDefault();
                    context.editOption(option);
                }}
                    key={option.id}
                    draggable={true}
                    onDragStart={(ev) => {
                        ev.dataTransfer.setData("option", option.id);
                    }}
                    onDrop={(ev) => {
                        ev.preventDefault();
                        var movedId = ev.dataTransfer.getData("option");
                        context.changeOptionsSort(movedId,option.id,node.id)
                    }}
                    title={"#" + index}
                    style={{ backgroundColor: color }}
                >
                    {option.text}
                </Option>
            })}

        </OptionContainer>
    </Box>
}

export default QuestionNode;