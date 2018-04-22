import moment from 'moment';

/*
    getTrend
    This function is reponsible for getting the trendline data used in the graphs
    This trendline is a line of best fit for the datapoints

    The mathematics for this algorithm was found at
    https://www.varsitytutors.com/hotmath/hotmath_help/topics/line-of-best-fit
*/
export default (crypto) => {
    
    //Array for datapoints on x axis
    let x = [];
    
    //Pushing 0->crypto.length to x datapoints array
    for(let i = 0; i < crypto.length; i++) {
        x.push(i);
    }

    //Summing all x values
    const xSum = x.map(num => num).reduce((prev, next) => prev + next);
    
    //Summing all amounts (on y axis)
    const ySum = crypto.map(entry => parseFloat(entry.amount)).reduce((prev, next) => prev + next);
    
    //Getting average x value
    const averageX = xSum / crypto.length;
    
    //Getting average y value
    const averageY = ySum / crypto.length;

    //Getting top sum of slope function
    const topSlopeArray = [];
    for(let i = 0; i < crypto.length; i++) {
        topSlopeArray.push((x[i] - averageX) * (crypto[i].amount - averageY));
    }
    const topSlope = topSlopeArray.reduce((prev, next) => prev + next);
    
    //Getting bottom sum of slope function
    const bottomSlope = x.map(num => (num - averageX) * (num - averageX)).reduce ((prev, next) => prev + next);

    //Calculating slope
    const slope = topSlope / bottomSlope;
    
    //Calculating y-intercept
    const yIntercept = averageY - (slope * averageX);
    
    //Calculating percentage changed between first element and last element
    const percentage = (crypto[crypto.length - 1].amount - crypto[0].amount) / crypto[0].amount * 100;

    //Creating objects and putting them into data array
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