import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import NavbarComponent from '../pages/Navbar';
import GridData from '../pages/GridData';
import Photo from '../pages/Photos';

function Routes() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/gridData" component={GridData} />
        <Route exact path="/photoData" component={Photo} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
