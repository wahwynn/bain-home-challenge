import { render, screen } from '@testing-library/react';

import App from './App';
import React from 'react';

test('renders book shop app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Book Shop/i);
  expect(linkElement).toBeInTheDocument();
});
