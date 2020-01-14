import * as React from "react"
import styled from 'styled-components'
import { TextInput, Dropdown, DropdownListItem, DropdownList, Button, TextLink } from "@contentful/forma-36-react-components"
import { FlowContext } from "./FlowContext"
import { IPort } from "../ReactFlowChart"
import EntryLight from "./EntryLight"

const EditOptionsContainer = styled.div`

    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #fff;
    z-index: 10;
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

const EntryWrapper = styled.div`
    margin-top:5px;
`


const EditOption: React.FunctionComponent = () => {
    
    var context = React.useContext(FlowContext);

    const nodeId = context.editingOption!.nodeId;
    const portId = context.editingOption!.portId;
    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    
    const [text, setText] = React.useState(context.editingOption!.text)
    const node = context.chart.nodes[nodeId];
    const optionRef = React.createRef<HTMLInputElement>();

    const [taxonomiSysesDropdownOpen, setTaxonomiSysesDropdownOpen] = React.useState(false);
    //used for dropdown
    const [taxonomiSyses, setTaxonomiSyses] = React.useState<Array<any> | null>()
    const [selectedTaxonomisubLevels, setSelectedTaxonomisubLevels] = React.useState<Array<any> | null>(context.editingOption!.taxonomiSubLevels)
    
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

    React.useLayoutEffect(()=> {
        setTaxonomiSysesDropdownOpen(false);
    },[selectedTaxonomisubLevels])


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


        {selectedTaxonomisubLevels != null  && selectedTaxonomisubLevels.length > 0 ? 
            <>
                <Label>Valda taxonomier:</Label>
                
                {selectedTaxonomisubLevels.map((s) => {
                    
                    return <EntryWrapper key={s.id}><EntryLight sys={s} onRemove={(sys:any) => {
                        var newVals = selectedTaxonomisubLevels.filter((x) => {
                            return x.id !== sys.id;
                        });
                        setSelectedTaxonomisubLevels(newVals)
                    }} /></EntryWrapper>
                })}
            </> 
        : null }

        {taxonomiSyses != null && taxonomiSyses.length > 0 ?
            <Dropdown isOpen={taxonomiSysesDropdownOpen} toggleElement={
                <Button 
                size="small"
                buttonType="muted"
                indicateDropdown 
                className="dropdown"
                icon={"PlusCircle"}
                onClick={()=> {
                    setTaxonomiSysesDropdownOpen(!taxonomiSysesDropdownOpen)
                }}>
                    Lägg till taxonomi
                </Button>
            }>
                <DropdownList maxHeight={300}>
                    {taxonomiSyses.map((t) => {
                        return <DropdownListItem key={t.sys.id} onClick={()=> {
                            var levels = selectedTaxonomisubLevels;
                            if(levels == null || !Array.isArray(levels)){
                                levels=[];
                            }
                            levels.push(t.sys)
                            setSelectedTaxonomisubLevels([...levels]);
                        }}>
                            <EntryLight sys={t.sys} />
                        </DropdownListItem>
                    })}
                </DropdownList>
            </Dropdown>
            : null
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
                    console.log(selectedTaxonomisubLevels)
                    const option = context.editingOption!;
                    option.text = text;
                    option.portId = selectedPort!.id;
                    option.taxonomiSubLevels = selectedTaxonomisubLevels
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
