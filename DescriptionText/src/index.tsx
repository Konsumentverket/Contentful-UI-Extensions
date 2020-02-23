import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Textarea, Note } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK, init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import Markdown from 'markdown-to-jsx';
import { NoteProps } from "@contentful/forma-36-react-components/dist/components/Note/Note";

interface AppProps {
  sdk: FieldExtensionSDK & InstanceVariables;
}

interface InstanceVariables {
  parameters: {
    instance: {
      boxColor?: NoteProps['noteType']
      editRights?: string;
    }
  }
}

const App = ({ sdk }: AppProps) => {
  const boxColor = sdk.parameters.instance.boxColor ?? 'primary';

  const editorRoles = (sdk.parameters.instance.editRights ?? '')
    .split(',')
    .map(ed => ed.toLowerCase().trim());
  const isEditor = sdk.user.spaceMembership.admin || (sdk.user.spaceMembership.roles ?? [])
    .some(r => editorRoles.includes(r.name.toLowerCase()));

  const [value, setValue] = useState(sdk.field.getValue() ?? '');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    sdk.window.startAutoResizer();

    const noop = () => { };
    const detachExternalChangeHandler = sdk.field.onValueChanged(noop);

    return () => {
      if (detachExternalChangeHandler) {
        detachExternalChangeHandler();
      }
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
    value ? sdk.field.setValue(value) : sdk.field.removeValue();
  };

  const Description = () => (
    <Note noteType={boxColor} className='myNote'>
      <Markdown
        children={value}
        options={{
          createElement(type, props, children) {
            return React.createElement(type, props, children)
          }
        }}
      />
    </Note>
  );

  return (
    <div>
      {isEditor && <Button className='editButton' onClick={() => setEdit(!edit)}>Edit</Button>}
      {(edit && isEditor) ? (
        <Textarea
          rows={8}
          id='editArea'
          testId='editArea-test'
          name='editArea'
          value={value}
          onChange={onChange}
        />
      ) : (
          <Description />
        )}
    </div>
  );
};

init(sdk => {
  ReactDOM.render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
