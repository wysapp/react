import React, { Component, PropTypes } from 'react';

import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

class AppNavDrawer extends Component {

  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  state = {
    muiVersions: [],
  };

  render() {

    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style
    } = this.props;


    return null;
  }
}

export default AppNavDrawer;