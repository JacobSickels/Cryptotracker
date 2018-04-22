import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/*
    NotFoundPage is responsible for showing an error message when
    a page is navigated to that doesn't exist in AppRouter. In this case, 
    a dummy 404 message is shown and prompts the user to go back to the Dashboard.
*/

const NotFoundPage = () => (
    <div>
        <Header />
            <div className="page-container">
                <div className="container">
                    <h1>We're Sorry! This page doesn't exist </h1>
                    <p>Error Code: 404 - <Link to="/">Go Home</Link></p>
                </div>
            </div>
        <Footer />
    </div>
);

export default NotFoundPage;