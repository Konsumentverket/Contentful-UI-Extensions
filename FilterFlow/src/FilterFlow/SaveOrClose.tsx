import * as React from "react"
import styled from "styled-components";
import { Button } from "@contentful/forma-36-react-components";
import { FlowContext } from "./FlowContext";
import { IChart } from "../ReactFlowChart";

const SaveOrCloseWrapper = styled.div`
    bottom: 0px;
    right: 0px;
    position: fixed;
    z-index: 3;
    width: 230px;
    min-height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    
`;

const cleanDataBeforeSave = (chart:IChart) =>{
    var localData = Object.assign({},chart)

    Object.values(localData.nodes).forEach((node) => {
        node.position = {
            x : node.position.x,
            y : node.position.y
        }
    })

    return localData;
}

const SaveOrClose: React.FunctionComponent = () => {

    var context = React.useContext(FlowContext);

    return <SaveOrCloseWrapper>
        
        <Button buttonType="positive" onClick={
            () => {
                context.sdk.close(cleanDataBeforeSave(context.chart))
            }
        }>Spara ändringar</Button>

        <Button buttonType="muted" onClick={
            () => {
                context.sdk.close(false)
            }
        }>Avbryt</Button>

    </SaveOrCloseWrapper>;

}

export default SaveOrClose;