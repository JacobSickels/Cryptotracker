import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

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