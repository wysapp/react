import React, {Component } from 'react';
import AppBar from '../components/AppBar';
import getMuiTheme from '../components/styles/getMuiTheme';
import MuiThemeProvider from '../components/styles/MuiThemeProvider';


const muiTheme = getMuiTheme();

class DemoAppBar extends Component {

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </MuiThemeProvider>
    );
  }
}

export default DemoAppBar;