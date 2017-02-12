import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import circleProgressReadmeText from './README';

import CircleProgressExampleSimple from './ExampleSimple';
import circleProgressExampleSimpleCode from '!raw!./ExampleSimple';

const descriptions = {
  indeterminate: 'By default, the indicator animates continuously.',
  determinate: 'In determinate mode, the indicator adjusts to show the percentage complete, ' +
  'as a ratio of `value`: `max-min`.',
};

const CircleProgressPage = () => (
  <div>
    <Title render={(previousTitle) => `Circular Progress - ${previousTitle}`} />
    <MarkdownElement text={circleProgressReadmeText} />
    
    <CodeExample
      title="Indeterminate progress"
      description={descriptions.indeterminate}
      code={circleProgressExampleSimpleCode}
    >
      <CircleProgressExampleSimple />
    </CodeExample>

  </div>
);

export default CircleProgressPage;