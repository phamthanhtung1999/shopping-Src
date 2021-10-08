import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, Box, Button, Typography } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router';
import { CustomStatus } from 'constants';


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
              <TableCell align="center"><Typography style={{ fontWeight: "bold" }}>ID</Typography></TableCell>
              <TableCell align="center"><Typography style={{ fontWeight: "bold" }}>Trạng Thái </Typography></TableCell>
              <TableCell align="center"><Typography style={{ fontWeight: "bold" }}>Tổng Tiền </Typography></TableCell>
              <TableCell align="center"><Typography style={{ fontWeight: "bold" }}>Thời Gian </Typography></TableCell>
              <TableCell align="center"><Typography style={{ fontWeight: "bold" }}>Thao Tác </Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  <Typography style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{row.id}</Typography>
                </TableCell>

                <TableCell align="center" >
                  <Typography
                    style={{
                      backgroundColor: row.status == "processing" ? '#198754' : row.status == "delivering" ? '#0d6efd' : row.status == "done" ? '#198754' : '#dc3545',
                      borderRadius: '10px',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      color: row.status == "processing" ? 'white' : row.status == "delivering" ? 'white' : row.status == "done" ? 'white' : 'white',
                      textTransform: 'uppercase'
                    }}
                  >
                    {row.status}</Typography>
                </TableCell>
                <TableCell align="center" ><Typography style={{ fontWeight: 'bold' }}>{`${row.total_amt} vnd`}</Typography></TableCell>
                <TableCell align="center" ><Typography style={{ fontWeight: 'bold' }}> {moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</Typography></TableCell>
                <TableCell align="center" >
                  <Button
                    style={{ fontWeight: 'bold' }}
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