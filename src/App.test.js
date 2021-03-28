import App, { BodyRoutes } from './App';
import { render, screen } from '@testing-library/react';

import { ENDPOINTS } from './api';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const books = [
  {
    Id: '1',
    Title: 'Fundamentals of Wavelets',
    Author: 'Goswami, Jaideva',
    Genre: 'tech',
    SubGenre: 'signal_processing',
    Height: '228',
    Publisher: 'Wiley',
  },
  {
    Id: '2',
    Title: 'Data Smart',
    Author: 'Foreman, John',
    Genre: 'tech',
    SubGenre: 'data_science',
    Height: '235',
    Publisher: 'Wiley',
  },
];
const handlers = [
  rest.get(ENDPOINTS.books, async (req, res, ctx) => {
    return res(ctx.json(books));
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders book shop app', async () => {
  render(<App />);
  expect(await screen.getByText(/Book Shop/i)).toBeInTheDocument();

  // Expect a list of books
  expect(await screen.findByText(/Goswami, Jaideva/i)).toBeInTheDocument();
  expect(await screen.findByText(/Data Smart/i)).toBeInTheDocument();
});

test('renders error page', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  server.use(
    rest.get(ENDPOINTS.books, (req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ message: 'Internal server error' })
      );
    })
  );
  render(<App />);
  expect(screen.getByText(/Book Shop/i)).toBeInTheDocument();

  expect(
    await screen.findByText(/error loading the page/i)
  ).toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});

test('renders not found page', () => {
  render(
    <MemoryRouter initialEntries={['/does/not/exist']}>
      <BodyRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
});

test('renders details page', () => {
  render(
    <MemoryRouter initialEntries={['/book/details/1']}>
      <BodyRoutes books={books} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Fundamentals of Wavelets/i)).toBeInTheDocument();
  expect(screen.getByText(/Goswami, Jaideva/i)).toBeInTheDocument();
  expect(screen.getByText(/tech/i)).toBeInTheDocument();
  expect(screen.getByText(/228/i)).toBeInTheDocument();
  expect(screen.getByText(/Wiley/i)).toBeInTheDocument();

  // Data from other books should not be in the details
  expect(screen.queryByText(/Data Smart/i)).not.toBeInTheDocument();
});

test('renders empty cart page', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <BodyRoutes books cartItems={[]} />
    </MemoryRouter>
  );

  expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  expect(screen.getByText(/remove all/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart is Empty/i)).toBeInTheDocument();
});
