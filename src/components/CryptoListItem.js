import React from 'react';
import { Link } from 'react-router-dom'; //Eventually linking to the specific cryptos page for more specific filtering
import moment from 'moment';
import momentTimezone from 'moment-timezone';


const CryptoListItem = (props) => (
    <div>
    {
        props.crypto.map(
            (entry) => <p key={entry.timestamp}> Amount: { entry.amount } Time: { moment(entry.timestamp).tz('America/Chicago').format() } </p>
        ) 
    }
    </div>
);
export default CryptoListItem;