/**
 * Store api endpoint urls here.
 */

const SERVER = 'http://localhost:3000';
const BASE_URL = '/api/v1';

// Urls without the hostname needed for the node server
const URLS = {
  books: `${BASE_URL}/books`,
};

module.exports = {
  SERVER: SERVER,
  BASE_URL: BASE_URL,
  URLS: URLS,
  ENDPOINTS: {
    books: `${SERVER}${URLS.books}`,
  },
};
