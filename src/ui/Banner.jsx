import React, { useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner1 from './bannerImg/b1.JPG'
import banner2 from './bannerImg/b2.JPG'
import banner3 from './bannerImg/b3.JPG'
import { Link } from 'react-router-dom';

export default function Banner() {
  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed: 5000,
  };

  const sliderPlay = () =>{
    sliderRef.current.slickPlay();
  }

  useEffect(()=>{
    sliderPlay()
  }, []); 

  return (
    <div className='w-full md:w-11/12 h-fit mt-4 mb-10'>
      <Slider {...settings}
        className='w-full h-fit md:h-fit text-center'
        ref={sliderRef}
      >
        <Link to={'/event/banner1'} className='w-full h-fit'>
          <img src={banner1}
          className='w-full'
          style={{'height':`${window.innerHeight*0.2}px`,
          'objectFit':'cover',
          'objectPosition':'left'
        }}
        /></Link>
        <Link to={'/event/banner2'} className='w-full h-fit'>
          <img src={banner2}
          className='w-full'
          style={{
          'height':`${window.innerHeight*0.2}px`,
          'objectFit':'cover',
          'objectPosition':'left'
        }}
        /></Link>
        <Link to={'/event/banner3'} className='w-full h-fit'>
          <img src={banner3}
          className='w-full'
          style={{'height':`${window.innerHeight*0.2}px`,
          'objectFit':'cover',
          'objectPosition':'left'
        }}
        /></Link>
      </Slider>
    </div>
  );
}

