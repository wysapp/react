import React, { Component, PropTypes } from 'react';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';


class HomePage extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const style = {
      paddingTop: spacing.desktopKeylineIncrement,
    };

    return (
      <div style={style}>
        ffffffffffffffff
      </div>
    );
  }
}

export default withWidth()(HomePage);