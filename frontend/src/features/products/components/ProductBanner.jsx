import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box } from '@mui/material';

export const ProductBanner = ({ images }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      style={{ overflow: 'hidden', width: '100%', height: '100%' }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Box component="img" sx={{ width: '100%', objectFit: 'contain' }} src={image} alt={'Banner Image'} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
