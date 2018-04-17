import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AccountPage from '../components/AccountPage';
import DashboardPage from '../components/DashboardPage';
import ExchangePage from '../components/ExchangePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SingleCrypto from '../components/SingleCrypto';
import Documentation from '../components/Documentation';

export const history = createHistory();

export const AppRouter = (props) => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute 
                    path="/"
                    component={LoginPage}
                    exact={true}
                />
                <PrivateRoute 
                    path="/dashboard"
                    component={DashboardPage}
                />
                <PrivateRoute 
                    path="/exchange"
                    component={ExchangePage}
                />
                <PrivateRoute 
                    path="/account"
                    component={AccountPage}
                />
                <PrivateRoute 
                    path="/filter/:currency"
                    component={SingleCrypto}
                />
                <Route
                    path="/docs" 
                    component={Documentation}
                />
                <Route 
                    component={NotFoundPage}
                />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;