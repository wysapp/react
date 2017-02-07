import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';

const propTypes = {
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  error: PropTypes.bool,
  errorStyle: PropTypes.object,
  focus: PropTypes.bool,
  focusStyle: PropTypes.object,
  muiTheme: PropTypes.object.isRequired,
  style: PropTypes.object,
};

const defaultProps = {
  disabled: false,
  disabledStyle: {},
  error: false,
  errorStyle: {},
  focus: false,
  focusStyle: {},
  style: {},
};

const TextFieldUnderline = (props) => {
  const {
    disabled,
    disabledStyle,
    error,
    errorStyle,
    focus,
    focusStyle,
    muiTheme,
    style
  } = props;

  const {
    color: errorStyleColor,
  } = errorStyle;

  const {
    prepareStyles,
    textField: {
      borderColor,
      disabledTextColor,
      errorColor,
      focusColor,
    },
  } = muiTheme;

  const styles = {
    root: {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'solid 1px',
      borderColor: borderColor,
      bottom: 8,
      boxSizing: 'content-box',
      margin: 0,
      position: 'absolute',
      width: '100%',
    },
    disabled: {
      borderBottom: 'dotted 2px',
      borderColor: disabledTextColor,
    },
    focus: {
      borderBottom: 'solid 2px',
      borderColor: focusColor,
      transform: 'scaleX(0)',
      transition: transitions.easeOut(),
    },
    error: {
      borderColor: errorStyleColor ? errorStyleColor : errorColor,
      transform: 'scaleX(1)',
    },
  };

  let underline = Object.assign({}, styles.root, style);
  let focusedUnderline = Object.assign({}, underline, styles.focus, focusStyle);

  if (disabled) underline = Object.assign({}, underline, styles.disabled, disabledStyle);

  if (focus) focusedUnderline = Object.assign({}, focusedUnderline, {transform: 'scaleX(1)'});

  if ( error) {
    focusedUnderline = Object.assign({}, focusedUnderline, styles.error);
  }

  return (
    <div>
      <hr style={prepareStyles(underline)} />
      <hr style={prepareStyles(focusedUnderline)} />
    </div>
  );

};

TextFieldUnderline.propTypes = propTypes;
TextFieldUnderline.defaultProps = defaultProps;

export default TextFieldUnderline;