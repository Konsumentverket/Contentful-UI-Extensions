import * as React from "react"
import styled from 'styled-components'
import { TextInput, Dropdown, DropdownListItem, DropdownList, Button, TextLink } from "@contentful/forma-36-react-components"
import { FlowContext } from "./FlowContext"
import { IPort } from "../ReactFlowChart"
import Entry from "./Entry"
import EntryLight from "./EntryLight"

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
    line-height: 22px;
    font-size: 11px;
    span{
        position:relative;
        top:-1px;
    }
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

const Label = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: #8091a5;
    margin-top:10px;
`


const EditOption: React.FunctionComponent = () => {
    
    var context = React.useContext(FlowContext);

    const nodeId = context.editingOption!.nodeId;
    const portId = context.editingOption!.portId;
    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const [taxonomiSysesDropdownOpen, setTaxonomiSysesDropdownOpen] = React.useState(false);
    const [text, setText] = React.useState(context.editingOption!.text)
    const node = context.chart.nodes[nodeId];
    const optionRef = React.createRef<HTMLInputElement>();

    
    const [taxonomiSyses, setTaxonomiSyses] = React.useState<Array<any> | null>()

    React.useEffect(() => {
        if(optionRef.current != null){
            optionRef.current.focus()
        }
        if(!!node.properties.taxonomiEntry){
            context.sdk.space.getEntry(node.properties.taxonomiEntry.id).then(e => {
                var entry = e as any;
                if(entry.sys.contentType.sys.id == "taxonomyTop"){
                    setTaxonomiSyses(entry.fields.subLevel[context.sdk.locales.default]);
                }
            })
        }
    },[])


    var port = null;
    if(portId){
        port = context.chart.nodes[nodeId].ports[portId]
    }

    const [selectedPort, setSelectedPort] = React.useState<IPort | null>(port)
    const [selectedTaxonomisubLevel, setSelectedTaxonomisubLevel] = React.useState<any | null>(context.editingOption!.taxonomiSubLevel)
    

    

    return <EditOptionsContainer>
        <h2>Redigera alternativ för: {node.properties.question}</h2>
        <TextInput id="text" name="text" width="full" inputRef={optionRef} placeholder="Alternativ" value={text} onChange={(e)=> {
            setText(e.target.value);
        }} />


        {selectedTaxonomisubLevel != null ? 
            <>
                <Label>Vald taxonomi:</Label>
                <EntryLight sys={selectedTaxonomisubLevel} onRemove={() => {
                    setSelectedTaxonomisubLevel(null)
                }} />
            </> 
        : 
            <Dropdown isOpen={taxonomiSysesDropdownOpen} toggleElement={
                <Button 
                size="small"
                buttonType="muted"
                indicateDropdown 
                className="dropdown"
                onClick={()=> {
                    setTaxonomiSysesDropdownOpen(!taxonomiSysesDropdownOpen)
                }}>
                    Välj taxonomi
                </Button>
            }>
                <DropdownList maxHeight={300}>
                    {taxonomiSyses != null ? taxonomiSyses.map((t) => {
                        return <DropdownListItem key={t.sys.id} onClick={()=> {
                            setSelectedTaxonomisubLevel(t.sys);
                            setTimeout(() =>{
                                setTaxonomiSysesDropdownOpen(false);
                            },10)
                            
                        }}>
                                    <EntryLight sys={t.sys} />
                                </DropdownListItem>
                    }) 
                    :
                    null
                    }
                </DropdownList>
            </Dropdown>
        }



        

        <Dropdown isOpen={dropdownOpen} 
            toggleElement={<Button 
                                size="small"
                                buttonType="muted"
                                indicateDropdown 
                                className="dropdown"
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    {selectedPort ? 
                                        <>
                                            <span>Utgångspunkt: </span>
                                            <SelectedPort style={{backgroundColor: selectedPort.properties.color}} > <span>#{selectedPort.properties.index}</span></SelectedPort>
                                        </> : 
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
                    option.taxonomiSubLevel = selectedTaxonomisubLevel
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
