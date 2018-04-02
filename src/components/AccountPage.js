import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';

import { startEditCurrency } from '../actions/filters';

export class AccountPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: props.currency
        }

    }

    onInputChange = (e) => {
        const currency = this.props.exchanges.find((element) => element.id === e.target.value);
        this.setState({ currency });
        this.props.startEditCurrency(currency);
    }

    render() {
        return (
            <div className="page-container">
                <div className="container">
                    <h2>My Account Page</h2>

                    <h1>Set Base Currency</h1>
                    <Input s={5} type='select' label="Select Currency" value={this.state.currency.id} onChange={this.onInputChange}>
                        {
                            this.props.exchanges.map((currency) =>
                                <option key={currency.id} value={currency.id}>{currency.name}</option>
                            )
                        }
                    </Input>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditCurrency: (currency) => dispatch(startEditCurrency(currency))
    };
};

const mapStateToProps = (state, props) => {
    return {
        exchanges: state.exchange,
        currency: state.filters.currency
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);