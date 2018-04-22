import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

/*
    LoginPage is a React Component responsible for showing the Login Page content. 
    This page is served from the AppRouter when the user isn't authenticated.
*/

export const LoginPage = ({ startLogin }) => (
    <div className="login">
        <div className="login__box">
            <div className="login__image">
                <img src="/images/Crypto_Logo.svg" />
            </div>
            <h1 className="login__title">CryptoTracker</h1>
            <p className="login__subtitle">Tracking cryptos, one hour at a time.</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>    
    </div>
);

/*
    This function takes Redux dispatch actions and maps them to a function
    The startLogin function is called when the (Login with Google) button is clicked
*/
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

//This creates a Higher Order Component letting the component access the Redux state
export default connect(undefined, mapDispatchToProps)(LoginPage);