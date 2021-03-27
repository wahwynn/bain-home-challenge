import { Link, useParams } from 'react-router-dom';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { BookType } from './common/PropTypes';
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

export default function BookDetails({ book, addToCart }) {
  let { bookId } = useParams();
  const classes = detailsStyles();

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

BookDetails.propTypes = {
  book: BookType,
  addToCart: PropTypes.func.isRequired,
};
