const NEGATIVE_INTEGER_OPERATOR = '-';
const DOT_OPERATOR = '.';

export class Utils {

    // function to negate an integer
    static negateInteger = (value) => {
        const negatedInteger = (value.includes(NEGATIVE_INTEGER_OPERATOR)) ? value.slice(1) : (NEGATIVE_INTEGER_OPERATOR +  value);
        return negatedInteger;
    }

    // function to convert integer to decimal
    static convertIntegerToDecimal = (value) => {
        const decimalValue = (value.includes(DOT_OPERATOR)) ? value : ((!value) ? ('0'+ DOT_OPERATOR) : (value + DOT_OPERATOR));
        return decimalValue;
    }
}