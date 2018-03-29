import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="login">
        <div className="login__box">
            <div className="login__image">
                <img src="/images/loader.gif" />
            </div>
            <h1 className="login__title">CryptoTracker</h1>
            <p className="login__subtitle">Tracking cryptos, one hour at a time.</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>    
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);