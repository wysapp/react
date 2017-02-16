'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import {getTrackCSS, getTrackLeft} from './trackHelper';

var helpers = {
  initialize: function(props) {
    const slickList = ReactDOM.findDOMNode(this.list);
    var slideCount = React.Children.count(props.children);

    var listWidth = this.getWidth(slickList);
    var trackWidth= this.getWidth(ReactDOM.findDOMNode(this.track));
    var slideWidth;

    if (!props.vertical) {
      var centerPaddingAdj = props.centerMode && (parseInt(props.centerPadding) * 2);
      slideWidth = (this.getWidth(ReactDOM.findDOMNode(this)) - centerPaddingAdj) / props.slidesToShow;
    } else {
      slideWidth = this.getWidth(ReactDOM.findDOMNode(this));
    }

    const slideHeight = this.getHeight(slickList.querySelector('[data-index="0"]'));
    const listHeight = slideHeight * props.slidesToShow;

    var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;

    this.setState({
      slideCount,
      slideWidth,
      listWidth,
      trackWidth,
      currentSlide,
      slideHeight,
      listHeight,
    }, function() {
      
      var targetLeft = getTrackLeft(assign({
        slideIndex: this.state.currentSlide,
        trackRef: this.track
      }, props, this.state));

      var trackStyle = getTrackCSS(assign({left: targetLeft}, props, this.state));

      this.setState({trackStyle: trackStyle});

      this.autoPlay();
    });
  },
  getWidth: function(elem) {
    return elem.getBoundingClientRect().width || offsetWidth || 0;
  },
  getHeight: function(elem) {
    return elem.getBoundingClientRect().height || elem.offsetHeight || 0;
  },

  adaptHeight: function() {
    if (this.props.adaptiveHeight) {
      var selector = '[data-index="' + this.state.currentSlide + '"]';
      if (this.list) {
        var slickList = ReactDOM.findDOMNode(this.list);
        slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
      }
    }
  },

  canGoNext: function(opts) {
    var canGo = true;
    if (!opts.infinite) {
      if (opts.centerMode) {
        if (opts.currentSlide >= (opts.slideCount - 1)) {
          canGo = false;
        }
      } else {
        if (opts.slideCount <= opts.slidesToShow || opts.currentSlide >= (opts.slideCount - opts.slidesToShow)) {
          canGo = false;
        }
      }
    }
    return canGo;
  },

  play: function() {
    var nextIndex;

    if (!this.state.mounted) {
      return false;
    }

    if(this.props.rtl) {
      nextIndex = this.state.currentSlide - this.props.slidesToScroll;
    } else {
      if (this.canGoNext(Object.assign({}, this.props, this.state))) {
        nextIndex = this.state.currentSlide + this.props.slidesToScroll;
      } else {
        return false;
      }
    }

    this.slideHandler(nextIndex);
  },
  
  autoPlay: function() {
    if (this.state.autoPlayTimer) {
      clearTimeout(this.state.autoPlayTimer);      
    }

    if (this.props.autoPlay) {
      this.setState({
        autoPlayTimer: setTimeout(this.play, this.props.autoplaySpeed)
      });
    }
  }
};

export default helpers;