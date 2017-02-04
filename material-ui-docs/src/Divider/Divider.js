import React, {PropTypes} from 'react';

const Divider = (props, context) => {
  const {
    inset,
    style,
    ...other
  } = props;

  const {
    baseTheme,
    prepareStyles
  } = context.muiTheme;

  const styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: baseTheme.palette.borderColor,
    },
  };

  return (
    <hr {...other} style={prepareStyles(Object.assign(styles.root, style))} />
  );
}

Divider.muiName = 'Divider';
Divider.propTypes = {
  inset: PropTypes.bool,
  style: PropTypes.object,
};

Divider.defaultProps = {
  inset: false,
};

Divider.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Divider;