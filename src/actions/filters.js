// Actions for the filters reducer
import database from '../firebase/firebase';
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
});

export const setCurrency = (currency) => ({
    type: 'SET_CURRENCY',
    currency
});

export const startEditCurrency = (newCurrency) => {
    return (dispatch, getState) => {

        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/currency`)
            .update(newCurrency)
            .then(() => {
                //console.log('currency', newCurrency);
                dispatch(setCurrency(newCurrency));
            });
    }
};

export const startSetCurrency = () => {
    return (dispatch, getState) => {

        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/currency`)
            .once('value')
            .then((snapshot) => {

                let currency = snapshot.val();
                
                if(currency == null) {
                    currency = {
                        id: "USD",
                        exchange_rate: 1,
                        name: 'United States Dollar',
                        symbol: '$'
                    }
                }

                //console.log('currency', currency);
                dispatch(setCurrency(currency));
            });
    }
}