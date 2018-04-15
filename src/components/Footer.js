import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
    <div className="footer">
        <div className="container">
            <p>If you are interested in how this project was made, check out the 
                <Link to="/docs">Documentation</Link></p>
        </div>
        <div className="footer-end">
            <div className="container">
                <p>This project was created by <a href="http://www.jacobsickels.com">Jacob Sickels</a></p>
            </div>
        </div>
    </div>
);

export default Footer;