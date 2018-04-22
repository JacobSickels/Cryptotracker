import database from '../firebase/firebase';

//Creating a setExchange action object for dispatching to Redux store
export const setExchange = (exchanges) => ({
    type: 'SET_EXCHANGE',
    exchanges
});

/*

    startSetExchange()
    This is a dispatching wrapper for the setExchange action object
    This method goes to firebase, grabs the necessary exchange data, and loads an 
    object to be passed and dispatched to the Redux store.

*/
export const startSetExchange = () => {
    return (dispatch) => {
        //Getting data from Firebase
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