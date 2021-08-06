import * as React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';
import { cartItemSelector } from '../Selector';

CartList.propTypes = {

};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'productImg',
    headerName: 'Hình ảnh',
    width: 150,
    editable: true,
  },
  {
    field: 'productName',
    headerName: 'Tên sản phẩm',
    width: 150,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },

];

const rows = useSelector(cartItemSelector);

function CartList(props) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default CartList;