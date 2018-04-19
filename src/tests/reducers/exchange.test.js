import exchangesReducer from '../../reducers/exchange';
import exchanges from '../fixtures/exchanges';

//Should set default filter values
test('Should setup default exchange values', () => {
    const state = exchangesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

//Should set exchange values
test('Should set exchange values', () => {
    const action = {
        type: 'SET_EXCHANGE',
        exchanges: exchanges
    };
    const state = exchangesReducer(undefined, action);
    expect(state).toEqual(exchanges);
});