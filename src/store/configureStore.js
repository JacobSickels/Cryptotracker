import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import cryptosReducer from '../reducers/crypto';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            filters: filtersReducer,
            cryptos: cryptosReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
