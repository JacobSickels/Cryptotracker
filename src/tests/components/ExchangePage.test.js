import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { ExchangePage } from '../../components/ExchangePage';
import exchanges from '../fixtures/exchanges'

let store;
let startSetExchange;
let wrapper;

const toExchange = {
    "exchange_rate": "20.14",
    "id": "ARS",
    "name": "Argentine Peso",
    "symbol": "$"
};

const fromExchange = {
    "exchange_rate": "69.50",
    "id": "AFN",
    "name": "Afghan Afghani",
    "symbol": "؋"
};

beforeEach(() => {
    const createMockStore = configureMockStore([thunk]);
    store = createMockStore();
    startSetExchange = jest.fn();

    wrapper = shallow(
        <ExchangePage store={store} 
        startSetExchange={startSetExchange} 
        to_element={toExchange} 
        from_element={fromExchange}
        exchanges={exchanges} 
        />);
});

test('should render exchange page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Use Case #4.1: Should handle amount change', () => {
    const value = "12345.64";
    wrapper.find('#amount-input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toEqual(value);
});

test('Use Case $4.2: Should handle base currency change', () => {
    const value = toExchange.id;
    wrapper.find('#base-currency').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('from_element')).toEqual(toExchange);
});

test('Use Case #4.3: Should handle conversion currency change', () => {
    const value = toExchange.id;
    wrapper.find('#conversion-currency').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('to_element')).toEqual(toExchange);
});

test('should handle onAmountChange when amount is NaN', () => {
    const value = "abc123";
    wrapper.find('#amount-input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toEqual(1);
});

