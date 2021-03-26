EMEA Take Home Challenge
=================

## Delivery instructions

### If you received this code as a zip file
- Extract the zip file
- Initialize git
- Push your changes to a public Github repo
- For review, send us the public repo URL

### If you received this code by getting access to this repo
- **FORK** this repo as a very first step
- Push your changes to this forked (public) Github repo
- For review, send us the public repo URL

---

# 1. The Challenge
The end result of the challenge should be a bookshop that has:
* A listing page
* A product detail page
* A cart page

# 2. What we will be looking at
* Your API
    * Are you following an API design?
    * Are you using appropriate HTTP methods?
    * Are handling your errors?
* Your app
    * Is there any directory structure?
    * Are you using modern React features?
    * How are you handling API responses?
    * What's the bundle size?
* Tests
    * What kind of tests have you written (integration, unit, e2e)?
    * What are you testing?
* Performance
    * There are already specific performance problems in both the frontend and backend. You should find and address these.
    * Your supplied solution will also be tested for performance in general.
* Git skills
    * We would like to see the history of your improvements via git.
* UI
    * Make it look nice, e.g. by using Material UI components (**Disclaimer: the project has been bootstrapped with Material UI!**)
* Basic documentation
   * How to start the app, architecture, etc

# 3. The Stack
As you can see the codebase is already bootstrapped with a frontend and a backend.

The frontend uses:
* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Parcel](https://parceljs.org/)
* [Babel](https://babeljs.io/)
* [Eslint](https://eslint.org/)
* [Prettier](https://prettier.io/)

The backend is headless and uses:
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)

# 4. Useful scripts
After you `npm run install`, you can:
* Start the DEV mode of the frontend by executing `npm start`.
* Start the REST API server by executing `npm run bootServer`.
    * Make sure your Node.js version is `>=10`.

A CSV file is loaded into memory and serves as the data backend for the books API.

# 5. Requirements
1. Extend the codebase by adding a router that navigates to the listing page (already implemented), the product detail page and the cart page.

2. Implement the product detail page
    * The product detail page should display all the details available for a single book.
    * A user can add a book to the cart
         * There's no need to store cart information to the backend here. Use the browser's storage.

3. Implement the cart page
    * It should list all the books that are added to the cart by the user.
    * Users should be able to clear the cart or remove items from the cart.

Feel free to change anything that is already implemented, e.g. better directory and component structure. You should fix any bugs or anything that can hurt backend and frontend performance.

# 6. Be prepared to do a pair review of the delivered codebase
