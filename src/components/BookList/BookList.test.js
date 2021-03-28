import { render, screen } from '@testing-library/react';

import BookList from './BookList';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { books } from '../../common/sampleBooks';

test('renders list page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <BookList books={books} />
    </MemoryRouter>
  );

  // First book
  expect(screen.getByText(/Fundamentals of Wavelets/i)).toBeInTheDocument();
  expect(screen.getByText(/Goswami, Jaideva/i)).toBeInTheDocument();

  // Second book
  expect(screen.queryByText(/Data Smart/i)).toBeInTheDocument();

  // Summary page should not show all the details
  expect(screen.queryByText(/tech/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/228/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Wiley/i)).not.toBeInTheDocument();
});
