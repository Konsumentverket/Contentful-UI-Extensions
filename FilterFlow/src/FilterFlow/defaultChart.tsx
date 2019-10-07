import { IChart } from "../ReactFlowChart";

export const defaultChart: IChart = {

    offset: {
        x: 0,
        y: 0,
    },
      nodes: {
        start: {
          id: 'start',
          properties : {
            question: "Detta är din första fråga som du bör ändra på",
            options: {}
          },
          type: 'output-only',
          position: {
            x: 100,
            y: 100,
          },
          ports: {
            
          }
        }
      },
      links: {},
      selected: {},
      hovered: {},
    
}