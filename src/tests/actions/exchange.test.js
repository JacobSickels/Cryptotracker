import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import { shallow } from 'enzyme';
import { setExchange, startSetExchange } from '../../actions/exchange';
import exchanges from '../fixtures/exchanges';

const uid = '123abc678def';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

//This method is run before each test case below it.
beforeEach((done) => {
    const testExchangeData = exchanges;
    //This gets reference to exchange on test database
    database.ref('exchange').set(testExchangeData).then(() => done());
});

//This test makes sure the exchange action object is created correctly
test('Should set exchange data object', () => {
    const action = setExchange(exchanges);
    expect(action).toEqual({
        type: 'SET_EXCHANGE',
        exchanges
    })
});

/*
    This test is a wrapper for the startSetExchange dispatch method
    This method makes sure that the data is retreived from Firebase
    and then it is set to the Redux store for exchange objects.
*/
test('Should fetch exchange data from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExchange()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXCHANGE',
            exchanges
        });
        done();
    });
});