'use strict';

import React from 'react';
import Slider from '../src/slider';

import SimpleSlider from '../examples/SimpleSlider';

export default class App extends React.Component {
  render() {
    
    return (
      <div className="content">
        <SimpleSlider />
      </div>
    );
  }
}