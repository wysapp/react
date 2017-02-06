import React, { Component, PropTypes } from 'react';
import transitions from '../styles/transitions';
import {fade } from '../utils/colorManipulator';
import EnhancedButton from '../internal/EnhancedButton';
import FontIcon from '../FontIcon';
import Paper from '../Paper';
import {extendChildren} from '../utils/childUtils';
import warning from 'warning';
import propTypes from '../utils/propTypes';


function getStyles(props, context) {
  const {floatingActionButton} = context.muiTheme;

  let backgroundColor = props.backgroundColor || floatingActionButton.color;
  let iconColor = floatingActionButton.iconColor;

  if (props.disabled) {
    backgroundColor = props.disabledColor || floatingActionButton.disabledColor;
    iconColor = floatingActionButton.disabledTextColor;
  } else if (props.secondary) {
    backgroundColor = floatingActionButton.secondaryColor;
    iconColor = floatingActionButton.secondaryIconColor;
  }

  return {
    root: {
      transition: transitions.easeOut(),
      display: 'inline-block',
      backgroundColor: 'transparent',
    },
    container: {
      backgroundColor,
      transition: transitions.easeOut(),
      height: floatingActionButton.buttonSize,
      width: floatingActionButton.buttonSize,
      padding: 0,
      overflow: 'hidden',
      borderRadius: '50%',
      textAlign: 'center',
      verticalAlign: 'bottom',
    },
    containerWhenMini: {
      height: floatingActionButton.miniSize,
      width: floatingActionButton.miniSize,
    },
    overlay: {
      transition: transitions.easeOut(),
      top: 0,
    },
    overlayWhenHovered: {
      backgroundColor: fade(iconColor, 0.4),
    },
    icon: {
      height: floatingActionButton.buttonSize,
      lineHeight: `${floatingActionButton.buttonSize}px`,
      fill: iconColor,
      color: iconColor,
    },
    iconWhenMini: {
      height: floatingActionButton.miniSize,
      lineHeight: `${floatingActionButton.miniSize}px`,
    }
  };
}

class FloatingActionButton extends Component{
  static propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledColor: PropTypes.string,
    href: PropTypes.string,
    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,
    mini: PropTypes.bool,

    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,

    secondary: PropTypes.bool,
    style: PropTypes.object,
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    disabled: false,
    mini: false,
    secondary: false,
    zDepth: 2,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    touch: false,
    zDepth: undefined,
  };

  componentWillMount() {
    this.setState({
      zDepth: this.props.disabled ? 0 : this.props.zDepth,
    });
  }

  componentDidMount() {
    warning(!this.props.iconClassName || !this.props.children,
      'Material-UI: You have set both an iconClassName and a child icon. ' +
      'It is recommended you use only one method when adding ' +
      'icons to FloatingActionButtons.');
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {};

    if (nextProps.disabled !== this.props.disabled) {
      nextState.zDepth = nextProps.disabled ? 0 : this.props.zDepth;
    }

    if (nextProps.disabled) {
      nextState.hovered = false;
    }

    this.setState(nextState);
  }

  handleMouseDown = (event) => {
    if (event.button === 0) {
      this.setState({zDepth: this.props.zDepth + 1});
    }
    if(this.props.onMouseDown) this.props.onMouseDown(event);
  }

  handleMouseUp = (event) => {
    this.setState({zDepth: this.props.zDepth});
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  }

  handleMouseLeave = (event) => {
    if (!this.refs.container.isKeyboardFocused()) {
      this.setState({zDepth: this.props.zDepth, hovered: false});
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  handleMouseEnter = (event) => {
    if (!this.refs.container.isKeyboardFocused() && !this.state.touch) {
      this.setState({hovered: true});
    }

    if(this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  handleTouchStart = (event) => {
    this.setState({
      touch: true,
      zDepth: this.props.zDepth + 1,
    });

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }


  handleTouchEnd = (event) => {
    this.setState({
      touch: true,
      zDepth: this.props.zDepth,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({zDepth: this.props.zDepth + 1});
      this.refs.overlay.style.backgroundColor = fade(getStyles(this.props, this.context).icon.color, 0.4);
    } else if (!this.state.hovered) {
      this.setState({zDepth: this.props.zDepth});
      this.refs.overlay.style.backgroundColor = 'transparent';
    }
  }
  

  render() {
    const {
      backgroundColor,
      className,
      children: childrenProp,
      disabled,
      mini,
      secondary,
      iconStyle,
      iconClassName,
      zDepth,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let iconElement;
    if (iconClassName) {
      iconElement = (
        <FontIcon 
          className={iconClassName}
          style={Object.assign({},
            styles.icon,
            mini && styles.iconWhenMini,
            iconStyle
          )}
        />
      );
    }

    let children;

    if (childrenProp) {
      children = extendChildren(childrenProp, (child) => ({
        style: Object.assign({},
          styles.icon,
          mini && styles.iconWhenMini,
          iconStyle,
          child.props.style
        ),
      }));
    }

    const buttonEventHandlers = disabled ? null : {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyboardFocus: this.handleKeyboardFocus,
    };

    return (
      <Paper 
        className={className}
        style={Object.assign(styles.root, this.props.style)}
        zDepth={this.state.zDepth}
        circle={true}
      >
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={Object.assign(
            styles.container,
            this.props.mini && styles.containerWhenMini,
            iconStyle
          )}
          focusRippleColor={styles.icon.color}
          touchRippleColor={styles.icon.color}
        >
          <div 
            ref="overlay"
            style={prepareStyles(Object.assign(
              styles.overlay,
              (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
            ))}
          >
            {iconElement}
            {children}
          </div>
        </EnhancedButton>
      </Paper>
    );
  }
}

export default FloatingActionButton;