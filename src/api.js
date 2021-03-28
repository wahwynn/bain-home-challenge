/**
 * Store api endpoint urls here.
 */

const SERVER = 'http://localhost:3000';
const BASE_URL = '/api/v1';

const ENDPOINTS = {
  books: `${SERVER}${BASE_URL}/books`,
};

module.exports = {
  SERVER: SERVER,
  BASE_URL: BASE_URL,
  ENDPOINTS: ENDPOINTS,
};
