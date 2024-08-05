import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { getUserCart, IsProduct } from '../api/firebase';

export default function useCart(productId, optionName) {
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

  return {addProductToCart, userCart}
}

