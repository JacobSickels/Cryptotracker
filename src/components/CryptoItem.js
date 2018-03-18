import React from 'react';
import { Link } from 'react-router-dom'; //Eventually linking to the specific cryptos page for more specific filtering
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { connect } from 'react-redux';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import selectCryptos from '../selectors/cryptos';

export class CryptoItem extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showTrendLine: true
        }
    }

    render() {
        return (
            <div>
                <div className="chart-title">
                    <div className="content-container">
                        <div>
                            <Link className="chart-title__link" to={`/i/${this.props.name.toLowerCase()}`} >
                                <h1> {this.props.name} </h1>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <button 
                        onClick={() => {
                            const show = this.state.showTrendLine;
                            this.setState({showTrendLine: !show})
                        }}>
                    {
                        (this.state.showTrendLine) ? 'Hide Trend Line' : 'Show Trend Line'
                    }      
                    </button>
                </div>
                <div className="content-container">
                    <div className="chart-container">
                        <ResponsiveContainer height='100%' width='100%'>
                            <AreaChart data={this.props.data} margin={{top: 5, right: 10, left: 30, bottom: 5}}>
                                <XAxis dataKey="timestamp"/>
                                <YAxis tickSize={10} dataKey="amount" domain={["dataMin", "dataMax"]}/>
                                <CartesianGrid strokeDasharray="3 3" stroke="#FFDDED"/>
                                <Tooltip/>
                                <Legend />
                                {
                                    (this.state.showTrendLine) && (
                                        <Area dot={false} type="monotone" dataKey="trend" stroke="#E477D4" strokeWidth={4} fill="none"/>
                                    )
                                }
                                <Area dot={false} type="monotone" dataKey="amount" stroke="#7F4276" fill="#7F4276" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, props) => {
    
    //Calculating slope and yIntercept for Trend Lines
    const crypto = selectCryptos(state.cryptos, state.filters)[props.name.toLowerCase()];
    const x = [];
    
    for(let i = 0; i < crypto.length; i++) {
        x.push(i);
    }

    const xSum = x.map(num => num).reduce((prev, next) => prev + next);
    const ySum = crypto.map(entry => parseFloat(entry.amount)).reduce((prev, next) => prev + next);
    const averageX = xSum / crypto.length;
    const averageY = ySum / crypto.length;

    const topSlopeArray = [];
    for(let i = 0; i < crypto.length; i++) {
        topSlopeArray.push((x[i] - averageX) * (crypto[i].amount - averageY));
    }
    const topSlope = topSlopeArray.reduce((prev, next) => prev + next);
    const bottomSlope = x.map(num => (num - averageX) * (num - averageX)).reduce ((prev, next) => prev + next);

    const slope = topSlope / bottomSlope;
    const yIntercept = averageY - (slope * averageX);

    return {
        name: props.name.toLowerCase().charAt(0).toUpperCase() + props.name.toLowerCase().slice(1),
        crypto,
        data: selectCryptos(state.cryptos, state.filters)[props.name.toLowerCase()].map(
            (entry, index) => {
                const timestamp = moment(entry.timestamp).format('ha');
                const amount = parseFloat(entry.amount);
                const trend = slope * index + yIntercept;
                return { timestamp, amount, trend }
            })
    };
};

export default connect(mapStateToProps)(CryptoItem);