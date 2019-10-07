import React, { useEffect } from "react";
import { FieldExtensionSDK } from "contentful-ui-extensions-sdk";
import { IChart, IFlowChartCallbacks, INode, IPort } from "../ReactFlowChart";
import { defaultChart } from "./defaultChart";
import defaultCallbacks from "./defaultCallbackWrapper";
import { v4 } from 'uuid'

interface FilterFlowContextProps {
    children?: React.ReactNode;
    sdk: FieldExtensionSDK;
    chart?: IChart;
  }

export interface IOption {
    id: string;
    text?:string; 
    portId?:string;
    nodeId:string;
    order:number
}

export interface IExtFlowChartCallbacks extends IFlowChartCallbacks{
    onPortClick: (portId:string) => void
}

type ContextProps = { 
    chart: IChart,
    defaultCallbacks: IExtFlowChartCallbacks,
    editingOption: IOption | null | undefined,
    editingNodeQuestion: INode | null | undefined,

    //function
    addPort: (node:INode) => void,
    editOption: (option: IOption | null) => void,
    editNodeQuestion: (node: INode | null) => void,
    setChart: (chart: IChart) => void
    saveOption: (option: IOption) => void,
    saveNodeQuestion: (node:INode) => void,
    changeOptionsSort: (moved:string,to:string,nodeId:string) => void,
    removeOption: (nodeId:string,optionId:string) => void;
    openResultEntryDialog: () => void;
};

export interface TypedNode extends INode {
    properties: {
        options: { [id: string]: IOption },
        [key: string]: any
    }
};

export const FlowContext = React.createContext({} as ContextProps);

export const PortColors = ["#CCCC00", "#9966CC", "#20B2AA","#E52B50", "#CD853F", "#00A86B", "#8B4513"]

export const FilterFlowContext: React.FunctionComponent<FilterFlowContextProps> = (props) => {

    const [chart,setChart] = React.useState(props.chart || defaultChart)
    const [editingOption, setEditingOption] = React.useState<IOption | null>();
    const [editingNodeQuestion, setEditingNodeQuestion] = React.useState<INode | null>();
    const setChartCallback = (newChart:IChart) => {
        setChart(Object.assign({},newChart));
    }
    const [callbacks] = React.useState(defaultCallbacks({chart,callback:setChartCallback, sdk: props.sdk}))

    //ADD PORT
    const addPort = (node:INode) => {
        var nodeData = chart.nodes[node.id];
        var portId = v4()
        var port = {
            id: portId,
            type: "output",
            properties:{
                color: "",
                index: 0
            }
        }
        nodeData.ports[portId] = port;
        var outputPorts = Object.values(nodeData.ports).filter((x) => x.type == "output");
        var index = outputPorts.map((p) => p.id).indexOf(portId);
        port.properties.color = PortColors[index]
        port.properties.index = ++index;
        setChart(Object.assign({},chart));
    }
    //ADD OPTION
    const editOption = (option:IOption | null) => {
        setEditingOption(option);
    }
    //SAVE OPTION
    const saveOption = (option:IOption) => {
        chart.nodes[option.nodeId].properties.options[option.id] = option;
        setChart(Object.assign({},chart));
        setEditingOption(null);
    }
    

    const changeOptionsSort = (moved:string,newLocation:string, nodeId:string) => {
        
        var node = chart.nodes[nodeId] as TypedNode;
        var options = Object.values(node.properties.options);
        var movedOption = chart.nodes[node.id].properties.options[moved] as IOption;
        var newLocationOption = chart.nodes[node.id].properties.options[newLocation] as IOption;
        movedOption.order = newLocationOption.order;

        options.filter(x => x.order > newLocationOption.order).forEach((e)=>{e.order = ++e.order})
        newLocationOption.order = ++newLocationOption.order
        setChart(Object.assign({},chart));
    }

    const removeOption = (nodeId:string,optionId:string) =>{
        delete chart.nodes[nodeId].properties.options[optionId]
        setChart(Object.assign({},chart));
    }

    const editNodeQuestion = (node:INode | null) => {
        setEditingNodeQuestion(node);
    }
    const saveNodeQuestion = (node:INode) => {
        chart.nodes[node.id] = node;
        setChart(Object.assign({},chart));
        setEditingNodeQuestion(null);
    }
    const openResultEntryDialog = () => {
        props.sdk.dialogs.selectSingleEntry().then((e)=> console.log(e))
    }

    return <FlowContext.Provider value={{
        chart: chart,
        defaultCallbacks: callbacks,
        editNodeQuestion: editNodeQuestion,
        editingNodeQuestion: editingNodeQuestion,
        addPort: addPort,
        editOption: editOption,
        setChart: setChartCallback,
        editingOption: editingOption,
        saveOption: saveOption,
        saveNodeQuestion: saveNodeQuestion,
        changeOptionsSort: changeOptionsSort,
        removeOption: removeOption,
        openResultEntryDialog: openResultEntryDialog
    }}>
        {props.children}
    </FlowContext.Provider>
}

 