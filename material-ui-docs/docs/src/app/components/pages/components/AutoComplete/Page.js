import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import autoCompleteReadmeText from './README';
import autoCompleteCode from '!raw!material-ui/AutoComplete/AutoComplete';

import AutoCompleteExampleSimple from './ExampleSimple';
import autoCompleteExampleSimpleCode from '!raw!./ExampleSimple';

const AutoCompletesPage = () => (
  <div>
    <Title render={(previousTitle) => `Auto Complete - ${previousTitle}`} />
    
    <MarkdownElement text={autoCompleteReadmeText} />

    <CodeExample
      code={autoCompleteExampleSimpleCode}
      title="Simple example"
    >
      <AutoCompleteExampleSimple />
    </CodeExample>


    <PropTypeDescription code={autoCompleteCode} />
  </div>
);

export default AutoCompletesPage;
