import { Link, useParams } from 'react-router-dom';

import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { BookType } from '../../common/PropTypes';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const detailsStyles = makeStyles({
  root: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
  },
  author: {
    fontSize: 18,
    marginBottom: 14,
  },
  details: {
    fontSize: 14,
  },
});

export default function BookDetail({ book, addToCart }) {
  let { bookId } = useParams();
  const classes = detailsStyles();

  if (!book) {
    return (
      <Card key={bookId} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Book &quot;{bookId}&quot; not found! 🙁
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
          className={classes.author}
          variant="body2"
          component="p"
          gutterBottom
        >
          {book.Author}
        </Typography>
        <Typography className={classes.details} color="textSecondary">
          Publisher: {book.Publisher}
          <br />
          Height: {book.Height}
          <br />
          Genre: {book.Genre}
          <br />
          SubGenre: {book.SubGenre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          data-testid={`add-to-cart-button-${bookId}`}
          size="small"
          component={Link}
          to="/"
          variant="contained"
          startIcon={<AddShoppingCartOutlinedIcon />}
          onClick={() => addToCart(book)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

BookDetail.propTypes = {
  book: BookType,
  addToCart: PropTypes.func.isRequired,
};
