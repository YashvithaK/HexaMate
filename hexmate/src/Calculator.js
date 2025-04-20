import React, { useState } from 'react';
import './Calculator.css';

const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const operations = ['+', '-', '*', '/'];

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [expression, setExpression] = useState(''); 

  // Handle number/hex input (0-F)
  const handleNumber = (value) => {
    if (display.length >= 2) return; // Input limit: 2 digits
    
    if (display === '0') {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
  };

  // Handle operations (+, -, *, /)
  const handleOperator = (nextOperator) => {
    const inputValue = parseInt(display, 16);
    
    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setExpression(`${display} ${nextOperator} `);
      setDisplay('0'); // Reset display for second operand
    } else {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(result.toString(16).toUpperCase());
      setFirstOperand(result);
      setExpression(`${result.toString(16).toUpperCase()} ${nextOperator} `);
    }
    
    setOperator(nextOperator);
  };

  // Calculate result
  const calculate = (first, second, op) => {
    let result;
    switch (op) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        result = Math.floor(first / second);
        break;
      default:
        return;
    }

    // Constraints
    if (result < 0) return 0;
    if (result > 0xFFFF) return 0xFFFF;
    return result;
  };

  // Handle equals (=)
  const handleEquals = () => {
    if (operator && firstOperand !== null) {
        const inputValue = parseInt(display, 16);
        const result = calculate(firstOperand, inputValue, operator);
        setDisplay(result.toString(16).toUpperCase());
        setExpression(`${expression}${display} = ${result.toString(16).toUpperCase()}`);
        setFirstOperand(null);
        setOperator(null);
    }
  };

  // Clear input (C)
  const clearInput = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setExpression('');
  };

  // GUI of Calculator 
  return (
    <div className="calculator">
      <div className="expression" data-testid="expression">{expression}</div>
      <div className="display" data-testid="display">{display}</div>
      <div className="button-grid">
        {hexChars.map((char) => (
          <button key={char} onClick={() => handleNumber(char)}>{char}</button>
        ))}
        {operations.map((op) => (
          <button key={op} onClick={() => handleOperator(op)}>{op}</button>
        ))}
        <button onClick={handleEquals}>=</button>
        <button onClick={clearInput} data-testid="clear-btn">C</button>
      </div>
    </div>
  );

};

export default Calculator;
