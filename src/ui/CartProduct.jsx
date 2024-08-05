import React from 'react';

import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";

export default function CartProduct({product}) {
  return (
    <div className='w-full  md:w-11/12 lg:w-9/12 h-28 border rounded-md flex justify-between justify-center items-center bg-white p-2 m-1 hover:border-fcs'
    >
      <img src={product.imgFirst} className='w-16 h-16 md:w-24 md:h-24 flex-shrink-0'/>
      <div className='w-28 md:w-32 p-1'>
        <p className='w-28 md:w-32 whitespace-nowrap overflow-hidden text-ellipsis'>{product.title}</p>
        <p className='text-xs text-gray-600'>{product.productOption[0]}</p>
      </div>

      <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center mr-1'>
          <FaSquarePlus className='cursor-pointer hover:scale-105'/>
          <div className='mx-2'>{product.count}</div>
          <FaSquareMinus className='cursor-pointer hover:scale-105'/>
        </div> 
        <RiDeleteBin5Fill className='flex-shrink-0 text-2xl hover:text-fcs hover:scale-105 cursor-pointer'/>
      </div>
    </div>
  );
}

