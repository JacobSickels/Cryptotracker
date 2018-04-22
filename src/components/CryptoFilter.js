import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { setStartDate, setEndDate } from '../actions/filters';

/*
    CryptoFilter is a React Component that contains a Date Range Picker
    This component is used for updating the startDate and endDate filters on Redux state
*/

export class CryptoFilter extends React.Component {

    //Component state for tracking if the DatePicker is focused
    state = {
        calendarFocused: null
    };

    //Calls Redux dispatch functions for chosen dates in DatePicker
    onDatesChange = ({ startDate, endDate }) => {
        
        //If startDate and endDate are null, the clear button was clicked
        //The current day is passed when the clear button is clicked
        if(!startDate && !endDate) {
            this.props.setStartDate(moment().startOf('day'));
            this.props.setEndDate(moment().endOf('day'));
        }
        else {
            this.props.setStartDate(startDate);
            this.props.setEndDate(endDate);
        }
    }

    //This is called when Date Picker focus is changed
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    render() {
        return (
            <div className="date-container">
                <div className="container">
                    <DateRangePicker 
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        minimumNights={0}
                        showClearDates={true}
                        isOutsideRange={(day) => {
                            const today = moment();
                            return day.isAfter(today) || day.isBefore("2018-03-01");
                        }}
                    />
                </div>
            </div>
        )
    }
}

/*

    This function maps Redux state to props that are passed into the component
    
    This function takes the Redux state.filters and maps it to a filters object
    This new object is passed as a property to the component

*/
const mapStateToProps = (state) => ({
    filters: state.filters
});

/*

    This function takes Redux dispatch actions and maps them to startSetDate and setEndDate
    These new functions are passed as properties and are called in onDatesChange

*/
const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});
//This creates a Higher Order Component letting the component access the Redux state and dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(CryptoFilter);