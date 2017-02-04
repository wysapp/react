import React, {Component, PropTypes } from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import FocusRipple from './FocusRipple';
import TouchRipple from './TouchRipple';
import Paper from '../Paper';
import warning from 'warning';

function getStyles(props, context) {
  const {baseTheme } = context.muiTheme;

  return {
    root: {
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      position: 'relative',
      overflow: 'visible',
      display: 'table',
      height: 'auto',
      width: '100%',
    },
    input: {
      position: 'absolute',
      cursor: 'inherit',
      pointerEvents: 'all',
      opacity: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
      left: 0,
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
    },
    controls: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    label: {
      float: 'left',
      position: 'relative',
      display: 'block',
      width: 'calc(100% - 60px)',
      lineHeight: '24px',
      color: baseTheme.palette.textColor,
      fontFamily: baseTheme.fontFamily,
    },
    wrap: {
      transition: transitions.easeOut(),
      float: 'left',
      position: 'relative',
      display: 'block',
      flexShrink: 0,
      width: 60 - baseTheme.spacing.desktopGutterLess,
      marginRight: (props.labelPosition === 'right') ? baseTheme.spacing.desktopGutterLess : 0,
      marginLeft: (props.labelPosition === 'left') ? baseTheme.spacing.desktopGutterLess : 0,
    },
    ripple: {
      color: props.rippleColor || baseTheme.palette.primary1Color,
      height: '200%',
      width: '200%',
      top: -12,
      left: -12,
    },
  };
}

class EnhancedSwitch extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disableFocusRipple: PropTypes.bool,
    disableTouchRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    inputType: PropTypes.string.isRequired,
    label: PropTypes.node,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    labelStyle: PropTypes.object,
    name: PropTypes.string,
    
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onParentShouldUpdate: PropTypes.func,
    onSwitch: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    
    rippleColor: PropTypes.string,
    rippleStyle: PropTypes.object,
    style: PropTypes.object,
    switchElement: PropTypes.element.isRequired,
    switched: PropTypes.bool.isRequired,
    thumbStyle: PropTypes.object,
    trackStyle: PropTypes.object,
    value: PropTypes.any,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    isKeyboardFocused: false,
  };

  componentDidMount() {
    const inputNode = this.refs.checkbox;
    if ((!this.props.switched || inputNode.checked !== this.props.switched) && this.props.onParentShouldUpdate) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasCheckedProp = nextProps.hasOwnProperty('checked');
    const hasToggledProp = nextProps.hasOwnProperty('toggled');
    const hasNewDefaultProp = (nextProps.hasOwnProperty('defaultChecked') && (nextProps.defaultChecked !== this.props.defaultChecked));

    if (hasCheckedProp || hasToggledProp || hasNewDefaultProp) {
      const switched = nextProps.checked || nextProps.toggled || nextProps.defaultChecked || false;

      this.setState({
        switched: switched,
      });

      if (this.props.onParentShouldUpdate && switched !== this.props.switched) {
        this.props.onParentShouldUpdate(switched);
      }
    }
  }

  handleChange = (event) => {
    this.tabPressed = false;
    this.setState({
      isKeyboardFocused: false,
    });

    const isInputChecked = this.refs.checkbox.checked;

    if (!this.props.hasOwnProperty('checked') && this.props.onParentShouldUpdate) {
      this.props.onParentShouldUpdate(isInputChecked);
    }

    if (this.props.onSwitch) {
      this.props.onSwitch(event, isInputChecked);
    }
  }

  handleKeyDown = (event) => {
    const code = keycode(event);
    if (code === 'tab') {
      this.tabPressed = true;
    }

    if (this.state.isKeyboardFocused && code === 'space') {
      this.handleChange(event);
    }
  }

  handleKeyUp = (event) => {
    if (this.state.isKeyboardFocused && keycode(event) === 'space') {
      this.handleChange(event);
    }
  }

  handleMouseDown = (event) => {
    if (event.button === 0) {
      this.refs.touchRipple.start(event);
    }
  }

  handleMouseUp = () => {
    this.refs.touchRipple.end();
  }

  handleMouseLeave = () => {
    this.refs.touchRipple.end();
  }

  handleTouchStart = (event) => {
    this.refs.touchRipple.start(event);
  }

  handleTouchEnd = (event) => {
    this.refs.touchRipple.end();
  }



  handleBlur = (event) => {
    this.setState({
      isKeyboardFocused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleFocus = (event) =>{
    setTimeout(() => {
      if (this.tabPressed) {
        this.setState({
          isKeyboardFocused: true,
        });
      }
    }, 150);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  render() {
    const {
      name,
      value,
      iconStyle,
      inputStyle,
      inputType,
      label,
      labelStyle,
      labelPosition,
      
      onSwitch,
      onBlur,
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onParentShouldUpdate,
      disabled,
      disableTouchRipple,
      disableFocusRipple,
      className,
      rippleColor,
      rippleStyle,
      style,
      switched,
      switchElement,
      thumbStyle,
      trackStyle,
      ...other
    } = this.props;

    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const wrapStyles = Object.assign(styles.wrap, iconStyle);
    const mergedRippleStyle = Object.assign(styles.ripple, rippleStyle);

    if (thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    const labelElement = label && (
      <label style={prepareStyles(Object.assign(styles.label, labelStyle))}>
        {label}
      </label>
    );

    const showTouchRipple = !disabled && !disableTouchRipple;
    const showFocusRipple = !disabled && !disableFocusRipple;

    const touchRipple = (
      <TouchRipple  
        ref="touchRipple"
        key="touchRipple"
        style={mergedRippleStyle}
        color={mergedRippleStyle.color}
        muiTheme={this.context.muiTheme}
        centerRipple={true}
      />
    );

    const focusRipple = (
      <FocusRipple
        key="focusRipple"
        innerStyle={mergedRippleStyle}
        color={mergedRippleStyle.color}
        muiTheme={this.context.muiTheme}
        show={this.state.isKeyboardFocused}
      />
    );

    const ripples = [
      showTouchRipple ? touchRipple : null,
      showFocusRipple ? focusRipple : null
    ];

    const inputElement = (
      <input 
        {...other}
        ref="checkbox"
        type={inputType}
        style={prepareStyles(Object.assign(styles.input, inputStyle))}
        name={name}
        value={value}
        disabled={disabled}
        
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        onMouseUp={showTouchRipple && this.handleMouseUp}
        onMouseDown={showTouchRipple && this.handleMouseDown}
        onMouseLeave={showTouchRipple && this.handleMouseLeave}
        onTouchStart={showTouchRipple && this.handleTouchStart}
        onTouchEnd={showTouchRipple && this.handleTouchEnd}
      />
    );

    const switchOrThumbElement = !thumbStyle ? (
      <div style={prepareStyles(wrapStyles)}>
        {switchElement}
        {ripples}
      </div>
    ) : (
      <div style={prepareStyles(wrapStyles)}>
        <div style={prepareStyles(Object.assign({}, trackStyle))} />
        <Paper style={thumbStyle} zDepth={1} circle={true}> {ripples } </Paper>
      </div>
    );

    const elementsInOrder = labelPosition === 'right' ? (
      <div style={styles.controls}>
        {switchOrThumbElement}
        {labelElement}
      </div>
    ) : (
      <div style={styles.controls}>
        {labelElement}
        {switchOrThumbElement}
      </div>
    );

    return (
      <div ref="root" className={className} style={prepareStyles(Object.assign(styles.root, style))}>
        <EventListener
          target="window"
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        {inputElement}
        {elementsInOrder}
      </div>
    );

  }

}


export default EnhancedSwitch;

