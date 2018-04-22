import moment from 'moment';

/*
    This is the Filters Data Reducer
    This deals with dispatch actions to filters section of Redux state.
*/

//This is the default state for the filters reducer
const filtersReducerDefaultState = {
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    currency: {
        id: "USD",
        exchange_rate: 1,
        name: 'United States Dollar',
        symbol: '$'
    }
}

/*
    This function is the reducer
    action.type(s) come into the function, and the reducer updates the state accordingly

*/
export default (state = filtersReducerDefaultState, action) => {

    switch(action.type) {
        //SET_START_DATE updates the startDate on the Redux filter state
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        //SET_END_DATE updates the endDate on the Redux filter state    
        case 'SET_END_DATE': 
            return {
                ...state,
                endDate: action.endDate
            }
        //SET_DEFAULT_DATES updates both the startDate and endDate on the Redux filter state    
        case 'SET_DEFAULT_DATES':
            return {
                ...state,
                startDate: action.defaultState.startDate,
                endDate: action.defaultState.endDate
            }
        //SET_CURRENCY updates the base currency on the Redux filter state    
        case 'SET_CURRENCY': {
            return {
                ...state,
                currency: action.currency
            }
        }         
        default: return state;
    }

};