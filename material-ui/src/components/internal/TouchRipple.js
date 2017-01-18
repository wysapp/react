import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

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
      >
        {rippleGroup}
        {children}
      </div>
    );
  }
}

export default TouchRipple;