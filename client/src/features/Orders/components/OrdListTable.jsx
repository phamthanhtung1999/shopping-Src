import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, Box, Button } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router';


OrdListTable.propTypes = {
  data: PropTypes.array,
};

function OrdListTable({ data }) {
  const rows = data;
  const history = useHistory();
  const handleDetaisOrd = (orderId) => {
    history.push(`orders/${orderId}`)
  }

  return (
    <Box my={2} >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>

              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Tổng Tiền</TableCell>
              <TableCell align="center">Thời Gian</TableCell>
              <TableCell align="center">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="center" >{row.status}</TableCell>
                <TableCell align="center" >{`${row.total_amt} vnd`}</TableCell>
                <TableCell align="center" >{moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell align="center" >
                  <Button
                    onClick={() => { handleDetaisOrd(row.id) }}
                  >Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdListTable;