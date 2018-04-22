import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { AccountPage } from '../../components/AccountPage';
import { Input } from 'react-materialize';
import exchanges from '../fixtures/exchanges';

let wrapper;
let mockStartEditCurrency;

//This method is run before each test case below it
beforeEach(() => {
    mockStartEditCurrency = jest.fn();
    wrapper = shallow(
        <AccountPage currency={exchanges[0]} startEditCurrency={mockStartEditCurrency} exchanges={exchanges}/>
    );
});

//This test makes sure that the component is rendered correctly
test('Should render account page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//This test makes sure that changeBaseCurrency on AccountPage edits the component state
test('Use Case #6.1: Should handle changeBaseCurrency', () => {
    
    const currency = {
        "exchange_rate": "106.31",
        "id": "ALL",
        "name": "Albanian Lek",
        "symbol": "Lek"
    };

    wrapper.find('Input').simulate('change', {
        target: { value: currency.id }
    });
    
    expect(wrapper.state('currency')).toEqual(currency);
});
