import filtersReducer from '../../reducers/filters';
import moment from 'moment';

//This test should set default filter values on initialization of filtersReducer
test('Should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(
    {
        startDate: moment().startOf('day'),
        endDate: moment().endOf('day'),
        currency: {
            id: "USD",
            exchange_rate: 1,
            name: 'United States Dollar',
            symbol: '$'
        }
    });
});

//This test should set startDate filter (retreived from tutorial)
test('Should set startDate filter', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate: startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

//This test should set endDate filter (retreived from tutorial)
test('Should set endDate filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate: endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});

//This test should set base currency object filter
test('Should set currency object', () => {
    const currency = {
        "exchange_rate": "20.14",
        "id": "ARS",
        "name": "Argentine Peso",
        "symbol": "$"
    };

    const action = {
        type: 'SET_CURRENCY',
        currency: currency
    };
    
    const state = filtersReducer(undefined, action);
    expect(state.currency).toEqual(currency);
});