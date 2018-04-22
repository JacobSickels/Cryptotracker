import { firebase, googleAuthProvider } from '../firebase/firebase';

//Creating a login action object for dispatching to Redux store
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

//Creates the Google Popup for signin to authenticate the user
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

//Creating the logout action object for dispatching to Redux store
export const logout = () => ({
    type: 'LOGOUT',
});

//Calls Firebase signout, un-authenticating the user
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
};