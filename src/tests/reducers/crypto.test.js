import cryptosReducer from '../../reducers/cryptos';
import cryptos from '../fixtures/cryptos';

test('Should set default state for cryptos object', () => {
    const state = cryptosReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        bitcoin: [],
        litecoin: [],
        ethereum: []
    });
});

test('Should set cryptos object', () => {
    const action = {
        type: 'SET_CRYPTOS',
        cryptos
    };
    const state = cryptosReducer(cryptos, action);
    expect(state).toEqual(cryptos);
});

