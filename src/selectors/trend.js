import moment from 'moment';

export default (crypto) => {
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