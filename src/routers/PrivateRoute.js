import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated  ? (
            <div>
                <Header />
                    <Component {...props} />
                <Footer />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )}/>
);


const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: !!state.auth.uid
    }
};


//map dispatch to props and get cryptos
//React Router is taking over when we authenticate user, and public route is pushing to private route
//The dispatch in app.js isn't able to run in time.

export default connect(mapStateToProps)(PrivateRoute);