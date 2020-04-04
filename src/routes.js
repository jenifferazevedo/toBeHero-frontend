import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";

import Home from './pages/Home';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import ProfileOption from './pages/ProfileOption';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/incidents/new" component={NewIncident} />
        <Route path="/profile/option" component={ProfileOption} />
      </Switch>
    </BrowserRouter>
  )
}