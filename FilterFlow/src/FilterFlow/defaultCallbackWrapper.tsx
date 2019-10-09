import { IFlowChartCallbacks, IChart } from "../ReactFlowChart";
import { onDragNode, onLinkStart, onLinkMove, onLinkComplete, onLinkCancel, onPortPositionChange, onLinkMouseEnter, onLinkMouseLeave, onLinkClick, onCanvasClick, onDeleteKey, onNodeClick, onNodeSizeChange, onCanvasDrop } from "../ReactFlowChart/container/actions";
import { FieldExtensionSDK } from "contentful-ui-extensions-sdk";
import { TypedNode, PortColors, IExtFlowChartCallbacks, IOnModal } from "./FlowContext";

type defaultCallbackInputs = (input: {chart:IChart, callback:any,modal:IOnModal, sdk: FieldExtensionSDK}) => IExtFlowChartCallbacks ;

const defaultCallbacks : defaultCallbackInputs  = ({chart,callback,modal, sdk}) => {
    return {
        onDragNode: (args) => { 
            var updateChart = onDragNode(args) as any;
            callback(updateChart(chart));
        },
        onDragCanvas: (args) => {},
        onCanvasDrop: (args) => {
            var updateChart = onCanvasDrop(args) as any
            callback(updateChart(chart));
        },
        onLinkStart: (args) => {
            var updateChart = onLinkStart(args) as any
            callback(updateChart(chart));
        },
        onLinkMove: (args) => {
            var updateChart = onLinkMove(args) as any
            callback(updateChart(chart));
        },
        onLinkComplete: (args) => {
            var updateChart = onLinkComplete(args) as any
            callback(updateChart(chart));
        },
        onLinkCancel: (args) => {
            var updateChart = onLinkCancel(args) as any
            callback(updateChart(chart));
        },
        onPortPositionChange: (args) => {
            var updateChart = onPortPositionChange(args) as any
            callback(updateChart(chart));
        },
        onLinkMouseEnter: (args) => {
            var updateChart = onLinkMouseEnter(args) as any
            callback(updateChart(chart));
        },
        onLinkMouseLeave: (args) => {
            var updateChart = onLinkMouseLeave(args) as any
            callback(updateChart(chart));
        },
        onLinkClick: (args) => {
            var updateChart = onLinkClick(args) as any
            callback(updateChart(chart));
        },
        onCanvasClick: (args) => {
            var updateChart = onCanvasClick(args) as any
            callback(updateChart(chart));
        },
        onDeleteKey: (args) => {

            if(chart.selected.type == "node" && chart.selected.id == "start") return;


            modal("Är du säker på att du vill plocka bort elementet?",
                "Detta går inte att ångra",(e:any) => {
                if(!e) return;
                var updateChart = onDeleteKey(args) as any
                if(chart.selected.type == "port"){
                    Object.values(chart.nodes).forEach(node => {
                        var typednode = node as TypedNode;
                        var selected = Object.values(node.ports).filter(x => x.id == chart.selected.id);
                        if(selected.length == 1){
                            delete typednode.ports[chart.selected.id!]
                            Object.values(node.ports).forEach((p,i) => { 
                                p.properties.color = PortColors[i]
                                p.properties.index = (i + 1)
                                p.position = undefined;
                            });
                            var optionsToRemove = Object.values(typednode.properties.options).filter(x => x.portId == chart.selected.id)
                            optionsToRemove.forEach(x => delete typednode.properties.options[x.id]);
    
                            var linesToRemove = Object.values(chart.links).filter(x => x.from.portId == chart.selected.id)
                            linesToRemove.forEach(x => delete chart.links[x.id]);
                        }
    
                    })
                }
                callback(updateChart(chart));          

            });

            
            
        },
        onNodeClick: (args) => {
            var updateChart = onNodeClick(args) as any
            callback(updateChart(chart));
        },
        onNodeSizeChange: (args) => {
            var updateChart = onNodeSizeChange(args) as any
            callback(updateChart(chart));
        },
        onPortClick: (portId: string) => {
            chart.selected = {
                type: "port",
                id: portId
            }
            callback(chart);
        }
    }
};

export default defaultCallbacks;