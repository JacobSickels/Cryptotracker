import cryptosReducer from '../../reducers/cryptos';
import cryptos from '../fixtures/cryptos';

//This test makes sure the initialization of the reducer sets the default state
test('Should set default state for cryptos object', () => {
    const state = cryptosReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        bitcoin: [],
        litecoin: [],
        ethereum: []
    });
});

//This test makes sure that passed a cryptos object is set to the state
test('Should set cryptos object', () => {
    const action = {
        type: 'SET_CRYPTOS',
        cryptos
    };
    const state = cryptosReducer(cryptos, action);
    expect(state).toEqual(cryptos);
});

