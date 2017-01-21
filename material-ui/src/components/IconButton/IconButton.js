import React, {Component, PropTypes } from 'react';
import transitions from '../styles/transitions';
import propTypes from '../utils/propTypes';
import EnhancedButton from '../internal/EnhancedButton';
import FontIcon from '../FontIcon';
import Tooltip from '../internal/Tooltip';
import {extendChildren} from '../utils/childUtils';


function getStyles(props, context) {
  const { baseTheme } = context.muiTheme;

  return {
    root: {
      boxSizing: 'border-box',
      overflow: 'visible',
      transition: transitions.easeOut(),
      padding: baseTheme.spacing.iconSize / 2,
      width: baseTheme.spacing.iconSize * 2,
      height: baseTheme.spacing.iconSize * 2,
      fontSize: 0,
    },
    tooltip: {
      boxSizing: 'border-box',
    },
    disabled: {
      color: baseTheme.palette.disabledColor,
      fill: baseTheme.palette.disabledColor,
      cursor: 'not-allowed',
    },
  };
}

class IconButton extends Component {
  static muiName = 'IconButton';

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disableTouchRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    hoveredStyle: PropTypes.object,
    href: PropTypes.string,
    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOut: PropTypes.func,
    onTouchStart: PropTypes.func,
    style: PropTypes.object,
    tooltip: PropTypes.node,
    tooltipPosition: propTypes.cornersAndCenter,
    tooltipStyles: PropTypes.object,
    touch: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    disableTouchRipple: false,
    iconStyle: {},
    tooltipPosition: 'bottom-center',
    touch: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    isKeyboardFocused: false,
    touch: false,
    tooltipShown: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.setState({hovered: false});
    }
  }

  setKeyboardFocus() {
    this.button.setKeyboardFocus();
  }


  showTooltip() {
    if (this.props.tooltip) {
      this.setState({tooltipShown: true});
    console.log('2222222222222222-IconButton-event-showTooltip');
      
    }
  }

  hideTooltip() {
    if (this.props.tooltip) this.setState({tooltipShown: false});
  }

  handleBlur = (event) => {
    console.log('2222222222222222-IconButton-event-handleBlur');
    this.hideTooltip();
    if(this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleFocus = (event) => {
    console.log('2222222222222222-IconButton-event-handleFocus');
    this.showTooltip();
    if(this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleMouseLeave = (event) => {
    console.log('2222222222222222-IconButton-event-handleMouseLeave');
    if (!this.button.isKeyboardFocused()) {
      this.hideTooltip();
    }

    this.setState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
    
  }

  handleMouseOut = (event) => {
    console.log('2222222222222222-IconButton-event-handleMouseOut');
    if (this.props.disabled) this.hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  }

  handleMouseEnter = (event) => {
    console.log('2222222222222222-IconButton-event-handleMouseEnter');
    this.showTooltip();

    if (!this.state.touch) {
      this.setState({hovered: true});
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  handleTouchStart = (event) => {
    this.setState({touch: true});

    if ( this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  handleKeyboardFocus = (event, isKeyboardFocused) => {
    console.log('2222222222222222-IconButton-event-handleKeyboardFocus');
    const { disabled, onFocus, onBlur, onKeyboardFocus} = this.props;
    if (isKeyboardFocused && !disabled) {
      this.showTooltip();
      if (onFocus) {
        onFocus(event);
      }
    } else {
      this.hideTooltip();
      if (onBlur) {
        onBlur(event);
      }
    }

    this.setState({isKeyboardFocused});
    if (onKeyboardFocus) {
      onKeyboardFocus(event, isKeyboardFocused);
    }
  }

  render() {

    const {
      disabled,
      hoveredStyle,
      disableTouchRipple,
      children,
      iconClassName,
      style,
      tooltip,
      tooltipPosition: tooltipPositionProp,
      tooltipStyles,
      touch,
      iconStyle,
      ...other
    } = this.props;

    let fonticon;

    const styles = getStyles(this.props, this.context);
    const tooltipPosition = tooltipPositionProp.split('-');

    const hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    const mergedRootStyles = Object.assign(
      styles.root,
      style,
      hovered ? hoveredStyle : {}
    );

    const tooltipElement = tooltip ? (
      <Tooltip 
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={Object.assign(styles.tooltip, tooltipStyles)}
        verticalPosition={tooltipPosition[0]}
        horizontalPosition={tooltipPosition[1]}
      />
    ) : null;


    if ( iconClassName) {
      const {
        iconHoverColor,
        ...iconStyleFontIcon
      } = iconStyle;

      fonticon = (
        <FontIcon 
          className={iconClassName}
          hoverColor={disabled ? null : iconHoverColor}
          style={Object.assign(
            {},
            disabled && styles.disabled,
            iconStyleFontIcon
          )}
          color={this.context.muiTheme.baseTheme.palette.textColor}
        >
          {children}
        </FontIcon>
      );
    }


    const childrenStyle = disabled ? Object.assign({}, iconStyle, styles.disabled) : iconStyle;

    return (
      <EnhancedButton 
        ref={(ref) => this.button = ref}
        {...other}
        centerRipple={true}
        disabled={disabled}
        onTouchStart={this.handleTouchStart}
        style={mergedRootStyles}
        disableTouchRipple={disableTouchRipple}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onKeyboardFocus={this.handleKeyboardFocus}
      >
        {tooltipElement}
        {fonticon}
        {extendChildren(children, {
          style: childrenStyle,
        })}
      </EnhancedButton>
    );
  }
}

export default IconButton;