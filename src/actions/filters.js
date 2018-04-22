import database from '../firebase/firebase';
import moment from 'moment';

//Creating a setStartDate action object for dispatching to Redux store
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//Creating a setEndDate action object for dispatching to Redux store
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//Creating a setDefaultFilter action object for dispatching to Redux store
export const setDefaultFilter = () => ({
    type: 'SET_DEFAULT_DATES',
    defaultState: {
        startDate: moment().startOf('day'),
        endDate: moment().endOf('day')
    }
});

//Creating a setCurrency action object for dispatching to Redux store
export const setCurrency = (currency) => ({
    type: 'SET_CURRENCY',
    currency
});


/*

    startEditCurrency()
    This is a dispatching wrapper for the setCurrency action object
    This method goes to firebase, edits the user's base currency, 
    and loads an object to be passed and dispatched to the Redux store.

*/
export const startEditCurrency = (newCurrency) => {
    return (dispatch, getState) => {

        //Get user id from Redux state
        const uid = getState().auth.uid;

        //Updating the currency under the specific users section in Firebase
        return database.ref(`users/${uid}/currency`)
            .update(newCurrency)
            .then(() => {
                //Dispatching setCurrency to Redux store.
                dispatch(setCurrency(newCurrency));
            });
    }
};

/*

    startSetCurrency()
    This is a dispatching wrapper for the setCurrency action object
    This method goes to firebase, grabs the necessary exchange data, and loads an 
    object to be passed and dispatched to the Redux store.

*/
export const startSetCurrency = () => {
    return (dispatch, getState) => {

        //Get user id from Redux state
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/currency`)
            .once('value')
            .then((snapshot) => {

                let currency = snapshot.val();
                
                //If user doesn't have a base currency, set default to USD
                if(currency == null) {
                    currency = {
                        id: "USD",
                        exchange_rate: 1,
                        name: 'United States Dollar',
                        symbol: '$'
                    }
                }

                //Dispatching setCurrency to Redux store.
                dispatch(setCurrency(currency));
            });
    }
}