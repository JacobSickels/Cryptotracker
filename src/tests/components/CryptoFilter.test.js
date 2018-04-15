import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { CryptoFilter } from '../../components/CryptoFilter';

let wrapper, filters, setStartDate, setEndDate;

beforeEach(() => {
    
    let startDate = moment(0).startOf('day');
    let endDate = moment(0).endOf('day');
    filters = {startDate, endDate};
    
    
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
        <CryptoFilter 
        
        filters={filters}
        
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />
    );
});


test('should render Crypto Filter correctly', () => {
    expect(wrapper).toMatchSnapshot();
});