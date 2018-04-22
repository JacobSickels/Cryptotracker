import * as firebase from 'firebase';

/*
    This class loads firebase environment variables from 
    .env.developement and .env.test
    If test cases are being run, .env.test
    During regular development, .env.development

    This is so that we can run test cases on something other than production database.
*/

//Loading environment variables
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

//Getting database connection from Firebase
const database = firebase.database();

//Getting Google Auth Provider for popup on login
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//These are exports, they can be imported from other files by name
export { firebase, googleAuthProvider, database as default }; 