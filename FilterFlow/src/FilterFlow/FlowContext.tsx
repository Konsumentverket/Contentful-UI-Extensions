import React from "react";
import { DialogExtensionSDK } from "contentful-ui-extensions-sdk";
import { IChart, IFlowChartCallbacks, INode } from "../ReactFlowChart";
import { defaultChart } from "./defaultChart";
import defaultCallbacks from "./defaultCallbackWrapper";
import { v4 } from 'uuid'
import { Modal, Button } from "@contentful/forma-36-react-components";

interface FilterFlowContextProps {
    children?: React.ReactNode;
    sdk: DialogExtensionSDK;
    chart?: IChart;
  }

export interface IOption {
    id: string;
    text?:string; 
    portId?:string;
    nodeId:string;
    order:number;
    taxonomiSubLevels: Array<any> | null;
}

interface IModal {
    title: string,
    content: string,
    onClose: Function,
}
export type IOnModal = (title:string,content:string,onClose:Function) => void


export interface IExtFlowChartCallbacks extends IFlowChartCallbacks{
    onPortClick: (portId:string) => void
}

type ContextProps = { 
    chart: IChart,
    defaultCallbacks: IExtFlowChartCallbacks,
    editingOption: IOption | null | undefined,
    editingNodeQuestion: INode | null | undefined,
    sdk: DialogExtensionSDK

    //function
    addPort: (node:INode) => void,
    editOption: (option: IOption | null) => void,
    editNodeQuestion: (node: INode | null) => void,
    setChart: (chart: IChart) => void
    saveOption: (option: IOption) => void,
    saveNodeQuestion: (node:INode) => void,
    changeOptionsSort: (moved:string,to:string,nodeId:string) => void,
    removeOption: (nodeId:string,optionId:string) => void;
    openResultEntryDialog: (nodeId:string) => void;
    removeNodeEntry: (nodeId:string,entrykey:string) => void;
    openNodeExplanationTextEntryDialog: (callback:Function) => void;
    openNodeTaxonomiEntryDialog:  (callback:Function) => void;
    showModal: IOnModal
};

export interface TypedNode extends INode {
    properties: {
        options: { [id: string]: IOption },
        [key: string]: any
    }
};

export const FlowContext = React.createContext({} as ContextProps);

export const PortColors = ["#b3b300", "#9966CC", "#188781","#c5183b", "#CD853F", "#00422a", "#8B4513"]

export const FilterFlowContext: React.FunctionComponent<FilterFlowContextProps> = (props) => {

    const [chart,setChart] = React.useState(props.chart || defaultChart)
    const [editingOption, setEditingOption] = React.useState<IOption | null>();
    const [editingNodeQuestion, setEditingNodeQuestion] = React.useState<INode | null>();
    const [modal, setModal] = React.useState<IModal | null>();
    
    const setChartCallback = (newChart:IChart) => {
        setChart(Object.assign({},newChart));
    }
    const showModal = (title:string,content:string,onClose:Function) =>{
        setModal({
            title,
            content,
            onClose,
            
        })
    }


    const [callbacks] = React.useState(defaultCallbacks({chart,callback:setChartCallback,modal:showModal, sdk: props.sdk}))

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

        showModal("Är du säker?","",(b:boolean) => {
            if(b){
                delete chart.nodes[nodeId].properties.options[optionId]
                setChart(Object.assign({},chart));
            }
        })

        
    }

    const editNodeQuestion = (node:INode | null) => {
        setEditingNodeQuestion(node)
    }
    const saveNodeQuestion = (node:INode) => {
        chart.nodes[node.id] = node;
        setChart(Object.assign({},chart));
        setEditingNodeQuestion(null);
    }
    const openResultEntryDialog = (nodeId:string) => {
        var resultEntryStr = (props.sdk.parameters.invocation as any).resultEntrys as string;
        var resultEntrys = resultEntryStr.split(",");
        props.sdk.dialogs.selectSingleEntry({
            contentTypes: resultEntrys
        }).then((entry)=> {
            if(entry == null) return;
            chart.nodes[nodeId].properties.entry = (entry as any).sys
            setChart(Object.assign({},chart))
        })
    }
    const removeNodeEntry = (nodeId:string,entryKey:string) => {
        chart.nodes[nodeId].properties[entryKey] = null
        setChart(Object.assign({},chart))
    }

    const openNodeExplanationTextEntryDialog = (callback:Function) => {
        var explanationEntrysStr = (props.sdk.parameters.invocation as any).explanationEntrys as string;
        var explanationEntrys = explanationEntrysStr.split(",");
        props.sdk.dialogs.selectSingleEntry({
            contentTypes: explanationEntrys
        }).then((entry) => {
            if(entry == null) return;
            callback(entry)
        })
    }

    const openNodeTaxonomiEntryDialog = (callback:Function) => {
        var taxonomyEntrysStr = (props.sdk.parameters.invocation as any).taxonomyEntrys as string;
        var taxonomyEntrys = taxonomyEntrysStr.split(",");
        props.sdk.dialogs.selectSingleEntry({
            contentTypes: taxonomyEntrys
        }).then((entry) => {
            if(entry == null) return;
            callback(entry)
        })
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
        openResultEntryDialog: openResultEntryDialog,
        removeNodeEntry: removeNodeEntry,
        showModal: showModal,
        openNodeExplanationTextEntryDialog: openNodeExplanationTextEntryDialog,
        openNodeTaxonomiEntryDialog: openNodeTaxonomiEntryDialog,
        sdk: props.sdk
    }}>
        {modal == null ? null :
            <Modal title={modal.title} 
                onClose={(e:any) => {
                    setModal(null);
                    modal.onClose(e)
                }} 
                isShown={modal != null}
            >
                <>
                <Modal.Content>{modal == null ? "" : modal.content}</Modal.Content>
                <Modal.Controls>
                    <Button onClick={(e:any) => {
                        setModal(null);
                        modal.onClose(true)
                    }} buttonType="positive">
                        Ja
                    </Button>
                    <Button onClick={(e:any) => {
                        setModal(null);
                        modal.onClose(false)
                    }} buttonType="muted">
                        Nej
                    </Button>
                </Modal.Controls>
                </>
            </Modal>
        }
        {props.children}
    </FlowContext.Provider>
}

 