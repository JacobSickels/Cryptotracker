import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CryptoInfo } from '../../components/CryptoInfo';
import cryptos from '../fixtures/cryptos';
import { getMaxMinData } from '../../selectors/cryptos';

//This test makes sure the CryptoInfo component is rendered correctly
test('Should render CryptoInfo correctly', () => {
    const filters = {
        startDate: moment(0).startOf('day'), 
        endDate: moment(0).endOf('day'),
        currency: {
            "exchange_rate": "69.50",
            "id": "AFN",
            "name": "Afghan Afghani",
            "symbol": "؋"
        }
    }
    const wrapper = shallow(
        <CryptoInfo 
            data={cryptos.bitcoin} 
            maxElement={cryptos.bitcoin[1]} 
            minElement={cryptos.bitcoin[0]} 
        />
    );
    
    expect(wrapper).toMatchSnapshot();
});