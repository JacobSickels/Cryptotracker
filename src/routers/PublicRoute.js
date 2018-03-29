import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    receivedData, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        (isAuthenticated && receivedData) ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    receivedData: state.cryptos.bitcoin.length !== 0
});

export default connect(mapStateToProps)(PublicRoute);