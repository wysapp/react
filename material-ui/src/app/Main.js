import React, {Component } from 'react';
import RaisedButton from '../components/RaisedButton';
import { deepOrange500 } from '../components/styles/colors';
import FlatButton from '../components/FlatButton';
import getMuiTheme from '../components/styles/getMuiTheme';
import MuiThemeProvider from '../components/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

console.log('sssssssssssssssss', muiTheme);

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    // this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  render() {
    
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
        <h1>Material-UI</h1>
        <h2>example project</h2>
        <RaisedButton
          label="Super Secret Password"
          secondary={true}
          onTouchTap={this.handleTouchTap}
        />
      </div>
    </MuiThemeProvider>;
  }
}

export default Main;