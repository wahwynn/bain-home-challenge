import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import BookDetail from './components/BookDetail/BookDetail';
import BookList from './components/BookList/BookList';
import { BookType } from './common/PropTypes';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import api from './api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  body: {
    margin: 12,
  },
}));

// Save the state to localStorage
function useLocalStorageState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageValue = window.localStorage.getItem(key);
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export default function MainPage() {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [cartItems, setCartItems] = useLocalStorageState([]);
  useEffect(() => {
    fetch(api.ENDPOINTS.books)
      .then((res) => {
        if (res.ok) {
          return res;
        }
        throw Error(res.statusText);
      })
      .then((res) => res.json())
      .then((booksObj) => setBooks(booksObj))
      .catch((error) => {
        console.error('fetch error', error);
        setLoadingError(error);
      });
  }, []);

  const handleAddToCart = (book) => {
    setCartItems((prevCart) => [...prevCart, book]);
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems((prevCart) => {
      prevCart.splice(cartId, 1);
      return [...prevCart];
    });
  };

  const handleClearAllCartItems = () => {
    setCartItems([]);
  };

  const handleCheckoutItems = () => {
    alert('Checkout not implemented');
  };

  const cartItemCount = cartItems.length;

  // Only show the body contents if there was no loading error. This way we still have
  // the page header loaded.
  const pageBody = loadingError ? (
    <ErrorLoadingPage />
  ) : (
    <BodyRoutes
      books={books}
      cartItems={cartItems}
      handleAddToCart={handleAddToCart}
      handleClearAllCartItems={handleClearAllCartItems}
      handleCheckoutItems={handleCheckoutItems}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  );

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/"
            >
              <HomeOutlinedIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Book Shop
            </Typography>
            <Button
              data-testid={'view-cart'}
              color="inherit"
              component={Link}
              to="/cart"
            >
              <Badge
                data-testid={`cart-item-count-${cartItemCount}`}
                badgeContent={cartItemCount}
                color="error"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>{pageBody}</div>
      </div>
    </Router>
  );
}

export const BodyRoutes = ({
  books,
  cartItems,
  handleAddToCart,
  handleClearAllCartItems,
  handleCheckoutItems,
  handleRemoveFromCart,
}) => {
  const classes = useStyles();
  return (
    <>
      <Switch>
        <Route path="/cart">
          <ShoppingCart
            cartItems={cartItems}
            removeFromCart={handleRemoveFromCart}
            clearAllCartItems={handleClearAllCartItems}
            checkoutItems={handleCheckoutItems}
          />
        </Route>
        <Route
          path="/book/details/:bookId"
          render={({ match }) => {
            const bookId = match?.params?.bookId;
            return (
              <BookDetail
                book={books.find((book) => book.Id === bookId)}
                addToCart={handleAddToCart}
              />
            );
          }}
        />
        <Route exact path="/">
          <main className={classes.content}>
            <BookList books={books} />
          </main>
        </Route>
        <Route component={Error404Page} />
      </Switch>
    </>
  );
};
BodyRoutes.propTypes = {
  books: PropTypes.arrayOf(BookType).isRequired,
  cartItems: PropTypes.arrayOf(BookType).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleClearAllCartItems: PropTypes.func.isRequired,
  handleCheckoutItems: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export function ErrorLoadingPage() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sorry, there was an error loading the page. 🙁 Please refresh the page
          to try again.
        </Typography>
      </CardContent>
    </Card>
  );
}

export function Error404Page() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Page not found. 🙁
        </Typography>
      </CardContent>
    </Card>
  );
}
