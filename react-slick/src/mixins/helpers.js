'use strict';

import ReactDOM from 'react-dom';

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
  }
};

export default helpers;