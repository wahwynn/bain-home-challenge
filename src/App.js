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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
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
    margin: 8,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
  },
  title: {
    fontSize: 14,
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
                  startIcon={<InfoIcon />}
                  variant="contained"
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
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => addToCart(book)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

const shoppingCartStyles = makeStyles({
  root: {
    margin: 8,
    height: '100%',
  },
  title: {
    fontSize: 14,
  },
  table: {},
});

function ShoppingCart({
  cartItems,
  removeFromCart,
  clearAllCartItems,
  checkoutItems,
}) {
  const classes = shoppingCartStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 8 }}></TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.length === 0 ? (
            <TableRow key={'empty'}>
              <TableCell colSpan={8} align="center">
                Cart is Empty
              </TableCell>
            </TableRow>
          ) : null}
          {Object.keys(cartItems).map(cartItemsIndex => {
            const cartItem = cartItems[cartItemsIndex];
            return (
              <TableRow key={cartItemsIndex}>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => removeFromCart(cartItemsIndex)}
                  >
                    Remove
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {parseInt(cartItemsIndex) + 1}
                </TableCell>
                <TableCell>{cartItem.Title}</TableCell>
                <TableCell>{cartItem.Author}</TableCell>
              </TableRow>
            );
          })}
          <TableRow key={'actions'}>
            <TableCell colSpan={2}>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<RemoveShoppingCartIcon />}
                onClick={clearAllCartItems}
              >
                Remove All
              </Button>
            </TableCell>

            <TableCell colSpan={2} align="right">
              <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={checkoutItems}
              >
                Checkout
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
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
  checkoutItems: PropTypes.func.isRequired,
};
