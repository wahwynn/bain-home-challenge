import { fireEvent, render, screen } from '@testing-library/react';

import Cart from './Cart';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { books } from './common/sampleBooks';

test('renders cart page with items', () => {
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

test('remove all button', () => {
  const mockedRemoveAll = jest.fn();
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Cart
        cartItems={books}
        removeFromCart={() => {}}
        clearAllCartItems={mockedRemoveAll}
        checkoutItems={() => {}}
      />
    </MemoryRouter>
  );
  const node = screen.getByTestId('remove-all-button');
  fireEvent.click(node);
  expect(mockedRemoveAll.mock.calls.length).toEqual(1);
});

test('remove button', () => {
  const mockedRemoveAll = jest.fn();
  const mockedRemoveItem = jest.fn();
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Cart
        cartItems={books}
        removeFromCart={mockedRemoveItem}
        clearAllCartItems={mockedRemoveAll}
        checkoutItems={() => {}}
      />
    </MemoryRouter>
  );

  const nodes = screen.getAllByText(/Remove/i);
  // Two book remove and the remove all buttons = 3
  expect(nodes.length).toEqual(3);

  const node = screen.getByTestId('remove-button-0');
  fireEvent.click(node);

  expect(mockedRemoveItem.mock.calls.length).toEqual(1);
  expect(mockedRemoveAll.mock.calls.length).toEqual(0);
});

test('checkout button', () => {
  const mockedCheckout = jest.fn();
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Cart
        cartItems={[books[0]]}
        removeFromCart={() => {}}
        clearAllCartItems={() => {}}
        checkoutItems={mockedCheckout}
      />
    </MemoryRouter>
  );
  const node = screen.getByText(/Checkout/i);
  fireEvent.click(node);
  expect(mockedCheckout.mock.calls.length).toEqual(1);
});
