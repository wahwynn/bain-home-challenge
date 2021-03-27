import PropTypes from 'prop-types';

export const BookType = PropTypes.shape({
  Id: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Author: PropTypes.string.isRequired,
  Genre: PropTypes.string.isRequired,
  SubGenre: PropTypes.string.isRequired,
  Height: PropTypes.string.isRequired,
  Publisher: PropTypes.string.isRequired,
});
