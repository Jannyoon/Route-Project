import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { RiDeleteBin5Fill } from "react-icons/ri";

import useProductFavorite from '../hook/useProductFavorite';
import { MinusProductFavorite } from '../api/getfireStore';


export default function HeartProduct({product}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //server에서 product 정보를 받아오도록 만들 것.
  const {OneProductInfo,  MinusFavoriteNum} = useProductFavorite(product.productId);
  let serverProduct = OneProductInfo.data;

  const handleProductClick = ()=>{
    if (serverProduct) navigate(`/product/:${product.productId}`, {state:serverProduct});
  }
  
  const handleTrashClick = (e)=>{
    e.stopPropagation();
    let productId = product.productId;
    MinusFavoriteNum.mutate({productId},{
      onSuccess : ()=>{
        MinusProductFavorite(serverProduct);
        queryClient.invalidateQueries({queryKey:['ROOTUE PROJECT', 'AllProducts', 'productId', productId||""]});
      }
    })
  }

  return (
    <div className='flex-shrink-0 w-11/12 lg:w-9/12 h-28 border rounded-md flex justify-between items-center bg-white p-2 m-1 cursor-pointer hover:border-fcs'
      onClick={handleProductClick}
    >
      <img src={product.imgFirst} className='w-24 h-24 flex-shrink-0'/>
      <p className='w-32 whitespace-nowrap overflow-hidden text-ellipsis'>{product.title}</p>
      <RiDeleteBin5Fill className='flex-shrink-0 text-2xl hover:text-fcs hover:scale-105 cursor-pointer'
        onClick={handleTrashClick}
      />
    </div>
  );
}

