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

/*


    App.js

    This is the main entry point for the application.
    The Redux store and AppRouter are created from this entry point.

    This class also deals with dispatching all of the necessary 
    actions to Redux store on application startup.


*/

//Creating Redux Store
const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//Renders AppRouter which displays the correct page
const renderApp = () => {
    ReactDOM.render(jsx, document.getElementById('app'));
};

//Rendering Loading Page while app is loading
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<LoadingPage />, document.getElementById('app'));
    if(user) {
        
        //Dispatching user id to Redux store
        store.dispatch(login(user.uid));
        
        //Gets crypto data for graphing
        store.dispatch(startSetCryptos()).then(() => {
            
            //Gets default currency from account
            store.dispatch(startSetCurrency()).then(() => {
                //Gets exchange rates and puts them in redux state
                store.dispatch(startSetExchange());
    
                //If user is on the login page and authenticated, push to dashboard
                if(history.location.pathname === '/') {
                    history.push('/dashboard');
                }
                
                renderApp(); 
            });
            

        });      
        
    }
    else {
        //When auth state is changed and user doesn't exist, the user has logged out
        store.dispatch(logout());
        history.push('/');
        renderApp();
    }
});

