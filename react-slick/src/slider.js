'use strict';

import React from 'react';
import {InnerSlider} from './inner-slider';
import assign from 'object-assign';
import json2mq from 'json2mq';
import ResponsiveMixin from 'react-responsive-mixin';
import defaultProps from './default-props';

var Slider = React.createClass({
  mixins: [ResponsiveMixin],
  innerSlider: null,
  innerSliderRefHandler: function(ref) {
    this.innerSlider = ref;
  },
  getInitialState: function() {
    return {
      breakpoint: null
    };
  },

  render: function(){
    var settings;
    settings = assign({}, defaultProps, this.props);

    var children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }

    children = children.filter(function(child) {
      return !!child;
    })

    return (
      <InnerSlider ref={this.innerSliderRefHandler} {...settings}>
        {children}
      </InnerSlider>
    );
  }
});

module.exports = Slider;