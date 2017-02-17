import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Master from './components/Master';
import Home from './components/pages/Home';

import RequiredKnowledge from './components/pages/get-started/RequiredKnowledge';
import Installation from './components/pages/get-started/Installation';
import Usage from './components/pages/get-started/Usage';
import Examples from './components/pages/get-started/Examples';
import ServerRendering from './components/pages/get-started/ServerRendering';

import Colors from './components/pages/customization/Colors';
import Themes from './components/pages/customization/Themes';
import Styles from './components/pages/customization/Styles';

import AppBarPage from './components/pages/components/AppBar/Page';
import AutoCompletesPage from './components/pages/components/AutoComplete/Page';
import AvatarPage from './components/pages/components/Avatar/Page';
import BadgePage from './components/pages/components/Badge/Page';
import BottomNavigationPage from './components/pages/components/BottomNavigation/Page';
import DialogPage from './components/pages/components/Dialog/Page';
import DividerPage from './components/pages/components/Divider/Page';

import FlatButtonPage from './components/pages/components/FlatButton/Page';

import RaisedButtonPage from './components/pages/components/RaisedButton/Page';

import FloatingActionButtongPage from './components/pages/components/FloatingActionButton/Page';

import IconButtonPage from './components/pages/components/IconButton/Page';

import CardPage from './components/pages/components/Card/Page';
import ChipPage from './components/pages/components/Chip/Page';
import GridListPage from './components/pages/components/GridList/Page';
import ListPage from './components/pages/components/List/Page';
import MenuPage from './components/pages/components/Menu/Page';
import IconMenuPage from './components/pages/components/IconMenu/Page';
import DropDownMenuPage from './components/pages/components/DropDownMenu/Page';
import PopoverPage from './components/pages/components/Popover/Page';
import CircularProgressPage from './components/pages/components/CircularProgress/Page';

import SelectFieldPage from './components/pages/components/SelectField/Page';

import SliderPage from './components/pages/components/Slider/Page';
import RadioButtonPage from './components/pages/components/RadioButton/Page';
import SnackbarPage from './components/pages/components/Snackbar/Page';
import StepperPage from './components/pages/components/Stepper/Page';
import TablePage from './components/pages/components/Table/Page';
import TabsPage from './components/pages/components/Tabs/Page';
import ToolbarPage from './components/pages/components/Toolbar/Page';
import Community from './components/pages/discover-more/Community';
import Contributing from './components/pages/discover-more/Contributing';
import Showcase from './components/pages/discover-more/Showcase';
import RelatedProjects from './components/pages/discover-more/RelatedProjects';


const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Redirect from="get-started" to="/get-started/required-knowledge" />
    <Route path="get-started">
      <Route path="required-knowledge" component={RequiredKnowledge} />
      <Route path="installation" component={Installation} />
      <Route path="usage" component={Usage} />
      <Route path="examples" component={Examples} />
      <Route path="server-rendering" component={ServerRendering} />
    </Route>

    <Redirect from="customization" to="/customization/themes" />
    <Route path="customization">
      <Route path="colors" component={Colors} />
      <Route path="themes" component={Themes} />
      <Route path="styles" component={Styles} />
      
    </Route>

    <Redirect from="components" to="/components/app-bar" />
    <Route path="components">
      <Route path="app-bar" component={AppBarPage} />
      <Route path="auto-complete" component={AutoCompletesPage} />
      <Route path="avatar" component={AvatarPage} />

      <Route path="badge" component={BadgePage} />
      <Route path="bottom-navigation" component={BottomNavigationPage} />
      <Route path="dialog" component={DialogPage} />
      <Route path="divider" component={DividerPage} />

      <Route path="flat-button" component={FlatButtonPage} /> 
      <Route path="floating-action-button" component={FloatingActionButtongPage} /> 
      <Route path="raised-button" component={RaisedButtonPage} />    
      <Route path="icon-button" component={IconButtonPage} />
      
      <Route path="card" component={CardPage} />
      <Route path="chip" component={ChipPage} />

      <Route path="grid-list" component={GridListPage} />
      <Route path="list" component={ListPage} />
      <Route path="menu" component={MenuPage} />
      <Route path="icon-menu" component={IconMenuPage} />
      <Route path="dropdown-menu" component={DropDownMenuPage} />
      <Route path="popover" component={PopoverPage} />
      <Route path="circular-progress" component={CircularProgressPage} />

      <Route path="select-field" component={SelectFieldPage} />

      <Route path="slider" component={SliderPage} />
      <Route path="radio-button" component={RadioButtonPage} />
      <Route path="snackbar" component={SnackbarPage} />
      <Route path="stepper" component={StepperPage} />
      <Route path="table" component={TablePage} />
      <Route path="tabs" component={TabsPage} />
      <Route path="toolbar" component={ToolbarPage} />
    </Route>

    <Redirect from="discover-more" to="/discover-more/community" />
    <Route path="discover-more">
      <Route path="community" component={Community} />
      <Route path="contributing" component={Contributing} />
      <Route path="showcase" component={Showcase} />
      <Route path="related-projects" component={RelatedProjects} />
    </Route>

  </Route>
);

export default AppRoutes;
