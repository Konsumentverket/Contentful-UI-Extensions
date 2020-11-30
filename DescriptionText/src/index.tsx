import React, { ChangeEvent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { FieldExtensionSDK, init } from 'contentful-ui-extensions-sdk'
import './index.css'
import Markdown from 'markdown-to-jsx'
import { createClient, Entry } from "contentful"
import env from './env.json'

interface AppProps {
  sdk: FieldExtensionSDK & InstanceVariables;
}

interface InstanceVariables {
  parameters: {
    instance: {
      boxColor?: string
      editRights?: string
      contentfulId?: string
    }
  }
}

const App = ({ sdk }: AppProps) => {
  const [value, setValue] = useState('')
  const [edit, setEdit] = useState(false)

  const boxColor = sdk.parameters.instance.boxColor ?? 'primary'
  const contentfulId = sdk.parameters.instance.contentfulId ?? 'none'
  const environment = sdk.ids.environment
  const space = sdk.ids.space

  const isUsingExternalDoc = contentfulId !== 'none'

  // console.log(sdk)
  // if (environment === 'prod-200323') {
  //   environment = 'master'
  // }

  const client = createClient({
    space: space,
    // environment: environment,
    accessToken: env.accessToken
  });


  const editorRoles = (sdk.parameters.instance.editRights ?? '')
    .split(',')
    .map(ed => ed.toLowerCase().trim())

  const isEditor = sdk.user.spaceMembership.admin || (sdk.user.spaceMembership.roles ?? [])
    .some(r => editorRoles.includes(r.name.toLowerCase()))


  useEffect(() => {
    sdk.window.startAutoResizer()

    const noop = () => { }
    const detachExternalChangeHandler = sdk.field.onValueChanged(noop)

    return () => {
      if (detachExternalChangeHandler) {
        detachExternalChangeHandler()
      }
    }
  }, []);

  useEffect(() => {
    if (isUsingExternalDoc) {
      client
        .getEntry(contentfulId)
        .then((entry: Entry<any>) =>
          setValue(entry.fields.documentation))
        .catch(err => console.log(err))
    } else {
      setValue(sdk.field.getValue() ?? '')
    }
  }, [])

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value
    setValue(value)
    value ? sdk.field.setValue(value) : sdk.field.removeValue()
  };

  const Description = () => (
    <div className='note' style={{ backgroundColor: boxColor }}>
      <Markdown
        children={value}
        options={{
          createElement(type, props, children) {
            return React.createElement(type, props, children)
          }
        }}
      />
    </div>
  );

  return (
    <div>
      {(edit && isEditor) ? (
        <><textarea
          rows={10}
          cols={80}
          id='editArea'
          name='editArea'
          value={value}
          onChange={onChange}
        /><br /></>
      ) : (
          <Description />
        )}
      {isEditor &&
        <button
          className='editButton'
          onClick={() => {
            if (isUsingExternalDoc) {
              window.open(`https://app.contentful.com/spaces/${space}/environments/${environment}/entries/${contentfulId}`)
            } else {
              setEdit(!edit)
            }
          }}>
          Edit
      </button>}
    </div>
  )
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
})
