import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import Main from './Main';
import DemoAppBar from './DemoAppBar';

injectTapEventPlugin();

render(<DemoAppBar />, document.getElementById('app'));