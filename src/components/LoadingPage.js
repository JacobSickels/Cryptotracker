import React from 'react';

/*
    LoadingPage is a React Component resonsible for showing the loading
    icon when a page is loading. This component is used in app.js for when
    the application is loading.
*/

const LoadingPage = () => (
    <div className="loader">
        <img className="loader__image" src="/images/loader.gif" />
    </div>
);


export default LoadingPage;