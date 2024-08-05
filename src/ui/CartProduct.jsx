import React from 'react';

import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";

import useCart from '../hook/useCart';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/useAuthContext';

export default function CartProduct({product:{count, imgFirst, imgList, productId, productOption, title, total, userId}}) {  
  const product = {count, imgFirst, imgList, productId, productOption, title, total, userId}
  const {addCartNum, minusCartNum, removeCart} = useCart(productId, product, productOption[0]||"");

  const handleAddClick = ()=>{
    let newProduct = {...product, count:count+1, total:productOption[1]?productOption[1]*(count+1):3000*(count+1)};
    addCartNum.mutate(newProduct);
  }

  const handleMinusClick = ()=>{
    if (product.count<=1) return;
    let newProduct = {...product, count:count-1, total:productOption[1]?productOption[1]*(count-1):3000*(count-1)};
    minusCartNum.mutate(newProduct);
  }

  const handleTrashClick = ()=>{
    removeCart.mutate(product);
  }

  return (
    <div className='w-full  md:w-11/12 lg:w-9/12 h-28 border rounded-md flex justify-between items-center bg-white p-2 m-1 hover:border-fcs'
    >
      <img src={product.imgFirst} className='w-16 h-16 md:w-24 md:h-24 flex-shrink-0'/>
      <div className='w-28 md:w-32 p-1'>
        <p className='w-28 md:w-32 whitespace-nowrap overflow-hidden text-ellipsis'>{product.title}</p>
        <p className='text-xs text-gray-600'>{product.productOption[0]}</p>
        <p className='text-xs text-gray-600 mt-2'>개당 {product.productOption[1]??3000} ₩</p>
      </div>

      <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center mr-1'>
          <FaSquarePlus className='cursor-pointer hover:scale-105' onClick={handleAddClick}/>
          <div className='mx-2'>{product.count}</div>
          <FaSquareMinus className='cursor-pointer hover:scale-105' onClick={handleMinusClick}/>
        </div> 
        <RiDeleteBin5Fill className='flex-shrink-0 text-2xl hover:text-fcs hover:scale-105 cursor-pointer' 
          onClick={handleTrashClick}/>
      </div>
    </div>
  );
}

