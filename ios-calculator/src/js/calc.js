export class Calculator {
    
    constructor() {
        this.firstOperand = '';
        this.secondOperand = '';
        this.operator = null;
        this.displayValue = null;
        this.isFirstOperandPopulated = false;
    }

    // Getters
    getDisplayValue() {
        return this.displayValue;
    }

    getFirstOperand() {
        return this.firstOperand;
    }

    getSecondOperand() {
        return this.secondOperand;
    }

    getOperator() {
        return this.operator;
    }

    getFirstOperandPopulated() {
        return this.isFirstOperandPopulated;
    }

    // Setters
    setDisplayValue(value) {
        this.displayValue = value;
    }

    setFirstOperand(value) {
        this.firstOperand = value;
    }

    setSecondOperand(value) {
        this.secondOperand = value;
    }

    setFirstOperandPopulated(value) {
        this.isFirstOperandPopulated = value;
    }

    setOperator(value) {
        this.operator = value;
    }

    // Perform arithmetic operations
    arithmeticOperatorHandler(input) {
        return eval(input);
    }

    // reset values after calculation
    resetValuesAfterCalculation(value) {
        this.firstOperand = value;
        this.secondOperand = '';
        this.operator = null;
        this.displayValue = value;
        this.isFirstOperandPopulated = true;
    }

    // reset values
    resetValues() {
        this.firstOperand = '';
        this.secondOperand = '';
        this.operator = null;
        this.displayValue = null;
        this.isFirstOperandPopulated = false;
    }

}