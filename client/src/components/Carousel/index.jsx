import { Box, Container } from '@material-ui/core';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './style.scss'

CarouselIn.propTypes = {
};


function CarouselIn(props) {
  return (
    <Box style={{ marginTop: 20, marginBottom: 18 }}>
      <Container style={{ padding: 0 }}>
        <Carousel
          interval="2000"
          autoPlay="true"
          infiniteLoop="true"
          showIndicators="false"
        >
          <div>
            <img src="https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-blockchain-big-data-mobile-phone-technology-image_11331.jpg" />
          </div>
          <div>
            <img src="https://ae01.alicdn.com/kf/H87c2b75fd9634bc0896227fa1bbf2fb6F.jpg" />
          </div>
          <div>
            <img src="https://i.pinimg.com/originals/92/bb/36/92bb3696bda46dcbf7f4e040580ec720.jpg" />
          </div>
        </Carousel>
      </Container>
    </Box>

  );
}

export default CarouselIn;