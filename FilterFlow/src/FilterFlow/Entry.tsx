import * as React from 'react'
import { EntryCard, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components'
import { FlowContext } from './FlowContext';
import entryStatus from './misc/entryStatus';

interface IEntryProps {
    sys: {
        id:string
        contentType:{
            sys:{
                id:string,
                linkType:string,
                type:string
            }

        }
    }
    onRemove: Function
}
const Entry: React.FunctionComponent<IEntryProps> = ({sys,onRemove}) => {
    
    if(sys == null) return null;
    const context = React.useContext(FlowContext)
    const [entry,setEntry] = React.useState<any | null>(null)
    const [contentType,setContentType] = React.useState<any | null>(null)
    
    React.useEffect(()=> {
        context.sdk.space.getContentType(sys.contentType.sys.id).then((c) => {
            setContentType(c as any)
        })
        context.sdk.space.getEntry(sys.id).then(e => { 
            setEntry(e as any);
        })
    },[sys.id])

    const loaded = entry != null && contentType != null;
    let title = ""
    if(loaded){
        
        var displayField = entry.fields[contentType.displayField];
        if(displayField != null){
            title = displayField[context.sdk.locales.default]
        }
    }

    return !loaded ? 
        <EntryCard loading={true} size="small" />   
        : 
        <EntryCard title={title} contentType={contentType.name} 
                    status={entryStatus(entry)} size="small" 
                    loading={entry == null || contentType == null}
                    dropdownListElements={
                        <>
                          <DropdownList>  
                            <DropdownListItem onClick={() => {
                                onRemove()
                            }}>Remove</DropdownListItem>
                          </DropdownList>
                        </>
                      }
        />
    
    


    
}

export default Entry;

/* <EntryCard
        title={text('title', 'Closer')}
        description={text(
          'description',
          'Closer is the second and final studio album by English rock band Joy Division. It was released on 18 July 1980 on Factory Records, following the May 1980 suicide of lead singer Ian Curtis. The album was produced by Martin Hannett.',
        )}
        status={select(
          'status',
          {
            Draft: 'draft',
            Changed: 'changed',
            Published: 'published',
            Archived: 'archived',
          },
          'published',
        )}
        contentType={text('contentType', 'Album')}
        onClick={!boolean('loading', false) ? action('onClick') : undefined}
        dropdownListElements={
          <React.Fragment>
            <DropdownList>
              <DropdownListItem isTitle>Actions</DropdownListItem>
              <DropdownListItem href="#">Edit (with href)</DropdownListItem>
              <DropdownListItem onClick={action('Download onClick')}>
                Download
              </DropdownListItem>
              <DropdownListItem onClick={action('Remove onClick')}>
                Remove
              </DropdownListItem>
            </DropdownList>
            <DropdownList>
              <DropdownListItem isTitle>Actions</DropdownListItem>
              <DropdownListItem onClick={action('Edit onClick')}>
                Edit
              </DropdownListItem>
              <DropdownListItem onClick={action('Download onClick')}>
                Download
              </DropdownListItem>
              <DropdownListItem onClick={action('Remove onClick')}>
                Remove
              </DropdownListItem>
            </DropdownList>
          </React.Fragment>
        }
        withDragHandle={boolean('withDragHandle', false)}
        isDragActive={boolean('isDragActive', false)}
        className={text('className', '')}
        loading={boolean('loading', false)}
        size={select(
          'size',
          {
            default: 'default',
            small: 'small',
          },
          'default',
        )}
      /> */