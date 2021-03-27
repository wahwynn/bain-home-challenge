import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import BookCard from './BookCard';
import BookDetails from './BookDetails';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from './Cart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
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
  body: {
    margin: 12,
  },
}));

export default function MainPage() {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then((res) => res.json())
      .then((booksObj) => setBooks(booksObj))
      .catch((error) => setLoadingError(error));
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

  const getCartItems = () => cartItems.length;

  // Only show the body contents if there was no loading error. This way we still have
  // the page header loaded.
  const pageBody = loadingError ? (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sorry, there was an error loading the page. 🙁 Please refresh the page
          to try again.
        </Typography>
      </CardContent>
    </Card>
  ) : (
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
            <Button color="inherit" component={Link} to="/cart">
              <Badge badgeContent={getCartItems()} color="error">
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
