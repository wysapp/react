import React, { Component, cloneElement, PropTypes} from 'react';
import transitions from '../styles/transitions';
import {fade} from '../utils/colorManipulator';
import {createChildFragment} from '../utils/childUtils';
import EnhancedButton from '../internal/EnhancedButton';

import Paper from '../Paper';

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && (props.label !== 0 && !props.label) && !props.icon) {
      return new Error(`Required prop label or children or icon was not specified in ${componentName}.`);
    }
  }
}

function getStyles(props, context, state) {
  const {
    baseTheme,
    button,
    raisedButton,
  } = context.muiTheme;

  const {
    disabled,
    disabledBackgroundColor,
    disabledLabelColor,
    fullWidth,
    icon,
    label,
    labelPosition,
    primary,
    secondary,
    style,
  } = props;

  const amount = (primary || secondary) ? 0.4 : 0.08;

  let backgroundColor = raisedButton.color;
  let labelColor = raisedButton.textColor;

  if (disabled) {
    backgroundColor = disabledBackgroundColor || raisedButton.disabledColor;
    labelColor = disabledLabelColor || raisedButton.disabledTextColor;
  } else if (primary) {
    backgroundColor = raisedButton.primaryColor;
    labelColor = raisedButton.primaryTextColor;
  } else if (secondary) {
    backgroundColor = raisedButton.secondaryColor;
    labelColor = raisedButton.secondaryTextColor;
  } else {
    if (props.backgroundColor) {
      backgroundColor = props.backgroundColor;
    }

    if (props.labelColor){
      labelColor = props.labelColor;
    }
  }

  const buttonHeight = style && style.height || button.height;
  const borderRadius = 2;

  return {
    root: {
      display: 'inline-block',
      transition: transitions.easeOut(),
      minWidth: fullWidth ? '100%' : button.minWidth,
    },
    button: {
      height: buttonHeight,
      lineHeight: `${buttonHeight}px`,
      width: '100%',
      padding: 0,
      borderRadius: borderRadius,
      transition: transitions.easeOut(),
      backgroundColor: backgroundColor,
      textAlign: 'center',
    },
    label: {
      position: 'relative',
      opacity: 1,
      fontSize: raisedButton.fontSize,
      letterSpacing: 0,
      textTransform: raisedButton.textTransform || button.textTransform || 'uppercase',
      fontWeight: raisedButton.fontWeight,
      margin: 0,
      userSelect: 'none',
      paddingLeft: icon && labelPosition !== 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: icon && labelPosition === 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      color: labelColor,
    },
    icon: {
      verticalAlign: 'middle',
      marginLeft: label && labelPosition !== 'before' ? 12 : 0,
      marginRight: label && labelPosition === 'before' ? 12 : 0,
    },
    overlay: {
      height: buttonHeight,
      borderRadius: borderRadius,
      backgroundColor: (state.keyboardFocused || state.hovered ) && !disabled && fade(labelColor, amount),
      transition: transitions.easeOut(),
      top: 0,
    },
    ripple: {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16,
    },
  };
}

class RaisedButton extends Component {
  static muiName = 'RaisedButton';

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,

    fullWidth: PropTypes.bool,

    label: validateLabel,

    labelColor: PropTypes.string,

    labelPosition: PropTypes.oneOf([
      'before',
      'after'
    ]),

    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    labelPosition: 'after',
    fullWidth: false,
    primary: false,
    secondary: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    keyboardFocused: false,
    touched: false,
    initialZDepth: 0,
    zDepth: 0,
  };

  componentWillMount() {
    const zDepth = this.props.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('raisedButton-event-componentWillReceiveProps');
    const zDepth = nextProps.disabled ? 0 : 1;
    const nextState = {
      zDepth: zDepth,
      initialZDepth: zDepth,
    };

    if (nextProps.disabled) {
      nextState.hovered = false;
    }

    this.setState(nextState);
  }

  handleMouseDown = (event) => {
    console.log('raisedButton-event-handleMouseDown');
    if (event.button === 0) {
      this.setState({
        zDepth: this.state.initialZDepth + 1,
      });
    }   

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
    
  }

  handleMouseUp = (event) => {
    console.log('raisedButton-event-handleMouseUp');
    this.setState({
      zDepth: this.state.initialZDepth,
    });
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
    
  }

  handleMouseLeave = (event) => {
    console.log('raisedButton-event-handleMouseLeave');
    if (!this.state.keyboardFocused) {
      this.setState({
        zDepth: this.state.initialZDepth,
        hovered: false,
      });
    }

    if(this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  handleMouseEnter = (event) => {
    console.log('raisedButton-event-handleMouseEnter');
    if (!this.state.keyboardFocused && !this.state.touched) {
      this.setState({
        hovered: true,
      });
    }

    if ( this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  handleTouchStart = (event) => {
    console.log('raisedButton-event-handleTouchStart');
    this.setState({
      touched: true,
      zDepth: this.state.initialZDepth + 1,
    });

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
    
  }
 
  
  handleTouchEnd = (event) => {
    console.log('raisedButton-event-handleTouchEnd');
    this.setState({
      touched: true,
      zDepth: this.state.initialZDepth,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  handleKeyboardFocus = (event, keyboardFocused) => {
    const zDepth = (keyboardFocused && !this.props.disabled) ? 
      this.state.initialZDepth + 1 :
      this.state.initialZDepth;
    
    this.setState({
      zDepth: zDepth,
      keyboardFocused: keyboardFocused,
    });

  }

  render() {
    console.log('uuuuuuuuuuuuuuuuuuuu', this.context.muiTheme);
    
    const {
      backgroundColor,
      buttonStyle,
      children,
      className,
      disabled,
      disabledBackgroundColor,
      disabledLabelColor,
      fullWidth,
      icon,
      label,
      labelColor,
      labelPosition,
      labelStyle,
      overlayStyle,
      primary,
      rippleStyle,
      secondary,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const mergedRippleStyles = Object.assign({}, styles.ripple, rippleStyle);

    console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', styles);
    console.log('raisedButton-other-props', other);

    const buttonEventHandlers = disabled ? {} : {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyboardFocus: this.handleKeyboardFocus,
    };

    const labelElement = label && (
      <span style={prepareStyles(Object.assign(styles.label, labelStyle))}>
        {label}
      </span>
    );

    const childrenFragment = labelPosition === 'before' ?
    {
      labelElement,
      children,
    } : {
      children,
      labelElement,
    };

    const enhancedButtonChildren = createChildFragment(childrenFragment);

    
    return (
      <Paper
        className={className}
        style={Object.assign(styles.root, style)}
        zDepth={this.state.zDepth}
      >
        <EnhancedButton 
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={Object.assign(styles.button, buttonStyle)}
          focusRippleColor={mergedRippleStyles.color}
          touchRippleColor={mergedRippleStyles.color}
          focusRippleOpacity={mergedRippleStyles.opacity}
          touchRippleOpacity={mergedRippleStyles.opacity}
        >
          <div 
            ref="overlay"
            style={prepareStyles(Object.assign(styles.overlay, overlayStyle))}
          >
            {enhancedButtonChildren}
          </div>
        </EnhancedButton>
      </Paper>
    );
  }

}

export default RaisedButton;