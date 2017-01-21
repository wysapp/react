import React, { Component, PropTypes } from 'react';
import transitions from '../styles/transitions';

class SvgIcon extends Component {
  static muiName = 'SvgIcon';

  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object,
    viewBox: PropTypes.string,
  };

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    viewBox: '0 0 24 24',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
  };

  handleMouseLeave = (event) => {
    console.log('11111111111111111-SvgIcon-envet-handleMouseLeave');
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  }

  handleMouseEnter = (event) => {
    console.log('11111111111111111-SvgIcon-envet-handleMouseEnter');
    this.setState({hovered: true});
    this.props.onMouseEnter(event);
    
  }

  render() {
    const {
      children,
      color,
      hoverColor,
      onMouseEnter,
      onMouseLeave,
      style,
      viewBox,
      ...other
    } = this.props;
    
    const {
      svgIcon,
      prepareStyles,
    } = this.context.muiTheme;

    const offColor = color ? color : 'currentColor';
    const onColor = hoverColor ? hoverColor : offColor;

    const mergedStyles = Object.assign({
      display: 'inline-block',
      color: svgIcon.color,
      fill: this.state.hovered ? onColor : offColor,
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: transitions.easeOut(),
    }, style);

    return (
      <svg 
        {...other}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={prepareStyles(mergedStyles)}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  }
}

export default SvgIcon;