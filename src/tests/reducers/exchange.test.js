import exchangesReducer from '../../reducers/exchange';
import exchanges from '../fixtures/exchanges';

//This test makes sure the initialization of the exchangesReducer sets the state to []
test('Should setup default exchange values', () => {
    const state = exchangesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

//This test makes sure that passed a exchanges object is set to the state
test('Should set exchange values', () => {
    const action = {
        type: 'SET_EXCHANGE',
        exchanges: exchanges
    };
    const state = exchangesReducer(undefined, action);
    expect(state).toEqual(exchanges);
});