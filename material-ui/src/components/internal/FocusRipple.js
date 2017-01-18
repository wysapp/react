import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import transitions from '../styles/transitions';
import ScaleInTransitionGroup from './ScaleIn';

let pulsateDuration = 750;

class FocusRipple extends Component {
  static propTypes = {
    color: PropTypes.string,
    innerStyle: PropTypes.object,
    opacity: PropTypes.number,
    show: PropTypes.bool,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getRippleElement(props) {
    const {
      color,
      innerStyle,
      opacity,
    } = props;

    const {prepareStyles, ripple} = this.context.muiTheme;

    const innerStyles = Object.assign({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: opacity ? opacity : 0.16,
      backgroundColor: color || ripple.color,
      transition: transitions.easeOut(`${pulsateDuration}ms`, 'transform', null, transitions.easeInOutFunction),
    }, innerStyle);

    return <div ref="innerCircle" style={prepareStyles(Object.assign({}, innerStyles))} />;
  }

  render() {
    const {
      show,
      style,
    } = this.props;

    const mergedRootStyles = Object.assign({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    }, style);

    const ripple = show ? this.getRippleElement(this.props) : null;

    return (
      <ScaleInTransitionGroup
        maxScale={0.85}
        style={mergedRootStyles}
      >
        {ripple}
      </ScaleInTransitionGroup>
    );
  }
}

export default FocusRipple;