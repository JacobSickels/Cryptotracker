import React from 'react';
import CryptoItem from './CryptoItem';

/*
    CryptoList is a wrapper React Component used for the Dashboard Page
    This component renders a CryptoItem component for each name that is passed
    to it. The Dashboard page renders Bitcoin, Litecoin, and Ethereum data in 
    a sequence and this is the component that achieves that functionality.    

    This component doesn't have the JavaScript ES6 class definition for a React Component
    because it doesn't require all of the other functionality components of that nature need.
*/

const CryptoList = () => (
        <div>
            <CryptoItem name='Bitcoin'/>
            <CryptoItem name='Litecoin'/> 
            <CryptoItem name='Ethereum'/>
        </div>
);

export default CryptoList;