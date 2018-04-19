import filtersReducer from '../../reducers/filters';
import moment from 'moment';

//Should set default filter values
test('should setup default filter values', () => {
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

//Should set startDate filter (retrieved from tutorial)
test('Should set startDate filter', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate: startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

//Should set endDate filter (retrieved from tutorial)
test('Should set endDate filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate: endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});

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