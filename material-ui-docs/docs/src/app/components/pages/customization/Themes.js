import React, {Component,PropTypes} from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import muiThemeable from 'material-ui/styles/muiThemeable';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import withWidth, {SMALL} from 'material-ui/utils/withWidth';
import typography from 'material-ui/styles/typography';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import themesText from './themes.md';
import ClearFix from 'material-ui/internal/ClearFix';


import {
  Checkbox,
  Dialog,
  DropDownMenu,
  FlatButton,
  Drawer,
  MenuItem,
  Paper,
  RaisedButton,
  Tabs,
  Tab,
} from 'material-ui';

const markdownText = `
## Themes

### Examples

You can use the tabs to change the theme. The changes will be applied to the whole
documentation.
`;

class ThemesPage extends Component {
  static propTypes = {
    muiTheme: PropTypes.object,
    onChangeMuiTheme: PropTypes.func,
    width: PropTypes.number.isRequired,
  };

  state = {
    dialogOpen: false,
    snackbarOpen: false,
    drawerOpen: false,
  };

  componentDidMount() {
    this.setState({
      valueTabs: this.props.muiTheme.name || 'light',
    });
  }


  getStyles() {
    const {
      muiTheme,
      width,
    } = this.props;

    const canvasColor = muiTheme.baseTheme.palette.canvasColor;
    const borderColor = muiTheme.baseTheme.palette.borderColor;

    const styles = {
      group: {
        float: 'left',
        width: width === SMALL ? '100%' : '33%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box',
      },
      groupSlider: {
        marginTop: '0px',
        width: '100%',
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left',
      },
      containerCentered: {
        textAlign: 'center',
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
      },
      textfield: {
        width: '100%',
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
      },
      liveExamplePaper: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        overflow: 'hidden',
      },
      bottomBorderWrapper: {
        borderBottom: `1px solid ${borderColor}`,
        paddingBottom: '10px',
      },
    };

    styles.containerCentered = Object.assign({}, styles.container, styles.containerCentered);

    styles.groupSlider = Object.assign({}, styles.group, styles.groupSlider);

    return styles;
  }

  getComponentGroup() {
    const styles = this.getStyles();

    return (
      <ClearFix>
        <div style={styles.group}>
          <div style={styles.containerCentered}>

          </div>
          <div style={styles.containerCentered}>
            <RaisedButton label="Secondary" secondary={true} />
          </div>
          <div style={styles.containerCentered}>
            <RaisedButton label="Primary" primary={true} />
          </div>
          <div style={styles.containerCentered}>
            <RaisedButton label="Default" />
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.container}>
            <Checkbox name="checkboxName1" value="checkboxValue1" label="checkbox" />
            <Checkbox name="checkboxName2" value="checkboxValue2" label="disabled checkbox" disabled={true} />
          </div>

          <div style={styles.container}>

          </div>

        </div>

        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FlatButton label="View Dialog" onTouchTap={this.handleTouchTapDialog} />
            <Dialog 
              open={this.state.dialogOpen}
              title="Dialog With Standard Actions"
              actions={[
                <FlatButton
                  label="Cancel"
                  keyboardFocused={true}
                  onTouchTap={this.handleRequestCloseDialog}
                  primary={true}
                />,
                <FlatButton
                  label="Submit"
                  onTouchTap={this.handleRequestCloseDialog}
                  primary={true}
                />
              ]}
              onRequestClose={this.handleRequestCloseDialog}
            >
              The actions in this window are created from tan array of element's that&#39;s passed in.
            </Dialog>
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FlatButton
              onTouchTap={this.handleTouchTapDrawer}
              label="View Drawer"
            />
            <Drawer 
              open={this.state.drawerOpen} docked={false}
              onRequestChange={this.handleRequestChangeDrawer}
            >
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FlatButton
              onTouchTap={this.handleTouchTapSnackbar}
              label="View Snackbar"
            />
          </div>

        </div>
      </ClearFix>
    );
  }


  handleChangeTabs = (valueTabs) => {
    let newMuiTheme = null;

    if (valueTabs === 'light') {
      newMuiTheme = getMuiTheme();
    } else {
      newMuiTheme = getMuiTheme(darkBaseTheme);
    }

    newMuiTheme.name = valueTabs;

    this.setState({
      valueTabs: valueTabs,
    });

    this.props.onChangeMuiTheme(newMuiTheme);
  }

  getThemeExamples() {
    return (
      <div>
        <Tabs 
          value={this.state.valueTabs}
          onChange={this.handleChangeTabs}
        >
          <Tab 
            label="Light Theme (Default)"
            value="light"
          />
          <Tab 
            label="Dark Theme"
            value="dark"
          />
        </Tabs>
        {this.getComponentGroup()}
      </div>
    );
  }

  handleTouchTapDrawer = () => {
    this.setState({
      drawerOpen: true,
    });
  }

  handleRequestChangeDrawer = (open) => {
    this.setState({
      drawerOpen: open,
    });
  }

  handleTouchTapDialog = () => {
    this.setState({
      dialogOpen: true,
    });
  }

  handleRequestCloseDialog = () => {
    this.setState({
      dialogOpen: false,
    });
  }

  handleTouchTapSnackbar = () => {
    this.setState({
      snackbarOpen: true,
    });
  }

  

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <Title render={(previousTitle) => `Themes - ${previousTitle}`} />
        <MarkdownElement text={markdownText} />
        <Paper style={styles.liveExamplePaper}>
          <ClearFix style={styles.liveExamplePaper}>{this.getThemeExamples()}</ClearFix>
        </Paper>
        <div style={styles.bottomBorderWrapper}>
          <MarkdownElement text={themesText} />
        </div>
      </div>
    );
  }

}

export default muiThemeable()(withWidth()(ThemesPage));
