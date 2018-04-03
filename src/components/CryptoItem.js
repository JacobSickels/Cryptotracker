import React from 'react';
import { Link } from 'react-router-dom'; //Eventually linking to the specific cryptos page for more specific filtering
import moment from 'moment';
import { connect } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
            <div className="chart">
                <div className="chart-title">
                    <div className="container">
                        <div className="chart-title--container">
                            <div>
                                <Link className="chart-title__link" to={`/filter/${this.props.name.toLowerCase()}`} >
                                    <h1> {this.props.name} </h1>
                                </Link>
                            </div>
                            <div className="chart-title__amount">
                                <h1>
                                    {this.props.currency_symbol} {this.props.current.amount}
                                </h1>
                            </div>
                            <div className="chart-title--percentage">
                                 <h1 style={{
                                     color:
                                        (this.props.percentage >= 0) ? 'green' : 'red'
                                     }}>
                                    {this.props.percentage.toFixed(2)}% 
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="button-container">
                        <button className="button--trend"
                            onClick={() => {
                                const show = this.state.showTrendLine;
                                this.setState({showTrendLine: !show})
                            }}>
                        {
                            (this.state.showTrendLine) ? 'Hide Trend' : 'Show Trend'
                        }      
                        </button>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer height='100%' width='100%'>
                            <LineChart data={this.props.data} margin={{top: 5, right: 10, left: 30, bottom: 5}}>
                                <XAxis dataKey="timestamp"/>
                                <YAxis tickSize={10} dataKey="amount" domain={["dataMin", "dataMax"]} allowDataOverflow={true} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#FFDDED"/>
                                <Tooltip/>
                                <Legend />
                                {
                                    (this.state.showTrendLine) && (
                                        <Line dot={false} type="monotone" dataKey="trend" stroke="#E477D4" strokeWidth={4}/>
                                    )
                                }
                                <Line dot={false} type="monotone" dataKey="amount" stroke="#7F4276"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    };
}

const convertToExchange = (exchangeRate, cryptos) => {
    const converted = cryptos.map((entry) => ({
        amount: (parseFloat(entry.amount) * exchangeRate).toFixed(2),
        timestamp: entry.timestamp
    }));

    return converted;
}

const getTrendData = (crypto) => {
    let x = [];
    
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
    const percentage = (crypto[crypto.length - 1].amount - crypto[0].amount) / crypto[0].amount * 100;

    const data = crypto.map((entry, index) => ({
                timestamp: moment(entry.timestamp).format('ha'), 
                amount: parseFloat(entry.amount), 
                trend: slope * index + yIntercept
            }));

    return {
        data,
        percentage,
        current: crypto[crypto.length - 1]
    };
};

const mapStateToProps = (state, props) => {

    let crypto = selectCryptos(state.cryptos, state.filters)[props.name.toLowerCase()];

    const exchangeRate = parseFloat(state.filters.currency.exchange_rate);

    //converting amounts to exchange rate
    crypto = convertToExchange(exchangeRate, crypto);

    return {
        ...getTrendData(crypto),
        currency_symbol: state.filters.currency.symbol
    }
    
};

export default connect(mapStateToProps)(CryptoItem);