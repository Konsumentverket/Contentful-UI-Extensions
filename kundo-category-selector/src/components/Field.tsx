import React,{useState} from 'react';
import { Button, Dropdown, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
}

interface KundoCategory{
  slug:string
  heading_name:string
}

const Field = (props: FieldProps) => {

  const [isOpen, setOpen] = useState(false);
  const [categories,setCategories] = useState<KundoCategory[]>([])
  const [value, setValue] = useState(props.sdk.field.getValue())

  React.useEffect(() => {
    const instance: any = props.sdk.parameters.instance
    fetch(`https://kundo.se/api/properties/${instance.kundoSlug}.json`)
    .then(x => x.json())
    .then(json => {
      setCategories(json[0].categories)
    })
  },[])
  

  if(categories.length === 0) return null;
  console.log(props)
  const displayValue = categories.some(x => x.slug === value) ?
                        categories.find(x => x.slug === value)?.heading_name : "Välj en kategori"

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      toggleElement={
        <Button
          size="small"
          buttonType="muted"
          indicateDropdown
          onClick={() => setOpen(!isOpen)}
        >
        {displayValue}
        </Button>
      }
    >
      <DropdownList>
        <DropdownListItem
            onClick={(e) => {
              setValue(null)
              setOpen(false)
              props.sdk.field.setValue(null)
            }} 
            isTitle={true}
            isActive={value == null}
          >
            Välj en kategori
        </DropdownListItem>
        {categories.map(c => 
          <DropdownListItem key={c.slug} 
            onClick={(e) => {
              setValue(c.slug)
              setOpen(false)
              props.sdk.field.setValue(c.slug)
            }} 
            isActive={c.slug === value}
          >
            {c.heading_name}
          </DropdownListItem>)
        }
      </DropdownList>
    </Dropdown>
  );
};

export default Field;
