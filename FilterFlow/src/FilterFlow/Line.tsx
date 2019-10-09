// import * as React from "react"
// import styled from 'styled-components'


// import { FlowContext } from "./FlowContext";
// import { ILinkDefaultProps, LinkDefault } from "../ReactFlowChart";



// const Line: React.FunctionComponent<ILinkDefaultProps> = (props) => {

//     var context = React.useContext(FlowContext)
    
//     return <LinkDefault {...props} />
// }

// export default Line;

import * as React from 'react'
import { IConfig, ILink, IPosition, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnLinkClick, generateCurvePath } from '../ReactFlowChart'
import { FlowContext } from './FlowContext'

export interface ILinkDefaultProps {
  config: IConfig
  link: ILink
  startPos: IPosition
  endPos: IPosition
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
}

const Line = ({
  config,
  link,
  startPos,
  endPos,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isHovered,
  isSelected,
}: ILinkDefaultProps) => {
    var context = React.useContext(FlowContext)
    const points = generateCurvePath(startPos, endPos)
    const fromNodeId = link.from.nodeId;
    const fromPortId = link.from.portId;

    var fromPort = context.chart.nodes[fromNodeId].ports[fromPortId]
    var color = fromPort.properties.color;
    return (
    <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
        <circle
        r="4"
        cx={startPos.x}
        cy={startPos.y}
        fill={color}
        />
        {/* Main line */}
        <path
        d={points}
        stroke={color}
        strokeWidth="3"
        fill="none"
        />
        {/* Thick line to make selection easier */}
        <path
        d={points}
        stroke={color}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
        onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
        onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
        onClick={(e) => {
            onLinkClick({ config, linkId: link.id })
            e.stopPropagation()
        } }
        />
        <circle
        r="4"
        cx={endPos.x}
        cy={endPos.y}
        fill={color}
        />
    </svg>
  )
}

export default Line;