import React from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function HeartProduct({product}) {
  console.log("product 정보", product);
  return (
    <div className='flex-shrink-0 w-11/12 lg:w-9/12 h-28 border rounded-md flex justify-between items-center bg-white p-2 m-1 cursor-pointer hover:border-fcs'>
      <img src={product.imgFirst} className='w-24 h-24 flex-shrink-0'/>
      <p className='w-32 whitespace-nowrap overflow-hidden text-ellipsis'>{product.title}</p>
      <RiDeleteBin5Fill className='flex-shrink-0 text-2xl hover:text-fcs hover:scale-105 cursor-pointer'/>
    </div>
  );
}

