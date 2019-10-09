
import * as React from "react"
import styled from "styled-components";
import { REACT_FLOW_CHART } from "../ReactFlowChart/constants";
import F36Tokens from '@contentful/forma-36-tokens';

import {v4} from 'uuid';
import { INode } from "../ReactFlowChart";

interface AddNodesProps {

}

const AddNodesWrapper = styled.div`
    bottom: 0px;
    left: 0px;
    position: fixed;
    background-color: #fff;
    z-index: 2;
    width: 100%;
    min-height: 50px;
    padding: 10px;
    display: flex;
    box-shadow: 0px 0px 10px #888;
    
`;

const QuestionNodeDraggable = styled.div`

    width: 100px;
    height: 50px;
    border: 1px solid #888;
    border-radius: 5px;
    cursor: grab;

    &:before{
        content: "Fråga";
        text-align: center;
        font-size: 13px;
        color: #fff;
        background-color: ${F36Tokens.colorBlueLight};
        display:block;
        height: 20px;
        width: 100%;
    }

`

const ResultNodeDraggable = styled.div`

    width: 100px;
    height: 50px;
    border: 1px solid #888;
    border-radius: 5px;
    margin-left: 40px;
    cursor: grab;

    &:before{
        content: "Resultat";
        text-align: center;
        font-size: 13px;
        color: #fff;
        background-color: ${F36Tokens.colorGreenMid};
        display:block;
        height: 20px;
        width: 100%;
    }

`

const AddNodes: React.FunctionComponent<AddNodesProps> = (props) => {

    return <AddNodesWrapper>

        <QuestionNodeDraggable draggable={true} onDragStart={(e) =>{

            var newNode: INode = {
                id: "", //will be set on drop
                type: "input-output", 
                ports:{}, 
                position: { //will be set on drop
                    x:0,
                    y:0
                },
                properties:{
                    question: "",
                    options:{}
                }
            }
            var id:string = v4();
            newNode.ports[id] = {
                id:id,
                type:"input",
                properties:{
                    color: "#42D4A8",
                    index: 0
                }
            };

            e.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify(newNode))
        }}>
            
        </QuestionNodeDraggable>

        <ResultNodeDraggable draggable={true} onDragStart={(e) =>{

            var newNode: INode = {
                id: "", //will be set on drop
                type: "input-only", 
                ports:{}, 
                position: { //will be set on drop
                    x:0,
                    y:0
                },
                properties:{
                    question: "",
                    options:{}
                }
            }
            var id:string = v4();
            newNode.ports[id] = {
                id:id,
                type:"input",
                properties:{
                    color: "#42D4A8",
                    index: 0
                }
            };

            e.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify(newNode))
            }}>

        </ResultNodeDraggable>

    </AddNodesWrapper>;

}

export default AddNodes;