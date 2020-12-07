import { Calculator } from './calc.js';
import { Utils } from './utils.js';

const MAX_DISPLAY_DIGITS = 9;
const MAX_EXPONENTIAL_DIGITS = 4;
const INTEGER_SWITCH_OPERATOR = '+/-';
const PERCENTAGE_OPERATOR = '%';

let calculator = new Calculator();
const calculatorDisplay = document.querySelector('.result');

// Handles if the user input is an operator
const handleOperator = (operator) => {
        if (operator == PERCENTAGE_OPERATOR) { // Percentage Handler
            percentageHandler();
        } else if (operator != INTEGER_SWITCH_OPERATOR) { // Arithmetic Operations Handler
            if (calculator.secondOperand) {
                handleResult();
                calculator.setOperator(operator);
            } else if (calculator.isFirstOperandPopulated || calculator.firstOperand) { // To perform operations recursively
                calculator.setOperator(operator);
                calculator.setDisplayValue(null);
                calculator.isFirstOperandPopulated = true;
            }
        } else { // Negate user input
            let displayValue = '';
            if (calculator.isFirstOperandPopulated && calculator.operator) {
                displayValue = Utils.negateInteger(calculator.secondOperand);
                calculator.setSecondOperand(displayValue);
            } else {
                displayValue = Utils.negateInteger(calculator.firstOperand);
                calculator.setFirstOperand(displayValue);
            }
            updateDisplayValue(displayValue);
            calculator.setDisplayValue(displayValue);
        }
}

// Handles if the user inputs a number
const handleInput = (value) => {
    let displayValue = '';
    if (!calculator.operator) {
        displayValue = checkDisplayValue(value);
        calculator.setFirstOperand(displayValue);
    } else {
        displayValue = (!calculator.secondOperand) ? calculator.getSecondOperand() + value : checkDisplayValue(value);
        calculator.setSecondOperand(displayValue);
        calculator.setFirstOperandPopulated(true);
    }
    calculator.setDisplayValue(displayValue);
    updateDisplayValue(displayValue);
}

// Calculates the result based on the user values
const handleResult = () => {
    let {firstOperand, secondOperand, operator} = calculator;
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    let calculatedValue;
    switch (operator) {
        case '+':
        case '-':
        case '/':
            calculatedValue = calculator.arithmeticOperatorHandler(`${firstOperand} ${operator} ${secondOperand}`);
            break;
        case 'x':
            calculatedValue = calculator.arithmeticOperatorHandler(`${firstOperand} * ${secondOperand}`);
            break;
        default:
            break;
    }
    calculatedValue = calculatedValue.toString();
    updateDisplayValue(calculatedValue);
    calculator.resetValuesAfterCalculation(calculatedValue);
}

// Calculates the percentage of current input
const percentageHandler = () => {
    let displayValue = '';
    if (calculator.isFirstOperandPopulated && calculator.operator) {
        displayValue = calculator.arithmeticOperatorHandler(`${calculator.secondOperand} / 100`);
        calculator.setSecondOperand(displayValue);
    } else {
        displayValue = calculator.arithmeticOperatorHandler(`${calculator.firstOperand} / 100`);;
        calculator.setFirstOperand(displayValue);
    }
    updateDisplayValue(displayValue);
}

// Handles if the user inputs a dot
const handleDotOperator = () => {
    let displayValue = '';
    if (calculator.isFirstOperandPopulated && calculator.operator) {
        displayValue = Utils.convertIntegerToDecimal(calculator.secondOperand);
        calculator.setSecondOperand(displayValue);
    } else {
        displayValue = Utils.convertIntegerToDecimal(calculator.firstOperand);
        calculator.setFirstOperand(displayValue);
    }
    calculator.setDisplayValue(displayValue);
    updateDisplayValue(displayValue);
}

// Handler to reset the values and display
const resetHandler = () => {
    calculator.resetValues();
    updateDisplayValue('0');
}

// Event Handlers to all the buttons in the calculator
const addEventsToCalculatorButtons = () => {
    const calculatorButtons = document.getElementsByTagName('button');
    for (let i=0; i<calculatorButtons.length; i++) {
        calculatorButtons[i].addEventListener('click', (event) => {
            const selectedValue = event.target.innerText;
            const elementClassList = event.target.classList;
            if(elementClassList.contains('operator')) {
                handleOperator(selectedValue);
            } else if (elementClassList.contains('number')) {
                handleInput(selectedValue);
            } else if (elementClassList.contains('calculate-operator')) {
                handleResult();
            } else if (elementClassList.contains('dot-operator')) {
                handleDotOperator(selectedValue);
            } else if (elementClassList.contains('clear-operator')) {
                resetHandler();
            }
        });
    }
}

// Starting application
const bootstrap = () => {
    addEventsToCalculatorButtons();
}
bootstrap();

// Helper functions
// Update calculator display, also checks if the value is less than max allowable digits, if not converts result into exponential form
const updateDisplayValue = (value) => {
    calculatorDisplay.innerText = (value.length > MAX_DISPLAY_DIGITS) ? (+value).toExponential(MAX_EXPONENTIAL_DIGITS) : value;
}

// Check if the total displayed digits is allowable
const checkDisplayValue = (value) => {
    const displayValue = (calculator.displayValue) ? (calculator.displayValue.length == MAX_DISPLAY_DIGITS ? calculator.displayValue : calculator.displayValue + value) : value;
    return displayValue;
}