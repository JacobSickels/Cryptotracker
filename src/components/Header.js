import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { Dropdown } from 'react-materialize';

/*
    Header is a React Component that is responsible for the navigation of the application
    There are many buttons in the Header component that (Link) to other pages.
    
    When a Link is clicked in the Header, the url is appended to and the AppRouter serves
    the correct page associated with the url. See AppRouter for more information.
*/

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

/*
    This function takes Redux dispatch actions and maps them to a function
    The startLogout function is called when the Logout button is clicked in the Header
*/
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

//This creates a Higher Order Component letting the component access the Redux dispatch actions
export default connect(undefined, mapDispatchToProps)(Header);