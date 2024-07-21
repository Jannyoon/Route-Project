import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import banner1 from './bannerImg/b1.JPG'
import banner2 from './bannerImg/b2.JPG'
import banner3 from './bannerImg/b3.JPG'

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
        <div className='w-full h-fit'>
          <img src={banner1}
          className='w-full'
          style={{'height':`${window.innerHeight*0.2}px`,
          'objectFit':'cover',
          'objectPosition':'left'
        }}
        /></div>
        <div className='w-full h-fit'>
          <img src={banner2}
          className='w-full'
          style={{
          'height':`${window.innerHeight*0.2}px`,
          'objectFit':'cover',
          'objectPosition':'left'
        }}
        /></div>
        <div className='w-full h-fit'>
          <img src={banner3}
          className='w-full'
          style={{'height':`${window.innerHeight*0.2}px`,
          'objectFit':'cover',
          'objectPosition':'left'
  
        }}
        /></div>
    
      </Slider>
      
    </div>
  );
}

