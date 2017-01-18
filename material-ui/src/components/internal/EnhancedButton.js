import React, {Component, PropTypes} from 'react';
import {createChildFragment} from '../utils/childUtils';
import Events from '../utils/events';
import keycode from 'keycode';
import FocusRipple from './FocusRipple';
import TouchRipple from './TouchRipple';


let styleInjected = false;
let listening = false;
let tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    const style = document.createElement('style');
    style.innerHTML = `
      button::-moz-focus-inner,
      input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
    `;

    document.body.appendChild(style);
    styleInjected = true;
  }
}


function listenForTabPresses() {
  if (!listening) {
    Events.on(window, 'keydown', (event) => {
      console.log('window-event-tab-keydown-000000000000000000000000');
      tabPressed = keycode(event) === 'tab';
    });

    listening = true;
  }
}

class EnhancedButton extends Component {
  static propTypes = {
    centerRipple: PropTypes.bool,
    children: PropTypes.node,
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    disableFocusRipple: PropTypes.bool,
    disableKeyboardFocus: PropTypes.bool,
    disableTouchRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    focusRippleColor: PropTypes.string,
    focusRippleOpacity: PropTypes.number,
    href: PropTypes.string,
    keyboardFocused: PropTypes.bool,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onTouchTap: PropTypes.func,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    touchRippleColor: PropTypes.string,
    touchRippleOpacity: PropTypes.number,
    type: PropTypes.string,
  };

  static defaultProps = {
    containerElement: 'button',
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyboardFocus: () => {},
    onTouchTap: () => {},
    tabIndex: 0,
    type: 'button',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    isKeyboardFocused: false,
  };

  componentWillMount() {
    const { disabled, disableKeyboardFocus, keyboardFocused} = this.props;
    
    if (!disabled && keyboardFocused && !disableKeyboardFocus) {
      this.setState({isKeyboardFocused: true});
    }
  }

  componentDidMount() {
    injectStyle();
    listenForTabPresses();
    if ( this.state.isKeyboardFocused) {
      this.refs.enhancedButton.focus();
      this.props.onKeyboardFocus(null, true);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  setKeyboardFocus(event) {
    if (!this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: true});
      this.props.onKeyboardFocus(event, true);
    }
  }

  createButtonChildren() {
    const {
      centerRipple,
      children,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      touchRippleColor,
      touchRippleOpacity,
    } = this.props;

    const {isKeyboardFocused } = this.state;

    const focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? (
      <FocusRipple 
        color={focusRippleColor}
        opacity={focusRippleOpacity}
        show={isKeyboardFocused}
      />
    ) : undefined;

    const touchRipple = !disabled && !disableTouchRipple ? 
      (
        <TouchRipple 
          centerRipple={centerRipple}
          color={touchRippleColor}
          opacity={touchRippleOpacity}
        >
          {children}
        </TouchRipple>
      ) : undefined;
    
    return createChildFragment({
      focusRipple,
      touchRipple,
      children: touchRipple ? undefined : children,
    });
  }

  handleBlur = (event) => {
    console.log('raisedButton-event-onBlur');
  }

  handleFocus = (event) => {
    
    if (event) event.persist();
    if ( !this.props.disabled && !this.props.disableKeyboardFocus) {
      // setTimeout is needed because the focus event fires first
      // Wait so that we can capture if this was a keyboard focus
      // or touch focus
      this.focusTimeout = setTimeout(() => {
        if (tabPressed) {
          this.setKeyboardFocus(event);
          tabPressed = false;
        }
      }, 150);

      this.props.onFocus(event);
    }
  }

  handleTouchTap = (event) => {
    // this.cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      console.log('cccccccccccccccccccccccccccccc');
      // this.removeKeyboardFocus(event);
      this.props.onTouchTap(event);
    }
  }

  render() {
    const {
      centerRipple,
      children,
      containerElement,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      href,
      keyboardFocused,
      touchRippleColor,
      touchRippleOpacity,
      onBlur,
      onClick,
      onFocus,
      onKeyUp,
      onKeyDown,
      onKeyboardFocus,
      onTouchTap,
      style,
      tabIndex,
      type,
      ...other
    } = this.props;

    console.log('ooooooooooooooooooooooooooooooooooo');

    const {
      prepareStyles,
      enhancedButton,
    } = this.context.muiTheme;

    const mergedStyles = Object.assign({
      border: 10,
      boxSizing: 'border-box',
      display: 'inline-block',
      fontFamily: this.context.muiTheme.baseTheme.fontFamily,
      WebkitTapHighlightColor: enhancedButton.tapHighlightColor,
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      margin: 0,
      padding: 0,
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      position: 'relative',
      verticalAlign: href ? 'middle' : null,
    }, style);

    if (!mergedStyles.backgroundColor && !mergedStyles.background) {
      mergedStyles.background = 'none';
    }

    if(disabled && href) {
      return (
        <span 
          {...other}
          style={mergedStyles}
          >
          {children}
        </span>
      );
    }

    const buttonProps = {
      ...other,
      style: prepareStyles(mergedStyles),
      ref: 'enhancedButton',
      disabled: disabled,
      href: href,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onTouchTap: this.handleTouchTap,
      tabIndex: disabled || disableKeyboardFocus ? -1 : tabIndex,
    };

    const buttonChildren = this.createButtonChildren();

    if ( React.isValidElement(containerElement)) {
      return React.cloneElement(containerElement, buttonProps, buttonChildren);
    }

    if (!href && containerElement === 'button') {
      buttonProps.type = type;
    }
    
    return React.createElement(href ? 'a' : containerElement, buttonProps, buttonChildren);
  }
}

export default EnhancedButton;