import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import transitions from '../styles/transitions';
import warning from 'warning';

const getStyles = (props, context, state) => {
  const {
    baseTheme,
    textField: {
      floatingLabelColor,
      focusColor,
      textColor,
      disabledTextColor,
      backgroundColor,
      errorColor,
    },
  } = context.muiTheme;

  const styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
      display: 'inline-block',
      position: 'relative',
      backgroundColor: backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: transitions.easeOut('200ms', 'height'),
      cursor: props.disabled ? 'not-allowed' : 'auto',
    },
    error: {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: transitions.easeOut(),
    },
    floatingLabel: {
      color: props.disabled ? disabledTextColor : floatingLabelColor,
      pointerEvents: 'none',
    },
    input: {
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      cursor: 'inherit',
      font: 'inherit',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    inputNative: {
      appearance: 'textfield',
    },
  };

  styles.textarea = Object.assign({}, styles.input, {
    marginTop: props.floatingLabelText ? 36 : 12,
    marginBottom: props.floatingLabelText ? -36 : -12,
    boxSizing: 'border-box',
    font: 'inherit',
  });

  styles.input.height = '100%';
  
  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if(props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';

    if (!props.multiLine) {
      styles.input.marginTop = 14;
    }

    if (state.errorText) {
      styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
    }
  }

  if (state.errorText) {
    if (state.isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};


function isValid(value) {
  return value !== '' && value !== undefined && value !== null;
}

class TextField extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    errorStyle: PropTypes.object,
    errorText: PropTypes.node,

    floatingLabelFixed: PropTypes.bool,
    floatingLabelFocusStyle: PropTypes.object,
    floatingLabelShrinkStyle: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    floatingLabelText: PropTypes.node,

    fullWidth: PropTypes.bool,
    hintStyle: PropTypes.object,
    hintText: PropTypes.node,
    id: PropTypes.string,
    inputStyle: PropTypes.object,
    multiLine: PropTypes.bool,
    name: PropTypes.string,

    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,

    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    style: PropTypes.object,
    textareaStyle: PropTypes.object,
    type: PropTypes.string,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineShow: PropTypes.bool,
    underlineStyle: PropTypes.object,
    value: PropTypes.any,
  };

  static defaultProps = {
    disabled: false,
    floatingLabelFixed: false,
    multiLine: false,
    fullWidth: false,
    type: 'text',
    underlineShow: true,
    rows: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    isFocused: false,
    errorText: undefined,
    hasValue: false,
  };

  componentWillMount() {
    const {
      children,
      name,
      hintText,
      floatingLabelText,
      id,
    } = this.props;

    const propsLeaf = children ? children.props : this.props;

    this.setState({
      errorText: this.props.errorText,
      hasValue: isValid(propsLeaf.value) || isValid(propsLeaf.defaultValue),
    });

    warning(name || hintText || floatingLabelText || id, `Material-UI: We don't have enough information
      to build a robust unique id for the TextField component. Please provide an id or a name.`);
    
    const uniqueId = `${name}-${hintText}-${floatingLabelText}-${Math.floor(Math.random() * 0xFFFF)}`;
    this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
  }

  render() {

    const {
      children,
      className,
      disabled,
      errorStyle,
      errorText,
      floatingLabelFixed,
      floatingLabelFocusStyle,
      floatingLabelShrinkStyle,
      floatingLabelStyle,
      floatingLabelText,
      fullWidth,
      hintText,
      hintStyle,
      id,
      inputStyle,
      multiLine,
      onBlur,
      onChange,
      onFocus,
      style,
      type,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineShow,
      underlineStyle,
      rows,
      rowsMax,
      textareaStyle,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const inputId = id || this.uniqueId;


    const inputProps = {
      id: inputId,
      ref: (elem) => this.input = elem,
      disabled: this.props.disabled,
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
    };

    const childStyleMerged = Object.assign(styles.input, inputStyle);
    
    let inputElement;
    if (children) {

    } else {
      inputElement = multiLine ? (
        <div></div>
      ) : (
        <input 
          type={type}
          style={prepareStyles(Object.assign(styles.inputNative, childStyleMerged))}
          {...other}
          {...inputProps}
        />
      );
    }

    let rootProps = {};

    if (children) {
      rootProps = other;
    }

    return (
      <div 
        {...rootProps}
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
      >
        {inputElement}
      </div>
    );

  }
}


export default TextField;