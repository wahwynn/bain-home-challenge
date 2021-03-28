import App, { BodyRoutes } from './App';
import { fireEvent, render, screen } from '@testing-library/react';

import { ENDPOINTS } from './api';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { books } from './common/sampleBooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

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
  expect(screen.getByText(/Book Shop/i)).toBeInTheDocument();

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

test('renders cart page', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <BodyRoutes books={books} cartItems={[]} />
    </MemoryRouter>
  );

  expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  expect(screen.getByText(/remove all/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart is Empty/i)).toBeInTheDocument();
});

test('full workflow click through', async () => {
  /**
   * Complete workflow test clicking all the buttons and checking the cart
   */
  const mockedAlert = jest.fn();
  let node;
  let nodes;

  render(<App />);

  // Wait for the list screen to load
  expect(await screen.findByText(/Goswami, Jaideva/i)).toBeInTheDocument();

  // Click the details button for a book
  node = screen.getByTestId('details-button-1');
  fireEvent.click(node);

  // Wait for details page to load
  expect(await screen.findByText(/Wiley/i)).toBeInTheDocument();

  // Click the add to cart button
  node = screen.getByTestId('add-to-cart-button-1');
  fireEvent.click(node);

  // Wait for the return back to the list screen
  expect(await screen.findByText(/Data Smart/i)).toBeInTheDocument();

  // See the item has been added to the cart
  node = screen.getByTestId('cart-item-count-1');

  // Click the details button for a book
  node = screen.getByTestId('details-button-2');
  fireEvent.click(node);

  // Wait for details page to load
  expect(await screen.findByText(/Wiley/i)).toBeInTheDocument();

  // Click the add to cart button
  node = screen.getByTestId('add-to-cart-button-2');
  fireEvent.click(node);

  // Wait for the return back to the list screen
  expect(await screen.findByText(/Goswami, Jaideva/i)).toBeInTheDocument();

  // See the item has been added to the cart
  node = screen.getByTestId('view-cart');
  fireEvent.click(node);

  // Wait for the return back to the list screen
  expect(await screen.findByText(/Checkout/i)).toBeInTheDocument();

  nodes = screen.getAllByText(/Remove/i);
  // Two books with remove buttons and the remove all button
  expect(nodes.length).toEqual(3);

  node = screen.getByTestId('remove-button-1');
  fireEvent.click(node);

  nodes = screen.getAllByText(/Remove/i);
  // One book remaining and the remove all button
  expect(nodes.length).toEqual(2);

  node = screen.getByTestId('remove-all-button');
  fireEvent.click(node);

  nodes = screen.getAllByText(/Remove/i);
  // One book remaining and the remove all button
  expect(nodes.length).toEqual(1);

  jest.spyOn(window, 'alert').mockImplementation(mockedAlert);
  node = screen.getByTestId('checkout-button');
  fireEvent.click(node);

  expect(mockedAlert.mock.calls.length).toEqual(1);
});
