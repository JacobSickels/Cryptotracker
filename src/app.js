import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startSetCryptos } from './actions/cryptos';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

//import './cron/cron-test';

import { firebase } from './firebase/firebase';

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
        
        store.dispatch(startSetCryptos()).then(() => {
            console.log(store.getState());
            renderApp();
            //If they are on the login page
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
        
    }
    else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});

