import React, {Component, PropTypes } from 'react';
import transitions from '../styles/transitions';
import ClickAwayListener from '../internal/ClickAwayListener';
import SnackbarBody from './SnackbarBody';

function getStyles(props, context, state) {
  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopSubheaderHeight,
        },
      },
      zIndex,
    },
  } = context;

  const {open} = state;

  const styles = {
    root: {

    },
  };

  return styles;
}

class Snackbar extends Component {

  render() {
    return (
      <div>ssssssssssssssssssssssss</div>
    )
  }
}

export default Snackbar;