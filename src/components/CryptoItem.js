import React from 'react';
import { Link } from 'react-router-dom'; //Eventually linking to the specific cryptos page for more specific filtering
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { connect } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import selectCryptos from '../selectors/cryptos';

export class CryptoItem extends React.Component {
    
    constructor(props) {
        super(props);

        console.log('in constructor');
    }

    render() {
        return (
            <div>
                <div className="chart-title">
                    <div className="content-container">
                        <Link className="chart-title__link" to={`/i/${this.props.name.toLowerCase()}`} >
                            <h1> {this.props.name} </h1>
                        </Link>
                    </div>
                </div>
                <div className="content-container">
                    <div className="chart-container">
                        <ResponsiveContainer height='100%' width='100%'>
                            <LineChart data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="timestamp"/>
                                <YAxis dataKey="amount" domain={["dataMin", "dataMax"]}/>
                                <CartesianGrid strokeDasharray="3 3" stroke="#FFDDED"/>
                                <Tooltip/>
                                <Line type="monotone" dataKey="amount" stroke="#7F4276" activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, props) => {
    console.log('before constructor');
    return {
        name: props.name.toLowerCase().charAt(0).toUpperCase() + props.name.toLowerCase().slice(1),
        crypto: selectCryptos(state.cryptos, state.filters)[props.name.toLowerCase()],
        data: selectCryptos(state.cryptos, state.filters)[props.name.toLowerCase()].map(
            (entry) => ({ timestamp: moment(entry.timestamp).format('ha'), amount: parseFloat(entry.amount) })
        )
    };
};

export default connect(mapStateToProps)(CryptoItem);