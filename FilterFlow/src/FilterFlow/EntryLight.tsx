import { FlowContext } from "./FlowContext"
import React from "react";
import { EntryCard, DropdownList, DropdownListItem } from "@contentful/forma-36-react-components";
import entryStatus from "./misc/entryStatus";

export interface EntryLightProps {
    sys:any
    onRemove?:Function
}


const EntryLight: React.FunctionComponent<EntryLightProps> = ({sys,onRemove}) => {

    var context = React.useContext(FlowContext)

    const [entry,setEntry] = React.useState<any | null>(null);
    const [contentType,setContentType] = React.useState<any | null>(null)
    React.useEffect(()=> {
        let isMounted = true
        context.sdk.space.getEntry(sys.id).then(e => { 
            if(!isMounted) return;
            setEntry(e as any);
        })
        return () => {isMounted = false}
    },[sys.id])

    React.useEffect(() => {
        if(entry == null) return;
        let isMounted = true
        context.sdk.space.getContentType(entry.sys.contentType.sys.id).then(c => {
            if(!isMounted) return;
            setContentType(c);
        })
        return () => {isMounted = false}
    },[entry]);


    const loaded = entry != null && contentType != null;
    let title = ""
    if(loaded){
        var displayField = entry.fields[contentType.displayField];
        if(displayField != null){
            title = displayField[context.sdk.locales.default]
        }
    }

    var inputs:any ={}

    if(!!onRemove){
        var ddl = <DropdownList>  
            <DropdownListItem onClick={() => {
                onRemove(sys)
            }}>Remove</DropdownListItem>
        </DropdownList>
        inputs.dropdownListElements = ddl;
    }


    return loaded ? 
        <EntryCard title={title} 
                status={entryStatus(entry)} 
                contentType={contentType.name} 
                size="small" 
                {...inputs}
                
        /> 
        : 
        <EntryCard loading={true} size="small" />
}

export default EntryLight;