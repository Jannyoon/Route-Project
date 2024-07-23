import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { getBestProducts } from '../api/getfireStore';
import ProductCard from './ProductCard';
import { NextArrow, PrevArrow } from './SlideArrow';

export default function BestTenProducts() {
  const fakeData = {"buy" : 0,
    "farmerId":"Dt8mdNDqXcc34x6zrSk2QmKQXMG3",
    "farmerImg":"http://res.cloudinary.com/doujrgenf/image/upload/v1720936322/vgqizhzu4bhsmauobyhh.jpg",
    "farmerName":"장세윤",
    "favorite": 3,
    "firstKind":"기타",
    "imgFirst":"http://res.cloudinary.com/doujrgenf/image/upload/v1721217278/inxv83mhvjyywqsl7kr4.jpg",
    "imgList":["http://res.cloudinary.com/doujrgenf/image/upload/v1721217278/inxv83mhvjyywqsl7kr4.jpg","http://res.cloudinary.com/doujrgenf/image/upload/v1721217278/inxv83mhvjyywqsl7kr4.jpg"],
    "keyword":"참소라, 자연산",
    "option":"30미dddddddddddddddddddddd, 50미, 60미",
    "productDetail":"대왕참소라",
    "productId":"1c6084b4-5fa0-433d-941e-e0a3d5016614",
    "secondKind":"해산물",
    "time":"2024년 7월 21일 오후 11시 29분 20초 UTC+9",
    "title":"자연산대왕참소라ddddddddddddddddddddddddddddd"};
  

  const [bestProducts, setBestProducts] = useState([]);
  /*
  useEffect(()=>{
    setBestProducts([fakeData, fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,
      fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,])  
  },[])
  */

  
  useEffect(()=>{
    getBestProducts()
    .then((result)=>{
      setBestProducts(result);
    })
    .catch(console.error);    
  }, [])


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.8,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.15,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1.35,
          slidesToScroll: 1
        }
      }
    ]
  };



  return (
    <section className='w-full mt-5'>
        <div className='my-2 mx-2 text-lg font-semibold'>실시간 인기 Top 10</div>
        <div className='w-full h-full bg-brand p-3'>
          <Slider {...settings} className='w-full'>
            {bestProducts.map((product, idx)=><div className='w-full h-full'><ProductCard key={idx} data={product}/></div>)}
          </Slider>
        </div>  
    </section>
  );
}

