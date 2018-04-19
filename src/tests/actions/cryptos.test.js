import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { setCryptos, startSetCryptos } from '../../actions/cryptos';
import cryptos from '../fixtures/cryptos';
import database from '../../firebase/firebase';

const uid = '123abc678def';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const testCryptoData = cryptos;
    database.ref(`crypto_data`).set(testCryptoData).then(() => done());
});


test('Should setup set cryptos action object with data', () => {
    const action = setCryptos(cryptos);
    expect(action).toEqual({
        type: 'SET_CRYPTOS',
        cryptos
    })
});


test('Should fetch crypto data from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetCryptos()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_CRYPTOS',
            cryptos
        });
        done();
    });
});