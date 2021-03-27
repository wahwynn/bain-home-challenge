import { render, screen } from '@testing-library/react';

import App from './App';
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
];
const handlers = [
  rest.get('http://localhost:3000/api/books', async (req, res, ctx) => {
    console.log('got here');
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
  expect(
    await screen.findByText(/Fundamentals of Wavelets/i)
  ).toBeInTheDocument();
});

test('renders error page', async () => {
  server.close();
  jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<App />);
  expect(screen.getByText(/Book Shop/i)).toBeInTheDocument();

  expect(
    await screen.findByText(/error loading the page/i)
  ).toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});
