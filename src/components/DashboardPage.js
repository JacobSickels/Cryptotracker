import React from 'react';
import { connect } from 'react-redux';
import CryptoList from './CryptoList';
import { setDefaultFilter } from '../actions/filters';

/*
    DashboardPage is a React Component that is responsible for resetting the Redux filters
    to the current day when it is rendered, as well as rendering an instance of CryptoList.
*/

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

/*

    This function takes Redux dispatch actions and maps them to a function
    This new function is passed as a property in the component and is called in componentWillMount

    setDefaultFilter Redux action resets the startDate and endDate filters to the current day
*/
const mapDispatchToProps = (dispatch) => ({
    setDefaultFilter: () => dispatch(setDefaultFilter())
});

//This creates a Higher Order Component letting the component access the Redux dispatch actions
export default connect(null, mapDispatchToProps)(DashboardPage);