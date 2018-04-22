import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { setCryptos, startSetCryptos } from '../../actions/cryptos';
import cryptos from '../fixtures/cryptos';
import database from '../../firebase/firebase';

const uid = '123abc678def';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

//This method is run before each test case below it.
beforeEach((done) => {
    const testCryptoData = cryptos;
    //This gets reference to crypto_data on test database
    database.ref(`crypto_data`).set(testCryptoData).then(() => done());
});

//This test makes sure the cryptos action object is created correctly
test('Should setup set cryptos action object with data', () => {
    const action = setCryptos(cryptos);
    expect(action).toEqual({
        type: 'SET_CRYPTOS',
        cryptos
    })
});

/*
    This test is a wrapper for the startSetCryptos dispatch method
    This method makes sure that the data is retreived from Firebase
    and then it is set to the Redux store for cryptocurrency objects.
*/
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