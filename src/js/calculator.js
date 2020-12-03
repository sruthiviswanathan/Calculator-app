let calculator = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    displayValue: '',
    isFirstOperandPopulated: false
};

const MAX_DISPLAY_DIGITS = 9;
const NEGATIVE_INTEGER_OPERATOR = '-';
const DOT_OPERATOR = '.';
const INTEGER_SWITCH_OPERATOR = '+/-';

const calculatorDisplay = document.querySelector('.result');

// Handles if the user input is an operator
handleOperator = (operator) => {
        if (operator != INTEGER_SWITCH_OPERATOR) {
            if (calculator.isFirstOperandPopulated || calculator.firstOperand) {
                calculator.operator = operator;
                calculator.displayValue = '';
            }
        } else {
            let displayValue = '';
            if (calculator.isFirstOperandPopulated && calculator.operator) {
                calculator.secondOperand = negateInteger(calculator.secondOperand);
                displayValue = calculator.secondOperand;
            } else {
                calculator.firstOperand = negateInteger(calculator.firstOperand);
                displayValue = calculator.firstOperand;
            }
            calculatorDisplay.innerText = displayValue;
            calculator.displayValue = displayValue;
        }
}

// Handles if the user inputs a number
handleInput = (value) => {
    calculator.displayValue = (calculator.displayValue) ? (calculator.displayValue.length == MAX_DISPLAY_DIGITS ? calculator.displayValue : calculator.displayValue + value) : value;
    let displayValue = calculator.displayValue;
    let calculatedDisplayValue = '';
    if (!calculator.operator) {
        calculatedDisplayValue = displayValue;
        calculator.firstOperand = calculatedDisplayValue;
    } else {
        calculator.isFirstOperandPopulated = true;
        calculatedDisplayValue = displayValue;
        calculator.secondOperand = calculatedDisplayValue;
    }
    calculatorDisplay.innerText = calculatedDisplayValue;
}

// Calculates the result based on the user values
handleResult = () => {
    let {firstOperand, secondOperand, operator} = calculator;
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    let calculatedValue;
    switch (operator) {
        case '+':
            calculatedValue = firstOperand + secondOperand;
            break;
        case '-':
            calculatedValue = firstOperand - secondOperand;
            break;
        case 'x':
            calculatedValue = firstOperand * secondOperand;
            break;
        case '/':
            calculatedValue = firstOperand / secondOperand;
            break;
        case '%':
            calculatedValue = firstOperand % secondOperand;
            break;
        default:
            break;
    }
    calculatedValue = calculatedValue.toString();
    calculatorDisplay.innerText = calculatedValue;
    resetValuesAfterCalculation(calculatedValue);
}

// Reset the local calculator object after successful calculation
resetValuesAfterCalculation = (calculatedValue) => {
    calculator.secondOperand = '';
    calculator.operator = '';
    calculator.firstOperand = calculatedValue;
    calculator.displayValue = calculatedValue;
    calculator.isFirstOperandPopulated = true;
}

// Handles if the user inputs a dot
handleDotOperator = () => {
    let displayValue = '';
    if (calculator.isFirstOperandPopulated && calculator.operator) {
        calculator.secondOperand = convertIntegerToDecimal(calculator.secondOperand);
        displayValue = calculator.secondOperand;
    } else {
        calculator.firstOperand = convertIntegerToDecimal(calculator.firstOperand);
        displayValue = calculator.firstOperand;
    }
    calculator.displayValue = displayValue;
    calculatorDisplay.innerText = displayValue;
}

// Handler to reset the values and display
resetHandler = () => {
    calculator = {
        firstOperand: '',
        secondOperand: '',
        operator: '',
        displayValue: '',
        isFirstOperandPopulated: false
    };
    calculatorDisplay.innerText = '0';
}

// Event Handlers to all the buttons in the calculator
addEventsToCalculatorButtons = () => {
    const calculatorButtons = document.getElementsByTagName('span');
    for (let i=0; i<calculatorButtons.length; i++) {
        calculatorButtons[i].addEventListener('click', (event) => {
            const selectedElement = event.target;
            const selectedValue = selectedElement.innerText;
            if(selectedElement.classList.contains('operator')) {
                handleOperator(selectedValue);
            } else if (selectedElement.classList.contains('number')) {
                handleInput(selectedValue);
            } else if (selectedElement.classList.contains('calculate-operator')) {
                handleResult();
            } else if (selectedElement.classList.contains('dot-operator')) {
                handleDotOperator(selectedValue);
            } else if (selectedElement.classList.contains('clear-operator')) {
                resetHandler();
            }
        });
    }
}

// Starting application
bootstrap = () => {
    addEventsToCalculatorButtons();
}

bootstrap();

// Utility methods

// function to negate an integer
negateInteger = (value) => {
    const negatedInteger = (value.includes(NEGATIVE_INTEGER_OPERATOR)) ? value : (NEGATIVE_INTEGER_OPERATOR +  value);
    return negatedInteger;
}

// function to convert integer to decimal
convertIntegerToDecimal = (value) => {
    const decimalValue = (value.includes(DOT_OPERATOR)) ? value : (value + DOT_OPERATOR);
    return decimalValue;
}