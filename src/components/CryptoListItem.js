import React from 'react';
import { Link } from 'react-router-dom'; //Eventually linking to the specific cryptos page for more specific filtering
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


//Check ExenseForm in Expensify for passing stuff to component state. I need this for populating specific page graph.


export default class CryptoListItem extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            data: this.props.crypto.map(
                    (entry) => ({ timestamp: moment(entry.timestamp).format('ha'), amount: parseFloat(entry.amount) })
                )
        }
    }



    render() {
        return (
            <div>
                <LineChart width={900} height={500} data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="timestamp"/>
                    <YAxis dataKey="amount" domain={["dataMin", "dataMax"]}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    };

}