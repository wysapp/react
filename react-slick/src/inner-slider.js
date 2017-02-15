'use strict';

import React from 'react';
import EventHandlersMixin from './mixins/event-handlers';
import initialState from './initial-state';
import defaultProps from './default-props';
import classnames from 'classnames';
import assign from 'object-assign';

import {Track} from './track';

export var InnerSlider = React.createClass({
  mixins: [EventHandlersMixin],
  list: null,
  track: null,
  listRefHandler: function(ref) {
    this.list = ref;
  },
  trackRefHandler: function(ref) {
    this.track = ref;
  },
  getInitialState: function() {
    return Object.assign({}, initialState, {
      currentSlide: this.props.initialState
    });
  },

  getDefaultProps: function(){
    return defaultProps;
  },

  componentWillMount: function() {
    if (this.props.init) {
      this.props.init();
    }

    this.setState({
      mounted: true
    });

    var lazyLoadedList = [];
    for (var i = 0; i < React.Children.count(this.props.children); i++) {
      if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToScroll) {
        lazyLoadedList.push(i);
      }
    }

    if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
      this.setState({
        lazyLoadedList: lazyLoadedList
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.initialize(this.props);
    this.adaptHeight();

    if (!window){
      return;
    }

    if (window.addEventListener) {
      window.addEventListener('resize', this.onWindowResized);      
    } else {
      window.attachEvent('onresize', this.onWindowResized);
    }
  },

  render: function() {

    var className = classnames('slick-initialized','slick-slider', this.props.className, {
      'slick-vertical': this.props.vertical,
    });

    var trackProps = {
      fade: this.props.fade,
      cssEase: this.props.cssEase,
      speed: this.props.speed,
      infinite: this.props.infinite,
      centerMode: this.props.centerMode,
      focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
      currentSlide: this.state.currentSlide,
      lazyLoad: this.props.lazyLoad,
      lazyLoadedList: this.state.lazyLoadedList,
      rtl: this.props.rtl,
      slideWidth: this.state.slideWidth,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: this.props.slidesToScroll,
      slideCount: this.state.slideCount,
      trackStyle: this.state.trackStyle,
      variableWidth: this.props.variableWidth
    };

    var verticalHeightStyle = null;

    if (this.props.vertical) {
      verticalHeightStyle = {
        height: this.state.listHeight,
      };
    }

    var centerPaddingStyle =null;
    if (this.props.vertical === false ) {
      if (this.props.centerMode === true) {
        centerPaddingStyle = {
          padding: ('0px ' + this.props.centerPadding)
        };
      }
    } else {
      if(this.props.centerMode === true) {
        centerPaddingStyle = {
          padding: (this.props.centerPadding + ' 0px')
        };
      }
    }

    const listStyle = assign({}, verticalHeightStyle, centerPaddingStyle);


    return (
      <div 
        className={className}
        onMouseEnter={this.onInnerSliderEnter}
        onMouseLeave={this.onInnerSliderLeave}
        onMouseOver={this.onInnerSliderOver}
      >
        <div 
          ref={this.listRefHandler}
          className="slick-list"
          style={listStyle}
        >
          <Track ref={this.trackRefHandler} {...trackProps}>
            {this.props.children}
          </Track>
        </div>
      </div>
    );
  }
});