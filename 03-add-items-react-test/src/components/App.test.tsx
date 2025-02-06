import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
       
  test('Unit Test: should work', () => {
    render(<App />);
    expect(screen.getByText(/React/i)).toBeDefined();
  });
  
  test('E2E Test: should add items and remove them', async () => {
    const user = userEvent;
    render(<App />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDefined();

    const form = screen.getByRole('form');
    expect(form).toBeDefined();

    const button = form.querySelector('button');
    expect(button).toBeDefined();

    const randomText = crypto.randomUUID();
    await user.type(input, randomText);
    await user.click(button!);

    const list = screen.getByRole('list');
    expect(list).toBeDefined();
    expect(list.childNodes.length).toBe(1);

    const item = screen.getByText(randomText);
    const removeButton = item.querySelector('button');
    expect(removeButton).toBeDefined();

    screen.debug(item);
    await user.click(removeButton!);

    const noResults = screen.getByText(/No items available./i);
    expect(noResults).toBeDefined();
  });
});
