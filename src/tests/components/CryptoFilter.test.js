import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CryptoFilter } from '../../components/CryptoFilter';

let wrapper, onDatesChange, setStartDate, setEndDate, startDate, endDate;

//This method is run before each test case below it
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

//This test makes sure that the component is rendered correctly
test('Should render Crypto Filter correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//This test case makes sure that the changing the DateRangePicker calls the dispatch methods: setStartDate and setEndDate
test('Use Case #5.1: Should handle changing dates on filters', () => {
    const startDate = moment().startOf('day');
    const endDate = moment().endOf('day');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

//This test makes sure that the clear button on DateRangePicker sets filters to current day
test('Use Case #5.2: Should handle setting default dates when cleared', () => {
    const now = moment();
    const nullCheck = null;
    wrapper.find('DateRangePicker').prop('onDatesChange')({nullCheck, nullCheck});
    expect(setStartDate).toHaveBeenLastCalledWith(now.startOf('day'));
    expect(setEndDate).toHaveBeenLastCalledWith(now.endOf('day'));
});

//This test makes sure that changing focus on DateRangePicker edits component state
test('Should handle date focus changes', () => {
    const calendarFocused =  'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});

