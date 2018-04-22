import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import { shallow } from 'enzyme';
import moment from 'moment';

import { 
    setStartDate, 
    setEndDate, 
    setDefaultFilter,
    setCurrency,
    startEditCurrency,
    startSetCurrency 

} from '../../actions/filters';

const uid = '123abc678def';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);
let currency;

//This method is run before each test case below it
beforeEach((done) => {
    currency = {
        "exchange_rate": "3.67",
        "id": "AED",
        "name": "United Arab Emirates Dirham",
        "symbol": "د.إ"
    };
    //This sets reference to the base currency on the user id from test database
    database.ref(`users/${uid}/currency`).set(currency).then(() => done());
});

//This test makes sure the start date action object is created correctly
test('Should setup start date filter object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

//This test makes sure that the end date action object is created correctly
test('Should setup end date filter object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

//This test makes sure that the default filter state object is created correctly
test('Should setup default filter object', () => {
    const action = setDefaultFilter();
    expect(action).toEqual({
        type: 'SET_DEFAULT_DATES',
        defaultState: {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day')
        }
    });
});

//This test makes sure that the currency filter object is created correctly
test('Should setup currency filter object', () => {
    const currency = {
        "exchange_rate": "3.67",
        "id": "AED",
        "name": "United Arab Emirates Dirham",
        "symbol": "د.إ"
    };
    
    const action = setCurrency(currency);
    expect(action).toEqual({
        type: 'SET_CURRENCY',
        currency
    });
});

//This test makes sure that the base currency in the database was set to the currency object
test('Should get currency object from user section of database', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetCurrency()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_CURRENCY',
            currency
        });
        done();
    });
});

//This test makes sure that startEditCurrency sets the base currency in the database for a user
test('should set currency object on user in firebase', (done) => {
    const currency = {
        "exchange_rate": "106.31",
        "id": "ALL",
        "name": "Albanian Lek",
        "symbol": "Lek"
    };
    
    const store = createMockStore(defaultAuthState);
    store.dispatch(startEditCurrency(currency)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_CURRENCY',
            currency
        });
        done();
    });
});