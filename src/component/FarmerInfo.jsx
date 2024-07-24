import React, { useEffect, useState } from 'react';
import { getFarmerProducts } from '../api/getfireStore';
import { NextArrow, PrevArrow } from './SlideArrow';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductCard from './ProductCard';
import FarmerProfile from './FarmerProfile';

export default function FarmerInfo({farmer :{farmerId,farmerImg,farmerName}}) {
  const [products, setProducts] = useState([]);
  console.log("farmerId 출력해봐", farmerId);

  useEffect(()=>{
    farmerId && getFarmerProducts(farmerId)
    .then((result)=>setProducts(result))
    .catch(console.error);
  },[]);

  console.log("물품 확인", products);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1.35,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };


  return (
    <div className='w-full mt-16 flex flex-col items-center'>
      <div className='w-full mt-2 font-semibold bg-yellow-50 p-2'>판매자 <span className='text-brand'>{farmerName}</span>의 다른 상품</div>
      <div className='w-full h-full p-5 border'>
        <Slider {...settings} className='w-full'>
          {products.length>0 && products.map((product, idx)=><ProductCard key={idx} data={{...product, farmerId, farmerImg, farmerName}}/>)}
        </Slider>
      </div>  
      <FarmerProfile farmerId={farmerId}/>
    </div>
  );
}

