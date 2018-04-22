import React from 'react';

/*
    Footer is a Redux Compont that is responsible for rendering the Footer
    contents on every page.
*/

const Footer = () => (
    <div className="footer">
        <div className="container">
            <p>If you are interested in how this project was made, check out the 
                <a href="#">Documentation</a></p>
        </div>
        <div className="footer-end">
            <div className="container">
                <p>This project was created by <a href="http://www.jacobsickels.com">Jacob Sickels</a></p>
            </div>
        </div>
    </div>
);

export default Footer;