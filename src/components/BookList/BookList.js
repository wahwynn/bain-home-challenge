import React, { useEffect } from 'react';

import { BookType } from '../../common/PropTypes';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import consts from '../../common/consts';
import { makeStyles } from '@material-ui/core/styles';

const bookListStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
});

export default function BookList({ books }) {
  const classes = bookListStyles();
  useEffect(() => {
    document.title = consts.PAGE_TITLE;
  }, []);

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
                  data-testid={`details-button-${bookId}`}
                  size="small"
                  startIcon={<InfoOutlinedIcon />}
                  variant="contained"
                  component={Link}
                  to={`/book/details/${bookId}`}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(BookType).isRequired,
};
