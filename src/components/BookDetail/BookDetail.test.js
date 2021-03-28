import { fireEvent, render, screen } from '@testing-library/react';

import BookDetail from './BookDetail';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { books } from '../../common/sampleBooks';

test('renders details page', () => {
  render(
    <MemoryRouter initialEntries={['']}>
      <BookDetail book={books[0]} addToCart={() => {}} />
    </MemoryRouter>
  );

  // First book
  expect(screen.getByText(/Fundamentals of Wavelets/i)).toBeInTheDocument();
  expect(screen.getByText(/Goswami, Jaideva/i)).toBeInTheDocument();

  // Details page should show all the details
  expect(screen.queryByText(/tech/i)).toBeInTheDocument();
  expect(screen.queryByText(/228/i)).toBeInTheDocument();
  expect(screen.queryByText(/Wiley/i)).toBeInTheDocument();

  // Second book should not be shown
  expect(screen.queryByText(/Data Smart/i)).not.toBeInTheDocument();
});

test('renders details not found page', () => {
  render(
    <MemoryRouter initialEntries={['']}>
      <BookDetail book={null} addToCart={() => {}} />
    </MemoryRouter>
  );

  // First book
  expect(screen.getByText(/Book ".*" not found/i)).toBeInTheDocument();
});

test('add to cart button', () => {
  const mockedAddToCart = jest.fn();
  render(
    <MemoryRouter initialEntries={['/book/details/1']}>
      <BookDetail book={books[0]} addToCart={mockedAddToCart} />
    </MemoryRouter>
  );
  const node = screen.getByText(/Add to Cart/i);
  fireEvent.click(node);
  expect(mockedAddToCart.mock.calls.length).toEqual(1);
});
