import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { SingleCrypto } from '../../components/SingleCrypto';

let store;

beforeEach(() => {
    const createMockStore = configureMockStore([thunk]);
    store = createMockStore();
});

test('Should render single crypto page correctly', () => {
    const wrapper = shallow(
        <SingleCrypto store={store} name="bitcoin"/>
    );
    expect(wrapper).toMatchSnapshot();
});

