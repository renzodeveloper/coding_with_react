import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  
  test('should work', () => {
    render(<App />);
    expect(screen.getByText(/React/i)).toBeDefined();
  });

});

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */