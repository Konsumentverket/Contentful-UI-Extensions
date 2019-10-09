import * as React from "react"
import styled from 'styled-components'
import { OptionProps } from "./Node"
import { IconButton, TextField, TextInput, FormLabel, Dropdown, DropdownListItem, DropdownList, Button } from "@contentful/forma-36-react-components"
import { FlowContext } from "./FlowContext"
import { IPort } from "../ReactFlowChart"

const EditOptionsContainer = styled.div`

    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #fff;
    z-index: 2;
    width: 100%;
    padding: 0px 15px 15px 15px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px #888;

    .dropdown{
        margin-top: 10px;
    }

`
const PortAlternative = styled.div`
    padding: 5px;
    min-width: 160px;
    color: #fff;
    border-radius: 5px;
    border: 1px solid transparent;
    user-select: none;
    :hover{
        box-shadow: 0px 0px 10px blue;
    }
    :active{
        border-color: #000;
    }
`;

const SelectedPort = styled.span`
    color: #fff;
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px;
    width: 20px;
    border: 2px solid #000;
    height: 20px;
    font-size: 10px;
`

const ActionsWrapper = styled.div`
    margin-top: 20px;
    position: relative;
    .save{
        margin-right: 10px;
    }
    .removeOption{
        position: absolute;
        right: 0px;
        bottom: 0px;
    }

`

const EditOption: React.FunctionComponent = () => {
    
    var context = React.useContext(FlowContext);

    const nodeId = context.editingOption!.nodeId;
    const portId = context.editingOption!.portId;
    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const [text, setText] = React.useState(context.editingOption!.text)
    const node = context.chart.nodes[nodeId];

    const optionRef = React.createRef<HTMLInputElement>();
    React.useEffect(() => {
        if(optionRef.current != null)
            optionRef.current.focus()
    },[])


    var port = null;
    if(portId){
        port = context.chart.nodes[nodeId].ports[portId]
    }

    const [selectedPort, setSelectedPort] = React.useState<IPort | null>(port)

    return <EditOptionsContainer>
        <h2>Redigera alternativ för: {node.properties.question}</h2>
        <TextInput id="text" name="text" width="full" inputRef={optionRef} placeholder="Alternativ" value={text} onChange={(e)=> {
            setText(e.target.value);
        }} />

        <Dropdown isOpen={dropdownOpen} 
            toggleElement={<Button 
                                size="small"
                                buttonType="muted"
                                indicateDropdown 
                                className="dropdown"
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    {selectedPort ? 
                                        <><span>Utgångspunkt: </span><SelectedPort style={{backgroundColor: selectedPort.properties.color}} > #{selectedPort.properties.index}</SelectedPort></> : 
                                        "Välj utgångspunkt"
                                    }
                            </Button>
                            }
            
        >
            <DropdownList>
                {Object.values(context.chart.nodes[nodeId].ports).filter((p) => p.type == "output").map((port) => {
                    return <DropdownListItem key={port.id}>
                                <PortAlternative 
                                    style={{backgroundColor: port.properties.color}} 
                                    onClick={() => {
                                        setSelectedPort(port);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    #{port.properties.index}
                                </PortAlternative>
                            </DropdownListItem>;
                })}
            </DropdownList>
        </Dropdown>
        <ActionsWrapper>
            <Button buttonType="positive" className="save" disabled={(selectedPort == null || text == undefined)} onClick={
                () => {

                    const option = context.editingOption!;
                    option.text = text;
                    option.portId = selectedPort!.id;
                    context.saveOption(option);
                }
            }>Spara</Button>
            <Button buttonType="negative" className="cancel" onClick={() => {
                context.editOption(null)
            }}>Avbryt</Button>

            <Button buttonType="negative" size="small" className="removeOption" onClick={() => {
                context.removeOption(nodeId,context.editingOption!.id);
                context.editOption(null);
            }}>Ta bort alternativ</Button>

        </ActionsWrapper>
    </EditOptionsContainer>;

}

export default EditOption;
