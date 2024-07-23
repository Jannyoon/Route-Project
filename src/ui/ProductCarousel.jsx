import React from 'react';
import {ProductPrevArrow, ProductNextArrow } from '../component/SlideArrow';
import Slider from "react-slick";

export default function ProductCarousel({imgList}) {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={imgList[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow : <ProductPrevArrow/>,
    nextArrow : <ProductNextArrow/>
  };


  return (
    <Slider {...settings} className='w-full h-full'>
      {
        imgList.map((im)=>
        <div className='w-full h-full bg-black'>
          <img className="w-full h-64 object-contain" src={im}/>
        </div>)
      }
    </Slider>
  );
}

