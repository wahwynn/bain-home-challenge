import { BookType } from './common/PropTypes';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const shoppingCartStyles = makeStyles((theme) => ({
  root: {
    margin: 8,
    height: '100%',
  },
  title: {
    fontSize: 14,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}));

export default function ShoppingCart({
  cartItems,
  removeFromCart,
  clearAllCartItems,
  checkoutItems,
}) {
  const classes = shoppingCartStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell style={{ width: 12 }}></TableCell>
            <TableCell className={classes.tableHead}>Item #</TableCell>
            <TableCell className={classes.tableHead}>Title</TableCell>
            <TableCell className={classes.tableHead}>Author</TableCell>
            <TableCell className={classes.tableHead}>Publisher</TableCell>
            <TableCell className={classes.tableHead}>Book Id</TableCell>
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
          {Object.keys(cartItems).map((cartItemsIndex) => {
            const cartItem = cartItems[cartItemsIndex];
            return (
              <TableRow key={cartItemsIndex}>
                <TableCell align="right">
                  <Button
                    data-testid={`remove-button-${cartItemsIndex}`}
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteOutlinedIcon />}
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
                <TableCell>{cartItem.Publisher}</TableCell>
                <TableCell>{cartItem.Id}</TableCell>
              </TableRow>
            );
          })}
          <TableRow key={'actions'}>
            <TableCell colSpan={4}>
              <Button
                data-testid={'remove-all-button'}
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<RemoveShoppingCartOutlinedIcon />}
                onClick={clearAllCartItems}
              >
                Remove All
              </Button>
            </TableCell>

            <TableCell colSpan={2} align="right">
              <Button
                data-testid={'checkout-button'}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartOutlinedIcon />}
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

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(BookType).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearAllCartItems: PropTypes.func.isRequired,
  checkoutItems: PropTypes.func.isRequired,
};
