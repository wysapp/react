import React, {Component, PropTypes } from 'react';
import propTypes from '../utils/propTypes';
import transitions from '../styles/transitions';

function getStyles(props, context) {
  const {
    rounded,
    circle,
    transitionEnabled,
    zDepth,
  } = props;

  const {
    baseTheme,
    paper,
  } = context.muiTheme;

  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: paper.zDepthShadows[zDepth -1],
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
    },
  };
}


class Paper extends Component {
  static propTypes = {
    children: PropTypes.node,
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    style: PropTypes.object,
    transitionEnabled: PropTypes.bool,
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    circle: false,
    rounded: false,
    transitionEnabled: true,
    zDepth: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      circle,
      rounded,
      style,
      transitionEnabled,
      zDepth,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
   
    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    );
  }
}

export default Paper;