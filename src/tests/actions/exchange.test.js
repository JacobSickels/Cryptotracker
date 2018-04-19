import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import { shallow } from 'enzyme';

import { setExchange, startSetExchange } from '../../actions/exchange';
import exchanges from '../fixtures/exchanges';

const uid = '123abc678def';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const testExchangeData = exchanges;
    database.ref('exchange').set(testExchangeData).then(() => done());
});

test('Should set exchange data object', () => {
    const action = setExchange(exchanges);
    expect(action).toEqual({
        type: 'SET_EXCHANGE',
        exchanges
    })
});

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