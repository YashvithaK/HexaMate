import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const operations = ['+', '-', '*', '/'];

describe('Hexadecimal Calculator GUI', () => {
  test('renders all hex digit buttons', () => {
    render(<Calculator />);
    hexChars.forEach(char => {
      expect(screen.getByRole('button', { name: char })).toBeInTheDocument();
    });
  });

  test('renders all operation buttons', () => {
    render(<Calculator />);
    operations.forEach(op => {
      expect(screen.getByRole('button', { name: op })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: '=' })).toBeInTheDocument();
    expect(screen.getByTestId('clear-btn')).toBeInTheDocument();
  });

  test('inputting hex values updates display', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByTestId('display')).toHaveTextContent('AB');
  });

  test('enforces 2-digit input limit', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByTestId('display')).toHaveTextContent('12');
  });

  test('addition works correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByTestId('display')).toHaveTextContent('B');
  });

  test('subtraction does not go negative', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  test('multiplication works correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    fireEvent.click(screen.getByRole('button', { name: '*' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByTestId('display')).toHaveTextContent('14');
  });

  test('division works correctly and returns integer', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    fireEvent.click(screen.getByRole('button', { name: '/' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByTestId('display')).toHaveTextContent('7');
  });

  test('clear button resets display and expression', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    fireEvent.click(screen.getByTestId('clear-btn'));
    expect(screen.getByTestId('display')).toHaveTextContent('0');
    expect(screen.getByTestId('expression')).toHaveTextContent('');
  });
});
