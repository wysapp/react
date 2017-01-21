import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

class CircleRipple extends Component {
  static propTypes = {
    aborted: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    style: PropTypes.object,
    touchGenerated: PropTypes.bool,
  };

  static defaultProps = {
    opacity: 0.1,
    aborted: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    console.log('666666666666666666-CircleRipple-componentWillMount');
  }

  componentDidMount() {
    console.log('666666666666666666-CircleRipple-componentDidMount');
  }

  shouldComponentUpdate(nextProps) {
    console.log('666666666666666666-CircleRipple-shouldComponentUpdate');
    return !shallowEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    console.log('666666666666666666-CircleRipple-componentWillUnmount');
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    console.log('666666666666666666-CircleRipple-componentWillAppear', callback);
    this.initializeAnimation(callback);
  }

  componentWillEnter(callback) {
    console.log('666666666666666666-CircleRipple-componentWillEnter', callback);
    this.initializeAnimation(callback);
    
  }

  componentDidAppear() {
    console.log('666666666666666666-CircleRipple-componentDidAppear');
    this.animate();
  }

  componentDidEnter() {
    console.log('666666666666666666-CircleRipple-componentDidEnter');
    this.animate();
  }

  componentWillLeave(callback) {
    console.log('666666666666666666-CircleRipple-componentWillLeave', callback);
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    const removeAfter = this.props.aborted ? 0 : 2000;
    this.enterTimer = setTimeout(callback, removeAfter);
  }

  animate() {
    const style = ReactDOM.findDOMNode(this).style;
    const transitionValue = `${transitions.easeOut('2s', 'opacity')}, ${transitions.easeOut('1s', 'transform')}`;
    autoPrefix.set(style, 'transition', transitionValue);
    autoPrefix.set(style, 'transform', 'scale(1)');
  }

  initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    autoPrefix.set(style, 'transform', 'scale(0)');
    this.leaveTimer = setTimeout(callback, 0);
  }



  render() {
    const {
      aborted,
      color,
      opacity,
      style,
      touchGenerated,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedStyles = Object.assign({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedStyles)} />
    );
  }
}

export default CircleRipple;