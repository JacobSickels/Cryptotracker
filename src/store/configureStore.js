import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import cryptosReducer from '../reducers/cryptos';
import filtersReducer from '../reducers/filters';
import exchangesReducer from '../reducers/exchange';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            filters: filtersReducer,
            cryptos: cryptosReducer,
            exchange: exchangesReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
