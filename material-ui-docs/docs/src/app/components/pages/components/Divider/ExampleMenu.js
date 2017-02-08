import React from 'react';
import Divider from 'material-ui/Divider';
import {Menu, MenuItem } from 'material-ui/Menu';

const style= {
  float: 'left',
};

const DividerExampleMenu = () => (
  <Menu desktop={true} style={style} >
    <MenuItem primaryText="Setting" />
    <MenuItem primaryText="Help & feedback" />
    <Divider />
    <MenuItem primaryText="Sign out" />
  </Menu>
);

export default DividerExampleMenu;