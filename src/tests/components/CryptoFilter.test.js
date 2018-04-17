import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { CryptoFilter } from '../../components/CryptoFilter';

let wrapper, onDatesChange, setStartDate, setEndDate, startDate, endDate;

beforeEach(() => {
    
    startDate = moment(0).startOf('day');
    endDate = moment(0).endOf('day');
    
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    
    onDatesChange = jest.fn();

    wrapper = shallow(
        <CryptoFilter 
        
        filters={{startDate, endDate}}
        onDatesChange={onDatesChange}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />
    );
});


test('should render Crypto Filter correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Use Case #5.1: Should handle changing dates on filters', () => {
    const startDate = moment().startOf('day');
    const endDate = moment().endOf('day');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Use Case #5.2: Should handle setting default dates when cleared', () => {
    const now = moment();
    const nullCheck = null;
    wrapper.find('DateRangePicker').prop('onDatesChange')({nullCheck, nullCheck});
    expect(setStartDate).toHaveBeenLastCalledWith(now.startOf('day'));
    expect(setEndDate).toHaveBeenLastCalledWith(now.endOf('day'));
});

test('Should handle date focus changes', () => {
    const calendarFocused =  'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});

