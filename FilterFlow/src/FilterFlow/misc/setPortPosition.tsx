import { IChart, IOnPortPositionChange, IPort } from "../../ReactFlowChart";

type setPortPositionInputs = (input: {chart:IChart, portPositionChange: IOnPortPositionChange, port: IPort}) => void;

const setPortPosition: setPortPositionInputs = ({chart, portPositionChange, port}) => {

    if(port.position != null) return;

    //if position is missing for the port we reset all positions
    for(var name in chart.nodes){
        const node = chart.nodes[name];
        for(var portName in node.ports){
            const port = node.ports[portName];
            var portEls = document.querySelectorAll('[data-portid="'+port.id+'"]');
                if(portEls.length == 0)
                    continue
                var el = portEls[0].parentElement as HTMLDivElement;                    
                var portsEl = el.parentElement as HTMLDivElement;
                portPositionChange({
                    node: node,
                    port: port,
                    el: el,
                    nodesEl: portsEl
                });

        }
    }
}


export default setPortPosition;