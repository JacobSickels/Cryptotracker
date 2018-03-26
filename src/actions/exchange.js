import database from '../firebase/firebase';

export const setExchange = (exchanges) => ({
    type: 'SET_EXCHANGE',
    exchanges
});


export const startSetExchange = () => {
    return (dispatch) => {
        return database.ref('exchange')
            .once('value')
            .then((snapshot) => {

                // Creating an object to load Firebase data into
                const exchanges = [];

                // Looping through Firebase data and loading the object
                snapshot.forEach((childSnapshot) => {
                    exchanges.push(childSnapshot.val());
                });
                
                // Dispatching object to the Redux store.
                dispatch(setExchange(exchanges));

            });
    };
}