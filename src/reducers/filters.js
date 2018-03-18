import moment from 'moment';

// This is the filters reducer, it deals with setting redux state in accordance
// to the actions that have been dispatched.

const filtersReducerDefaultState = {
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day')
}

export default (state = filtersReducerDefaultState, action) => {

    switch(action.type) {
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE': 
            return {
                ...state,
                endDate: action.endDate
            }
        case 'SET_DEFAULT_DATES':
            return {
                ...state,
                startDate: action.defaultState.startDate,
                endDate: action.defaultState.endDate
            }    
        default: return state;
    }

};