import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { EntryCard, TextLink,DropdownListItem, DropdownList, ValidationMessage } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { getTitle, getContentType, getStatus } from './resolverEntryFields';

const webPageTypeId = "webpage";

const ValidationError = ({allowedTypes, contentTypes}) => {
  var types = allowedTypes.map(x => contentTypes.items.find(y => y.sys.id == x));
  return <ValidationMessage>Den infogade Webbsidan har inte en tillåten innehållstyp för detta fält.<br /> Detta fält förväntar sig följande typ(er): {types.map(x => x.name)}</ValidationMessage>
}

export const App = ({sdk}) => {
  const [value,setValue] = useState(sdk.field.getValue())
  const [allowedTypes] = useState((sdk.parameters.instance.allowedTypes || "").split(","))
  const [contentTypes,setContentTypes] = useState();
  const [isInvalid, setIsInvalid] = useState(false);
  const [valueEntry, setValueEntry] = useState(null);
  useEffect(() => {
    sdk.window.startAutoResizer();
    sdk.space.getContentTypes().then(x => setContentTypes(x));
    return () => {}
  },[])

  useEffect(() => {
    if(!value) return;
    sdk.space.getEntry(value.sys.id).then(e => setValueEntry(e));
    return () => {}
  },[value])

  const validate = async (sys) => {
    const entry = await sdk.space.getEntry(sys.id)
    
    if(entry.sys.contentType.sys.id != webPageTypeId){
      console.log("referenced contentType was not of type "+webPageTypeId);
      return false;
    }

    if(!allowedTypes.some(x => x == entry.fields.contentType.sv)){
      console.log("referenced contentType content was not of type(s), was "+entry.fields.contentType.sv,allowedTypes);
      return false;
    }
    
    return true;
  }

  const trySetValue = (val) =>{
    const sys = val.sys || val.entity.sys;

    validate(sys).then((success) => {
      if(!success){
        sdk.field.setInvalid(true)
        sdk.field.removeValue()
        setIsInvalid(true)
        return;
      }
      else{
        sdk.field.setInvalid(false)
        var obj = {sys: {
          type: 'Link', 
          id: sys.id,
          linkType: 'Entry'
        }};

        sdk.field.setValue(obj);
        setValue(obj);
        setIsInvalid(false);
      }
    })
  }

  

  if(!!!value){
    return <>
      <div className="empty">
        <TextLink icon="Plus" onClick={() => {
          sdk.navigator.openNewEntry("webpage", { slideIn: true }).then((val) => {
            trySetValue(val)
          })
        }}>Create new entry and link</TextLink>
        <TextLink icon="Link" onClick={() => {
          sdk.dialogs.selectSingleEntry({contentTypes:[webPageTypeId]}).then((val) => {
            trySetValue(val)
          })
        }}>Link existing entry</TextLink>
      </div>
      {isInvalid && <ValidationError allowedTypes={allowedTypes} contentTypes={contentTypes} />}
    </>
  }
  

  return <div className="hasValue">
    <EntryCard  loading={valueEntry == null} 
                contentType={getContentType(valueEntry,contentTypes)} 
                title={getTitle(valueEntry,contentTypes)} 
                status={getStatus(valueEntry)} size="small" 
                onClick={() => {
                  sdk.navigator.openEntry(value.sys.id, { slideIn: { waitForClose: true } })
                  .then(({ entity }) => {
                    trySetValue(entity)
                  })
                }}
                dropdownListElements={
                  <DropdownList>
                    <DropdownListItem onClick={() => {
                      sdk.navigator.openEntry(value.sys.id, { slideIn: { waitForClose: true } })
                        .then(({ entity }) => {
                          trySetValue(entity)
                        })
                    }}>Edit</DropdownListItem>
                    <DropdownListItem onClick={() => {
                      sdk.field.removeValue()
                      setValue(null);
                    }}>Remove</DropdownListItem>
                  </DropdownList>
                } 
        />
        </div>
  
}
init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});
