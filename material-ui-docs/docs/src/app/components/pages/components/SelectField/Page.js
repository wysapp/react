import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import selectFieldReadmeText from './README';

import SelectFieldExampleSimple from './ExampleSimple';
import selectFieldExampleSimpleCode from '!raw!./ExampleSimple';


import selectFieldCode from '!raw!material-ui/SelectField/SelectField';


const SelectFieldPage = () => (

  <div>
    <Title render={(previousTitle) => `Select Field - ${previousTitle}`} />
    <MarkdownElement text={selectFieldReadmeText} />
    <CodeExample
      title="Simple examples"
      code={selectFieldExampleSimpleCode}
    >
      <SelectFieldExampleSimple />
    </CodeExample>


    <PropTypeDescription code={selectFieldCode} />
  </div>
);

export default SelectFieldPage;