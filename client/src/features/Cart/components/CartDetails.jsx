import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { default as React } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from 'features/products/utils';
import ActionItem from './ActionItem';
import QuantityCartField from './QuantityCartField';
import ThumbnailItem from './ThumbnailItem';
import Paying from './Paying';
import { TableFooter } from '@material-ui/core';




const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '15px'
  }
});
CartDetails.propTypes = {
  list: PropTypes.array,
};
CartDetails.defaultProps = {
  list: [],
}


function CartDetails({ list }) {
  const classes = useStyles();
  const rows = list;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell className={classes.title}>Tên sản phẩm</TableCell>
            <TableCell className={classes.title} align="center">Hình ảnh</TableCell>
            <TableCell className={classes.title} align="center">Số lượng</TableCell>
            <TableCell className={classes.title} align="right">Đơn giá</TableCell>
            <TableCell className={classes.title} align="right">Thành Tiền</TableCell>
            <TableCell className={classes.title} align="center">Tác vụ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.product.name}
              </TableCell>
              <TableCell align="center">
                <ThumbnailItem product={row.product} />
              </TableCell>
              <TableCell align="center">
                <QuantityCartField id={row.id} quantity={row.quantity} />
              </TableCell>
              <TableCell align="right">{formatPrice(row.product.unitPrice)}</TableCell>
              <TableCell align="right">{formatPrice(row.quantity * row.product.unitPrice)}</TableCell>
              <TableCell align="center">
                <ActionItem id={row.id} product={row.product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ justifyContent: 'end' }}>
        <Paying />
      </div>
    </TableContainer>
  );
}

export default CartDetails;