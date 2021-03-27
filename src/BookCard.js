import { BookType } from './common/PropTypes';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function BookCard(props) {
  const classes = cardStyles();
  const { books } = props;

  return (
    <Grid container spacing={3}>
      {Object.keys(books).map((bookIndex) => {
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

BookCard.propTypes = {
  books: PropTypes.arrayOf(BookType).isRequired,
};
