// Get the display element
const display = document.getElementById('display');

// Variables to store calculator state
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

// Function to update the display
function updateDisplay() {
    display.value = currentInput;
}

// Function to append a number to the display
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    
    updateDisplay();
}

// Function to append a decimal point
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
        updateDisplay();
    }
}

// Function to append an operator
function appendOperator(op) {
    const inputValue = parseFloat(currentInput);
    
    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        // If there's already an operator, calculate the result first
        const result = performCalculation();
        previousInput = result;
        currentInput = String(result);
        updateDisplay();
    }
    
    operator = op;
    shouldResetDisplay = true;
}

// Function to perform calculations
function performCalculation() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;
    
    if (isNaN(prev) || isNaN(current)) {
        return currentInput;
    }
    
    // Use if-else statements to handle different operators
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        if (current === 0) {
            alert('Cannot divide by zero!');
            return 0;
        }
        result = prev / current;
    } else {
        return current;
    }
    
    // Round result to avoid floating point precision issues
    return Math.round(result * 100000000) / 100000000;
}

// Function to calculate and display result
function calculate() {
    if (operator && previousInput !== '') {
        const result = performCalculation();
        currentInput = String(result);
        previousInput = '';
        operator = '';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// Function to clear the entire display
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Function to clear the current entry
function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

// Function to delete the last character
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Initialize the display
updateDisplay();

// Add keyboard support using event listeners
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Check if the key is a number (0-9)
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    // Check if the key is an operator
    else if (key === '+' || key === '-') {
        appendOperator(key);
    }
    else if (key === '*') {
        appendOperator('*');
    }
    else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendOperator('/');
    }
    // Check if the key is decimal point
    else if (key === '.') {
        appendDecimal();
    }
    // Check if the key is Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Check if the key is Escape or Delete for clear
    else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    }
    // Check if the key is Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

