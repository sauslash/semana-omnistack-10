import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ActiveUser from './pages/ActiveUser';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/active/:tokenConfirmRegister" component={ActiveUser} />
                <Route path="/profile" component={Profile} />
                {/* <Route path="/incident/edit/:id" exact component={EditIncident} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;