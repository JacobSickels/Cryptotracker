import React from 'react';
import { connect } from 'react-redux';
import CryptoList from './CryptoList';
import { setDefaultFilter } from '../actions/filters';
import { startSetCryptos } from '../actions/cryptos';

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
    }

    //Called before the component renders
    componentWillMount() {
        //Dashboard should only show the current day of data. 
        //This dispatch resets the filters to the current day
        this.props.setDefaultFilter();
    }

    render() {
        return (
            <div>
                <div className="page-container">
                    <CryptoList />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setDefaultFilter: () => dispatch(setDefaultFilter())
});

export default connect(null, mapDispatchToProps)(DashboardPage);