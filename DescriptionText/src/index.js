import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Textarea, Note} from '@contentful/forma-36-react-components';
import {init} from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import Markdown from 'markdown-to-jsx';

const App = (props) => {
    const boxColor = props.sdk.parameters.instance.boxColor ?? 'primary';

    const editorRoles = (props.sdk.parameters.instance.editRights ?? '')
        .split(',')
        .map(ed => ed.toLowerCase().trim());
    const isEditor = (props.sdk.user.spaceMembership.roles ?? [])
        .some(r => editorRoles.includes(r.name.toLowerCase()));

    const [value, setValue] = useState(props.sdk.field.getValue() ?? '');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        props.sdk.window.startAutoResizer();

        const noop = () => {};
        const detachExternalChangeHandler = props.sdk.field.onValueChanged(noop);

         return () => {
             if (detachExternalChangeHandler) {
                 detachExternalChangeHandler();
             }
         }
    }, []);

    const onChange = e => {
        const value = e.currentTarget.value;
        setValue(value);
        value ? props.sdk.field.setValue(value) : props.sdk.field.removeValue();
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
                    labelText=''
                    id='editArea'
                    testId='editArea-test'
                    name='editArea'
                    value={value}
                    onChange={onChange}/>
            ) : (
                <Description text={value}/>
            )}
        </div>
    );
};

init(sdk => {
    ReactDOM.render(<App sdk={sdk}/>, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
