import React, {PropTypes } from 'react';
import transitions from '../styles/transitions';

function getStyles(props) {
  const {
    muiTheme: {
      textField: {
        hintColor,
      }
    },
    show,
  } = props;

  return {
    root: {
      position: 'absolute',
      opacity: show ? 1 : 0,
      color: hintColor,
      transition: transitions.easeOut(),
      bottom: 12,
    },
  };
}


const TextFieldHint = (props) => {
  const {
    muiTheme: {
      prepareStyles,
    },
    style,
    text,
  } = props;

  const styles = getStyles(props);

  return (
    <div style={prepareStyles(Object.assign(styles.root, style))}>
      {text}
    </div>
  );
};

TextFieldHint.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  show: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.node,
};

TextFieldHint.defaultProps = {
  show: true,
};

export default TextFieldHint;