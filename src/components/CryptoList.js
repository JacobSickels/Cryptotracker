import React from 'react';
import { LineChart, Line } from 'recharts';

import CryptoItem from './CryptoItem';

const CryptoList = () => (
        <div>
            <CryptoItem name='Bitcoin'/>
            <CryptoItem name='Litecoin'/> 
            <CryptoItem name='Ethereum'/>
        </div>
);

export default CryptoList;