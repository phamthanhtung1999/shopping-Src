import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import './style.scss';

Footer.propTypes = {
};

function Footer(props) {
  return (
    <Box className='footer' style={{ padding: '30px', backgroundColor: '#303030' }}>
      <Container>
        <Grid >
          <Grid item style={{ textAlign: "center" }}>
            <Typography variant='h4' style={{ fontWeight: 'bold', color: 'white' }} > {`Shopping`}</Typography>
          </Grid>
          <Box className='footer__list'>
            <Grid item className="footer__item">
              <Typography variant='h6' style={{ fontWeight: 'bold', color: 'white' }}>Tổng đài hỗ trợ </Typography>
              <ul>
                <li>Liên hệ đặc hàng: <a href="#">0373274317</a></li>
                <li>Thắc mắc đơn hàng: <a href="#">0373274317</a></li>
                <li>Góp ý khiếu nại: <a href="#">0373274317</a></li>
              </ul>
            </Grid>
            <Grid item className="footer__item">
              <Typography variant='h6' style={{ fontWeight: 'bold', color: 'white' }}>Về EZ Shop</Typography>
              <ul>
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a href="#">Tin Tức</a></li>
              </ul> </Grid>
            <Grid item className="footer__item">
              <Typography variant='h6' style={{ fontWeight: 'bold', color: 'white' }}>Chăm sóc khách hàng</Typography>
              <ul>
                <li> <a href="#">Chính sách đổi trả</a></li>
                <li> <a href="#">chính sách bảo hành</a></li>
                <li> <a href="#">Chính sách hoàn tiền</a></li>
              </ul>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;