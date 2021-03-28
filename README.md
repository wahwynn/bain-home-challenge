# Notes To The Reviewer

Greetings Reviewer (∗ ･‿･)ﾉ゛

The original README.md for the challenge has been moved to
[CHALLENGE_INSTRUCTIONS.md](CHALLENGE_INSTRUCTIONS.md).

This new file is for my instructions and commentary.

## Challenge Commentary

Below is some commentary on the challenge that may not be evident from the code.

- Since the project was bootstrapped with starting code, my general philosophical
  approach was to treat this as an enhancement to what was already there. I introduced
  new libraries when adding features, but I tried to keep using what was there if it
  was already implemented. (e.g. fetch remains instead of a more robust library like
  axios)

- The backend api is very small. There was not much room to show good api design. If the
  shopping cart checkout would be implemented it would use a POST method. Otherwise,
  more features would be needed to highlight api design.

- Regarding performance, if the books list become very large the addition of paging
  for data coming from the api as well as a search function would make a big difference.
  This would keep all pages and loading times small. The shopping cart could be
  optimized for volume but it is unlikely a shopping cart will be filled with many
  items. Especially given the UI of adding only one book at a time.

- Why does the api have a Height field for books? I thought maybe this was a mistake and
  it might be some other field like the number of pages. However, a spot check of some
  books showed the pages do not match the real books. I have left in the Height field
  as is.

# Steps for setting up a new dev environment

## Installation

1. Clone the repo
2. Install dependencies `npm install`
3. Setup pre-commit git hooks `npx simple-git-hooks`. This installs hooks that
   automatically lint and format your files before commit.

## Development

You need two services running to develop. The front end bundler hosting the live loading
code and the backend REST API server.

1. Start the frontend server `npm start`. This service will watch the files and supports
   live reloading.
2. Start the backend server `npm run bootServer`. This service does NOT support live
   reloading. You must restart this if you make any changes. Make sure your Node.js
   version is `>=10`.

Optionally, you can also run the tests in the background.

3. To run the test use `npm test`. This will start a test runner in watch mode. The
   tests will be rerun after every file change. Your IDE may also automatically detect
   the results and highlight the failed tests as well as uncovered lines from the
   coverage report.

## Other Commands

- Generate coverage report `npm run testCoverage`
- Build the files for production `npm run build`

## Production Installation

1. Build the files for production with `npm run build`
2. Upload the created `dist` folder to the root of a webserver. This bundle will not
   work in a browser loaded as a file.

---

That's all for now. ( ´ ▽ ` )ﾉ
