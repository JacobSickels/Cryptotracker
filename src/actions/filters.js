// Actions for the filters reducer
import moment from 'moment';

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});


export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

export const setDefaultFilter = () => ({
    type: 'SET_DEFAULT_DATES',
    defaultState: {
        startDate: moment().startOf('day'),
        endDate: moment().endOf('day')
    }
})