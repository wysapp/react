import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import Dom from '../utils/dom';
import CircleRipple from './CircleRipple';

const shift = ([, ...newArray]) => newArray;

class TouchRipple extends Component {

  static propTypes = {
    abortOnScroll: PropTypes.bool,
    centerRipple: PropTypes.bool,
    children: PropTypes.node,
    color: PropTypes.string,
    opacity: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    abortOnScroll: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.ignoreNextMouseDown = false;

    this.state = {
      hasRipples: false,
      nextKey: 0,
      ripples: [],
    };

  }

  start(event, isRippleTouchGenerated) {

    const theme = this.context.muiTheme.ripple;
    if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
      this.ignoreNextMouseDown = false;
      return;
    }

    let ripples = this.state.ripples;

    ripples = [...ripples, (
      <CircleRipple
        key={this.state.nextKey}
        style={!this.props.centerRipple ? this.getRippleStyle(event) : {}}
        color={this.props.color || theme.color}
        opacity={this.props.opacity}
        touchGenerated={isRippleTouchGenerated}
      />
    )];

    this.ignoreNextMouseDown = isRippleTouchGenerated;
    this.setState({
      hasRipples: true,
      nextKey: this.state.nextKey + 1,
      ripples: ripples,
    });
  }

  end() {
    const currentRipples = this.state.ripples;
    this.setState({
      ripples: shift(currentRipples),
    });

    if (this.props.abortOnScroll) {
      this.stopListeningForScrollAbort();
    }
  }

  handleMouseDown = (event) => {

    if (event.button === 0) {
      this.start(event, false);
    }
  }

  handleMouseUp = (event) => {
    this.end();
  }

  handleMouseLeave = (event) => {
    this.end();
  }

  handleTouchStart = (event) => {
    event.stopPropagation();
    // If the user is swiping (not just tapping), save the position so we can
    // abort ripples if the user appears to be scrolling.

    if(this.props.abortOnScroll && event.touches) {
      this.startListeningForScrollAbort(event);
      this.startTime = Date.now();
    }

    this.start(event, true);
  }


  handleTouchEnd = (event) => {

    this.end();
  }
  
  
  handleTouchMove = (event) => {
    const timeSinceStart = Math.abs(Date.now() - this.startTime);
    if (timeSinceStart > 300) {
      this.stopListeningForScrollAbort();
      return;
    }

    const deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY);
    const deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX);

    if ( deltaY > 6 || deltaX > 6) {
      let currentRipples = this.state.ripples;
      const ripple = currentRipples[0];
      const abortedRipple = React.cloneElement(ripple, {aborted: true});
      currentRipples = shift(currentRipples);
      currentRipples = [...currentRipples, abortedRipple];
      this.setState({ripples: currentRipples}, () => {
        this.end();
      });
    }
  }

  startListeningForScrollAbort(event) {
    this.firstTouchY = event.touches[0].clientY;
    this.firstTouchX = event.touches[0].clientX;

    document.body.addEventListener('touchmove', this.handleTouchMove);
  }

  stopListeningForScrollAbort() {
    document.body.removeEventListener('touchmove', this.handleTouchMove);
  }

  getRippleStyle(event) {
    
    const el = ReactDOM.findDOMNode(this);
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;
    const offset = Dom.offset(el);
    const isTouchEvent = event.touches && event.touches.length;
    const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
    const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
    const pointerX = pageX - offset.left;
    const pointerY = pageY - offset.top;

    const topLeftDiag = this.calcDiag(pointerX, pointerY);
    const topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
    const botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
    const botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);

    const rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );

    const rippleSize = rippleRadius * 2;
    const left = pointerX - rippleRadius;
    const top = pointerY - rippleRadius;

    return {
      directionInvariant: true,
      height: rippleSize,
      width: rippleSize,
      top: top,
      left: left,
    };
  }

  calcDiag(a, b) {
    return Math.sqrt((a*a) + (b*b));
  }

  render() {
    const {children, style} = this.props;
    const {hasRipples, ripples} = this.state;
    const {prepareStyles} = this.context.muiTheme;

    let rippleGroup;

    if (hasRipples) {
      const mergedStyles = Object.assign({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }, style);

      rippleGroup = (
        <ReactTransitionGroup style={prepareStyles(mergedStyles)}>
          {ripples}
        </ReactTransitionGroup>
      );
    }

    return (
      <div
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {rippleGroup}
        {children}
      </div>
    );
  }
}

export default TouchRipple;