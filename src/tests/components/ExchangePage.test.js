import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ExchangePage } from '../../components/ExchangePage';
import exchanges from '../fixtures/exchanges'

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

//This method is run before each test case below it
beforeEach(() => {
    startSetExchange = jest.fn();

    wrapper = shallow(
        <ExchangePage
        startSetExchange={startSetExchange} 
        to_element={toExchange} 
        from_element={fromExchange}
        exchanges={exchanges} 
        />);
});

//This test makes sure that ExchangePage is rendered correctly
test('Should render ExchangePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//This test makes sure that changing input amount edits component state
test('Use Case #4.1: Should handle amount change', () => {
    const value = "12345.64";
    wrapper.find('#amount-input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toEqual(value);
});

//This test makes sure that changing base currency dropdown edits component state
test('Use Case #4.2: Should handle base currency change', () => {
    const value = toExchange.id;
    wrapper.find('#base-currency').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('from_element')).toEqual(toExchange);
});

//This test makes sure that changing the conversion currency dropdown edits component state
test('Use Case #4.3: Should handle conversion currency change', () => {
    const value = toExchange.id;
    wrapper.find('#conversion-currency').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('to_element')).toEqual(toExchange);
});

// This test makes sure that if non-number data is entered in the amount input, 
// that the component state amount is set to zero
test('Should handle onAmountChange when amount is NaN', () => {
    const value = "abc123";
    wrapper.find('#amount-input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toEqual(1);
});

