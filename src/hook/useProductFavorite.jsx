import React from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteChoose, getUserFavorite, removeUserFavorite } from "../api/firebase";
import { AddProductFavorite, getOneProduct } from "../api/getfireStore";
import { addUserFavorite } from "../api/firebase";

export default function useProductFavorite(productId, product, prevData){
    const {user} = useAuthContext();
    const queryClient = useQueryClient();
    const uid = user && user.uid;

    
    const isFavoriteProduct = useQuery({
        queryKey : ['users', uid||"", 'favorite', productId||""],
        queryFn : ()=>favoriteChoose(uid, productId),
        enabled : !!uid
    })

    const OneProductInfo = useQuery({
        queryKey : ['ROOTUE PROJECT', 'AllProducts', 'productId', productId||""],
        queryFn : ()=>getOneProduct(productId),
        enabled : !!productId
    });

    //users/${userId}/favorite/${productId}
    const AddFavoriteNum = useMutation({
      mutationFn : ({productId, product})=>addUserFavorite(uid, productId, product),
      onSuccess : ()=>{
        queryClient.invalidateQueries({queryKey:['users', uid||"", 'favorite', productId||""]})
      }
    });

    const MinusFavoriteNum = useMutation({
      mutationFn : ({productId})=>removeUserFavorite(uid, productId),
      onSuccess : ()=>{
        queryClient.invalidateQueries({queryKey:['users', uid||"", 'favorite']})
      }

    });



    return ({isFavoriteProduct, OneProductInfo, AddFavoriteNum, MinusFavoriteNum});

}
