import { render, screen } from '@testing-library/react';

import Cart from './Cart';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { books } from './common/sampleBooks';

test('renders empty cart page', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Cart
        cartItems={books}
        removeFromCart={() => {}}
        clearAllCartItems={() => {}}
        checkoutItems={() => {}}
      />
    </MemoryRouter>
  );
  expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  expect(screen.getByText(/remove all/i)).toBeInTheDocument();

  // First book
  expect(screen.getByText(/Fundamentals of Wavelets/i)).toBeInTheDocument();
  expect(screen.getByText(/Goswami, Jaideva/i)).toBeInTheDocument();

  // Second book should not be shown
  expect(screen.queryByText(/Data Smart/i)).toBeInTheDocument();
});
