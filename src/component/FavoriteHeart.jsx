import React from "react";
import useProductFavorite from "../hook/useProductFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { useAuthContext } from "../context/useAuthContext";
import { addUserFavorite, removeUserFavorite } from "../api/firebase";
import { AddProductFavorite, MinusProductFavorite } from "../api/getfireStore";

export default function FavoriteHeart({product:{farmerId, farmerName, firstKind, imgFirst, productDetail, productId,secondKind, title}}){
    const queryClient = useQueryClient();
    const product = {farmerId, farmerName, firstKind, imgFirst, productDetail, productId,secondKind, title};
    const {user} = useAuthContext();
    const userId = user && user.uid;
    let prevData = {};    
    let favorite = 0;

    const {isFavoriteProduct, OneProductInfo, AddFavoriteNum, MinusFavoriteNum} = useProductFavorite(productId, product, prevData);
    if (OneProductInfo.data){
        favorite = OneProductInfo.data.favorite;
        prevData = OneProductInfo.data;
    }    
    
    const userHeart = isFavoriteProduct.data;
    console.log(userHeart);


    //userHeart는 undefined거나 아님 존재하는 값이거나 둘 중 하나일 것.
    const handleHeartClick = ()=>{
        if (!userHeart){
            //사용자가 관심상품으로 등록한 적 없는 경우
           AddFavoriteNum.mutate({ productId, product},{
              onSuccess:()=>{
                AddProductFavorite(prevData);
                queryClient.invalidateQueries({queryKey:['ROOTUE PROJECT', 'AllProducts', 'productId', productId||""]});
              }
            }
           );
        } else {
            //이미 사용자가 관심상품으로 등록한 경우
            MinusFavoriteNum.mutate({productId}, {
              onSuccess : ()=>{
                MinusProductFavorite(prevData);
                queryClient.invalidateQueries({queryKey:['ROOTUE PROJECT', 'AllProducts', 'productId', productId||""]});
              }
            })
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <CiHeart className="text-3xl cursor-pointer hover:scale-105 " 
                style={!userHeart ? {"color":"black"} : {"color":"red"}}
                onClick={handleHeartClick}
            />
            <p className="text-xs md:text-sm">{`${favorite}`}</p>
        </div>
    )
}