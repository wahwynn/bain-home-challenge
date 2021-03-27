import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
        .then(res => res.json())
        .then(booksObj => setBooks(booksObj));
    }
    fetchBooks();
  }, []);
  const handleAddToCart = book => {
    setCartItems(prevCart => [...prevCart, book]);
  };

  const handleRemoveFromCart = cartId => {
    console.log(cartId);
    setCartItems(prevCart => {
      prevCart.splice(cartId, 1);
      return [...prevCart];
    });
  };

  const handleClearAllCartItems = () => {
    setCartItems([]);
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
            />
          </Route>
          <Route
            path="/book/details/:bookId"
            render={({ match }) => {
              const bookId = match?.params?.bookId;
              return (
                <BookDetails
                  book={books.find(book => book.Id === bookId)}
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

const cardStyles = makeStyles({
  root: {
    minWidth: '50%',
    margin: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function BookCard(props) {
  const classes = cardStyles();
  const { books } = props;

  return (
    <Grid container spacing={3}>
      {Object.keys(books).map(bookIndex => {
        const book = books[bookIndex];
        const bookId = book.Id;

        return (
          <Grid item key={bookId} xs={12} sm={4}>
            <Card key={bookId} className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {book.Title}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {book.Author}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/book/details/${bookId}`}
                >
                  Book in detail
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

function BookDetails({ book, addToCart }) {
  let { bookId } = useParams();
  const classes = cardStyles();

  if (!book) {
    return (
      <Card key={bookId} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Not Found!
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card key={bookId} className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {book.Title}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {book.Author}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {book.Genre} - {book.SubGenre} - {book.Height} - {book.Publisher}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to="/"
          onClick={() => addToCart(book)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

function ShoppingCart({ cartItems, removeFromCart, clearAllCartItems }) {
  const classes = cardStyles();
  return (
    <>
      <Button size="small" onClick={clearAllCartItems}>
        Clear All
      </Button>
      {Object.keys(cartItems).map(cartItemsIndex => {
        const cartItem = cartItems[cartItemsIndex];
        return (
          <Card key={cartItem.Id} className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {cartItem.Title}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {cartItem.Author}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => removeFromCart(cartItemsIndex)}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
const BookType = PropTypes.shape({
  Id: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Author: PropTypes.string.isRequired,
  Genre: PropTypes.string.isRequired,
  SubGenre: PropTypes.string.isRequired,
  Height: PropTypes.string.isRequired,
  Publisher: PropTypes.string.isRequired,
});

BookDetails.propTypes = {
  book: BookType,
  addToCart: PropTypes.func.isRequired,
};

BookCard.propTypes = {
  books: PropTypes.arrayOf(BookType).isRequired,
};

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(BookType).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearAllCartItems: PropTypes.func.isRequired,
};
