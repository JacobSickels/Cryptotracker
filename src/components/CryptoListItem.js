import React from 'react';
import { Link } from 'react-router-dom'; //Eventually linking to the specific cryptos page for more specific filtering
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Row, Col, Button, Icon } from 'react-materialize';

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
                <h1 className="chart-title"> {this.props.name} </h1>
                <div className="chart-container">
                    <ResponsiveContainer height='100%' width='100%'>
                        <LineChart data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="timestamp"/>
                            <YAxis dataKey="amount" domain={["dataMin", "dataMax"]}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };

}