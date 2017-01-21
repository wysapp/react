import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Master from './components/Master';

const AppRoutes = (
  <Route path="/" component={Master}>

  </Route>
);

export default AppRoutes;
