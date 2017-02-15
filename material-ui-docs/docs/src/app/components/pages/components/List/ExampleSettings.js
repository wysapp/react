import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

const ListExampleSettings = () => (
  <div style={styles.root}>
    <MobileTearSheet>
      <List>
        <Subheader>General</Subheader>
        <ListItem
          primaryText="Profile photo"
          secondaryText="Change your google+ profile photo"
        />
        <ListItem
          primaryText="Show your status"
          secondaryText="Your status is visible to everyone you use with"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Notifications"
          secondaryText="Allow notifications"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Sounds"
          secondaryText="Hangouts message"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Video sounds"
          secondaryText="Hangouts video call"
        />
      </List>
    </MobileTearSheet>
    <MobileTearSheet>
      <List>
        <ListItem
          primaryText="When calls and notifications arrive"
          secondaryText="Always interrupt"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Priority Interruptions</Subheader>
        <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
        <ListItem primaryText="Calls" rightToggle={<Toggle />} />
        <ListItem primaryText="Messages" rightToggle={<Toggle />} />
      </List>
      <Divider />
    </MobileTearSheet>

  </div>
);

export default ListExampleSettings;