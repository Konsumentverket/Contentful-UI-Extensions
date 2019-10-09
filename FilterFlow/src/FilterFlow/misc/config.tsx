import { IConfig, IChart, IOnLinkCompleteInput } from "../../ReactFlowChart";



const config: IConfig =  {
    validateLink : ({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart })=>{
        if(toNodeId == "start") return false;
        var fromNode = chart.nodes[fromNodeId]
        var toNode = chart.nodes[toNodeId];
        var fromPort = fromNode.ports[fromPortId];
        
        var prevLinksFromPort = Object.values(chart.links).filter((l) => l.from.portId == fromPortId);
        //if we get the value of '2' we know that there was a prev link from the selected port
        if(prevLinksFromPort.length == 2) return false;

        if(fromPort.type == "input") return false;
        if(fromNode.id == toNode.id) return false;

        

        return true;
    }
}

export default config;