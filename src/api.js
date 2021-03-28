/**
 * Store api endpoint urls here.
 */

const PORT = 3000;
const SERVER = `http://localhost:${PORT}`;
const BASE_URL = '/api/v1';

// Urls without the hostname needed for the node server
const URLS = {
  books: `${BASE_URL}/books`,
};

module.exports = {
  PORT: PORT,
  SERVER: SERVER,
  BASE_URL: BASE_URL,
  URLS: URLS,
  ENDPOINTS: {
    books: `${SERVER}${URLS.books}`,
  },
};
