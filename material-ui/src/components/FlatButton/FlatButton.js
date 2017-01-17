import React, {Component, PropTypes} from 'react';

import FlatButtonLabel from './FlatButtonLabel';


class FlatButton extends Component {
  static muiName = 'FlatButton';
  
  static propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    hoverColor: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    label: validateLabel,
    labelPosition: PropTypes.oneOf([
      'before',
      'after',
    ]),
    labelStyle: PropTypes.object,

    onKeyboardFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTouchStart: PropTypes.func,
    primary: PropTypes.bool,
    rippleColor: PropTypes.string,
    secondary: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    disabled: false,
    labelStyle: {},
    labelPosition: 'after',
    onKeyboardFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onTouchStart: () => {},
    primary: false,
    secondary: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    isKeyboardFocused: false,
    touch: false,
  };

  render() {
    const {
      children,
      disabled,
      hoverColor,
      backgroundColor,
      icon,
      label,
      labelStyle,
      labelPosition,
      primary,
      rippleColor,
      secondary,
      style,
      ...other
    } = this.props;

    const {
      button: {
        height: buttonHeight,
        minWidth: buttonMinWidth,
        textTransform: buttonTextTransform,
      },
      flatButton: {
        buttonFilterColor,
        color: buttonColor,
        disabledTextColor,
        fontSize,
        fontWeight,
        primaryTextColor,
        secondaryTextColor,
        textColor,
        textTransform = buttonTextTransform || 'uppercase',
      },
    } = this.context.muiTheme;

    const defaultTextColor = disabled ? disabledTextColor :
      primary ? primaryTextColor :
        secondary ? secondaryTextColor :
        textColor;
    
    const defaultHoverColor = fade(buttonFilterColor, 0.2);
    const defaultRippleColor = buttonFilterColor;
    const buttonHoverColor = hoverColor || defaultHoverColor;
    const buttonRippleColor = rippleColor || defaultRippleColor;
    const buttonBackgroundColor = backgroundColor || buttonColor;
    const hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    const mergedRootStyles = Object.assign({}, {
      height: buttonHeight,
      lineHeight: `${buttonHeight}px`,
      minWidth: buttonMinWidth,
      color: defaultTextColor,
      transition: transitions.easeOut(),
      borderRadius: 2,
      userSelect: 'none',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
      padding: 0,
      margin: 0,
      textAlign: 'center',
    }, style);

    let iconCloned;
    const labelStyleIcon = {};

    if ( icon) {
      const iconStyles = Object.assign({
        verticalAlign: 'middle',
        marginLeft: label && labelPosition !== 'before' ? 12 : 0,
        marginRight: label && labelPosition === 'before' ? 12 : 0,
      }, icon.props.style);
      
      iconCloned = React.cloneElement(icon, {
        color: icon.props.color || mergedRootStyles.color,
        style: iconStyles,
      });

      if(labelPosition === 'before') {
        labelStyleIcon.paddingRight = 8;
      } else {
        labelStyleIcon.paddingLeft = 8;
      }
    }

    const mergedLabelStyles = Object.assign({
      letterSpacing: 0,
      textTransform: textTransform,
      fontWeight: fontWeight,
      fontSize: fontSize,
    }, labelStyleIcon, labelStyle);

    const labelElement = label ? (
      <FlatButtonLabel label={label} style={mergedLabelStyles} />
    ) : undefined;

    const childrenFragment = labelPosition === 'before' ?
    {
      labelElement,
      iconCloned,
      children,
    } : 
    {
      children,
      iconCloned,
      labelElement
    };

    const enhancedButtonChildren = createChildFragment(childrenFragment);

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        focusRippleOpacity={0.3}
        >
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  }
}

export default FlatButton;