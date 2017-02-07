import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';

function getStyles(props) {
  const defaultStyles = {
    position: 'absolute',
    lineHeight: '22px',
    top: 38,
    transition: transitions.easeOut(),
    zIndex: 1,
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: 'left top',
    pointerEvents: 'auto',
    userSelect: 'none',
  };;

  const shrinkStyles = props.shrink ? Object.assign({
    transform: 'scale(0.75) translate(0, -28px)',
    pointerEvents: 'none',
  }, props.shrinkStyle) : null;


  return {
    root: Object.assign(defaultStyles, props.style, shrinkStyles),
  }
}


const TextFieldLabel = (props) => {
  const {
    muiTheme,
    className,
    children,
    htmlFor,
    onTouchTap,
  } = props;

  const {prepareStyles} = muiTheme;
  const styles = getStyles(props);

  return (
    <label 
      className={className}
      style={prepareStyles(styles.root)}
      htmlFor={htmlFor}
      onTouchTap={onTouchTap}
    >
      {children}
    </label>
  );
};

TextFieldLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  htmlFor: PropTypes.string,
  muiTheme: PropTypes.object.isRequired,
  onTouchTap: PropTypes.func,
  shrink: PropTypes.bool,
  shrinkStyle: PropTypes.object,
  style: PropTypes.object,
};

TextFieldLabel.defaultProps = {
  disabled: false,
  shrink: false,
};

export default TextFieldLabel;