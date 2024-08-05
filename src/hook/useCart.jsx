import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/useAuthContext';
import { getUserCart, IsProduct, addCartProductNum, MinusCartProductNum, removeCartProduct } from '../api/firebase';

export default function useCart(productId="", product="", optionName="") {
  const {user} = useAuthContext();
  const queryClient = useQueryClient();
  const userId = user && user.uid;

  const addProductToCart = useMutation({
    mutationFn : ({productId,optionName})=>IsProduct(user.uid, productId,optionName),
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey:['Carts', user.uid||"", productId||"", optionName||""]});
    },
    onError:(error)=>console.log(error),
  })

  const userCart =  useQuery({
    queryKey : ['Carts', userId||""],
    queryFn : () => getUserCart(userId),
    enabled : !!userId,
  })

  //Carts/${userId}/${productId}/${optionName}
  const addCartNum = useMutation({
    mutationFn : (newProduct)=>addCartProductNum(userId, newProduct),
    onSuccess : ()=>{
      queryClient.invalidateQueries(['Carts', userId||"", productId, optionName,])
    }, 
    onError:(error)=>console.log(error)
  });

  const minusCartNum = useMutation({
    mutationFn : (newProduct)=>MinusCartProductNum(userId, newProduct),
    onSuccess : ()=>{
      queryClient.invalidateQueries(['Carts', userId||"", productId||"", optionName||"",])
    }
  });
  
  const removeCart = useMutation({
    mutationFn : (product)=>removeCartProduct(userId, product),
    onSuccess : ()=>{
      queryClient.invalidateQueries(['Carts', userId||"", productId||""])
    }
  })



  
  return {addProductToCart, userCart, addCartNum, minusCartNum, removeCart}
}

