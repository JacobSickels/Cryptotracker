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

beforeEach((done) => {
    const testCurrency = {
        "exchange_rate": "3.67",
        "id": "AED",
        "name": "United Arab Emirates Dirham",
        "symbol": "د.إ"
    };
    database.ref(`users/${uid}/currency`).set(testCurrency).then(() => done());
});

test('should setup start date filter object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should setup end date filter object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should setup default filter object', () => {
    const action = setDefaultFilter();
    expect(action).toEqual({
        type: 'SET_DEFAULT_DATES',
        defaultState: {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day')
        }
    });
});

test('should setup currency filter object', () => {
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

test('should get currency object from user section of database', () => {
    const currency = {
        "exchange_rate": "3.67",
        "id": "AED",
        "name": "United Arab Emirates Dirham",
        "symbol": "د.إ"
    };
    
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

test('should set currency object on user in firebase', () => {
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