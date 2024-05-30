const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['/', '*', '-', '+'];


document.addEventListener('keyup', function (event) {
  let keyName = event.key;

  // Numbers 0-9
  if (numbers.includes(keyName)) {
    appendNumber(keyName);
  }

  // Operators /, *, -, +, =
  if (operators.includes(keyName)) {
    if (keyName == '/') {
      setOperation('divide');
    }
    if (keyName == '*') {
      setOperation('multiply');
    }
    if (keyName == '-') {
      setOperation('subtract');
    }
    if (keyName == '+') {
      setOperation('add');
    }
  }

  if (keyName == 'Enter') {
    calculate();
  }

  // Backspace to reset value and display value
  if (keyName == 'Backspace') {
    backspace();
  }

  // Dot 
  if (keyName == ',' || keyName == '.') {
    appendDot();
  }
});


function operate(operator, a, b) {
  switch (operator) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    default:
      return 'Invalid operator';
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error'; // Handle division by zero
  }
  return a / b;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000; // Round to 3 decimal places
}



let currentOperand = '0';
let previousOperand = '';
let operation = null;
let hasDecimal = false;

function appendNumber(number) {
  if (currentOperand === '0' || currentOperand === '') {
    currentOperand = number.toString();
  } else {
    currentOperand += number.toString();
  }
  updateDisplay();
}

function backspace() {
  if (currentOperand.length > 1) {
    currentOperand = currentOperand.slice(0, -1);
  } else {
    currentOperand = '0';
  }
  hasDecimal = currentOperand.includes('.');
  updateDisplay();
}

function appendDot() {
  if (!hasDecimal) {
    if (currentOperand === '') {
      currentOperand = '0.';
    } else {
      currentOperand += '.';
    }
    hasDecimal = true;
  }
  updateDisplay();
}

function setOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '' && operation !== null) {
    calculate();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  hasDecimal = false;
}

function calculate() {
  if (operation === null || currentOperand === '' || previousOperand === '') return;

  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  result = operate(operation, prev, current);
  result = roundResult(result);
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
  hasDecimal = currentOperand.includes('.');
  updateDisplay();
}

function clearDisplay() {
  currentOperand = '0';
  hasDecimal = false;
  updateDisplay();
}


function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = currentOperand;
}

