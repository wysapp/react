import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import SnackbarReadmeText from './README';

import SnackbarExampleSimple from './ExampleSimple';
import SnackbarExampleSimpleCode from '!raw!./ExampleSimple';


const descriptions = {
  simple: '`Snackbar` is a controlled component, and is displayed when `open` is `true`. Click away from the ' +
  'Snackbar to close it, or wait for `autoHideDuration` to expire.',
  action: 'A single `action` can be added to the Snackbar, and triggers `onActionTouchTap`. Edit the textfield to ' +
  'change `autoHideDuration`',
  consecutive: 'Changing `message` causes the Snackbar to animate - it isn\'t necessary to close and reopen the ' +
  'Snackbar with the open prop.',

};

const SnackbarPage = () => {
  return (
    <div>
      <Title render={(previousTitle) => `Snackbar - ${previousTitle}`} />
      <MarkdownElement text={SnackbarReadmeText} />

      <CodeExample
        title="Simple example"
        description={descriptions.simple}
        code={SnackbarExampleSimpleCode}
      >
        <SnackbarExampleSimple />
      </CodeExample>
    </div>
  );
}

export default SnackbarPage;