import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import BookCard from './BookCard';
import BookDetails from './BookDetails';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from './Cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
  card: {
    margin: 1,
  },
}));

export default function CategoryPage() {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    function fetchBooks() {
      fetch('http://localhost:3000/api/books')
        .then((res) => res.json())
        .then((booksObj) => setBooks(booksObj));
    }
    fetchBooks();
  }, []);
  const handleAddToCart = (book) => {
    setCartItems((prevCart) => [...prevCart, book]);
  };

  const handleRemoveFromCart = (cartId) => {
    console.log(cartId);
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

  const getCartItems = () => cartItems.length;

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Book Shop
            </Typography>
            <Button color="inherit" component={Link} to="/cart">
              <Badge badgeContent={getCartItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Button>
          </Toolbar>
        </AppBar>
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
                <BookDetails
                  book={books.find((book) => book.Id === bookId)}
                  addToCart={handleAddToCart}
                />
              );
            }}
          />
          <Route path="/">
            <main className={classes.content}>
              <BookCard books={books} />
            </main>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
