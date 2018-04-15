import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { Dropdown, NavItem, Button } from 'react-materialize';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Cryptotracker</h1>
                </Link>
                <div>
                    <Link className="button button--link" to="/dashboard">Dashboard</Link>
                    <Link className="button button--link" to="/exchange">Exchange</Link>
                    <Dropdown
                        trigger={
                            <button data-beloworigin="true" className="button button--link">Filter</button>
                        }>
                        <Link to="/filter/bitcoin">
                            <button className="button--dropdown">Bitcoin</button>
                        </Link>
                        <Link to="/filter/litecoin">
                            <button className="button--dropdown">Litecoin</button>
                        </Link>
                        <Link to="/filter/ethereum">
                            <button className="button--dropdown">Ethereum</button>
                        </Link>
                    </Dropdown>
                    <Dropdown
                        trigger={
                            <button data-beloworigin="true" className="button button--link">Account</button>
                        }>
                        <Link to="/account">
                            <button className="button--dropdown">Settings</button>
                        </Link>
                        <button id="logout" className="button--dropdown" onClick={startLogout}>Logout</button>
                    </Dropdown>
                </div>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);