import * as React from "react"
import { FieldExtensionSDK } from "contentful-ui-extensions-sdk";
import { IChart, FlowChart }  from '../ReactFlowChart'
import Node from './Node';
import Port from './Port';
import { FilterFlowContext, FlowContext } from "./FlowContext";
import EditOption from "./EditOption";
import styled from "styled-components";
import AddNodes from "./AddNodes";
import config from "./misc/config";
import Line from "./Line";
import EditQuestion from "./EditQuestion";


interface FilterFlowProps {
    sdk: FieldExtensionSDK;
    chart?: IChart;
}

var FlowWrapper = styled.div`
    position: relative;
`

const FilterFlow: React.FunctionComponent<FilterFlowProps> = (props) => {
    return <div>
        <FilterFlowContext sdk={props.sdk} chart={props.chart}>
            <FlowContext.Consumer>
                {context =>
                <>
                    {context.editingOption == null ? null : <EditOption />}
                    {context.editingNodeQuestion == null ? null : <EditQuestion />}
                    <FlowChart 
                        chart={context.chart}
                        config={config}
                        Components={{
                            NodeInner: Node,
                            Port: Port,
                            Link: Line
                        }}
                        callbacks={context.defaultCallbacks}
                    />
                    <AddNodes />
                </>
            }
            </FlowContext.Consumer>
        </FilterFlowContext>
    </div>
}

export default FilterFlow;