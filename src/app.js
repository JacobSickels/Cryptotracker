import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startSetCryptos } from './actions/cryptos';
import { startSetExchange } from './actions/exchange';
import { startSetCurrency } from './actions/filters';
import LoadingPage from './components/LoadingPage';
import moment from 'moment';

import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';

import filtersReducer from './reducers/filters';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {

        store.dispatch(login(user.uid));

        //Gets crypto data for graphing
        store.dispatch(startSetCryptos()).then(() => {
            
            //Gets default currency from account
            store.dispatch(startSetCurrency()).then(() => {

                //Gets exchange rates and puts them in redux state
                store.dispatch(startSetExchange());
    
                //If they are on the login page
                if(history.location.pathname === '/') {
                    history.push('/dashboard');
                }
                
                //If you enter app from /exchange you load to dashboard
                if(history.location.pathname === '/exchange') {
                   history.push('/dashboard');
                }
                
                renderApp();

            });

        });      
        
    }
    else {
        store.dispatch(logout());
        history.push('/');
        renderApp();
    }
});

