import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CryptoItem } from '../../components/CryptoItem';
import cryptos from '../fixtures/cryptos';
import getTrendData from '../../selectors/trend';

//This test makes sure that CryptoItem is rendered correctly
test('Should render CryptoItem correctly', () => {

    const currency = {
        "exchange_rate": "69.50",
        "id": "AFN",
        "name": "Afghan Afghani",
        "symbol": "؋"
    };

    const trendData = getTrendData(cryptos.bitcoin);

    const wrapper = shallow(
    <CryptoItem 
        name="bitcoin"
        currency_symbol={currency.symbol}
        current={trendData.current}
        percentage={trendData.percentage}
        data={trendData.data}
    />);
    expect(wrapper).toMatchSnapshot();
});