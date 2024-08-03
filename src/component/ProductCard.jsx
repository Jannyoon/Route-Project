import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({data}) {
  const {buy, 
    farmerId, 
    farmerImg, 
    farmerName, 
    favorite, 
    firstKind, 
    imgList,
    imgFirst, 
    keyword, 
    option, 
    productDetail, 
    productId,
    secondKind, 
    title} = data;
    
  const navigate = useNavigate();
  const viewOption = option ? option.split(",").map((op)=>op.trim().split(":")): [["",""]];
  const cardOption = viewOption[0][0];
  const price = viewOption[0][1];
  //console.log(viewOption)

  const handleClick = () =>{
    navigate(`/product/${productId}`, {state: data});
    window.scrollTo(0,0);
  }
   
  return (
    <div onClick={handleClick}
      className='border w-40 md:w-48 h-68 flex flex-col justify-center items-center rounded-tr-3xl overflow-hidden cursor-pointer bg-white hover:border-brand'>
      <div className='basis-2/3 w-full flex-shrink-0 flex p-3 justify-center items-center'>
        <img className="size-40 object-cover" src={imgFirst}/>  
      </div>
      <div className='basis-1/3 w-full h-full flex-grow-0 p-1'>
        <div className='w-full h-1/4 whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
        <div className='w-full h-2/5 whitespace-nowrap overflow-hidden text-ellipsis text-xs md:text-sm pb-2'>{cardOption}</div>
        <div className='w-full h-full text-lg'><p className='w-full h-full font-semibold'>{price??3000} ₩</p></div>
      </div> 
    </div>
  );
}

