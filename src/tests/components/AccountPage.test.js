import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { AccountPage } from '../../components/AccountPage';
import { Input } from 'react-materialize';
import exchanges from '../fixtures/exchanges';

let store;
let wrapper;
let mockStartEditCurrency;

beforeEach(() => {
    const createMockStore = configureMockStore([thunk]);
    mockStartEditCurrency = jest.fn();
    store = createMockStore();
});

test('should render account page correctly', () => {
    const wrapper = shallow(
        <AccountPage store={store} currency={exchanges[0]} startEditCurrency={mockStartEditCurrency} exchanges={exchanges}/>
    );
    expect(wrapper).toMatchSnapshot();
});

test('should handle onInputChange', () => {
    
    const currency = {
        "exchange_rate": "106.31",
        "id": "ALL",
        "name": "Albanian Lek",
        "symbol": "Lek"
    };

    const wrapper = shallow(
        <AccountPage store={store} currency={currency} startEditCurrency={mockStartEditCurrency} exchanges={exchanges}/>
    );

    wrapper.find('Input').simulate('change', {
        target: { value: currency.id }
    });
    expect(wrapper.state('currency')).toEqual(currency);
});
