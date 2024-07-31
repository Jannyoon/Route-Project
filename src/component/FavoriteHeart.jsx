import React from "react";
import useProductFavorite from "../hook/useProductFavorite";

import { CiHeart } from "react-icons/ci";
import { useAuthContext } from "../context/useAuthContext";
import { addUserFavorite } from "../api/firebase";

export default function FavoriteHeart({product:{buy, 
    farmerId, 
    farmerName, 
    firstKind, 
    imgFirst, 
    keyword, 
    productDetail, 
    productId,
    secondKind, 
    title}}){

    const product = {farmerId, farmerName, firstKind, imgFirst, productDetail, productId,secondKind, title};
    const {user} = useAuthContext();
    console.log("현재 id", productId);
    const userId = user && user.uid;
    const {isFavoriteProduct, OneProductInfo} = useProductFavorite(productId);
    const userHeart = isFavoriteProduct.data;
    console.log(userHeart);
    let favorite = 0;
    if (OneProductInfo.data) favorite = OneProductInfo.data.favorite;
    //userHeart는 undefined거나 아님 존재하는 값이거나 둘 중 하나일 것.
    
    const handleHeartClick = ()=>{
        if (!userHeart){
            //사용자가 관심상품으로 등록한 적 없는 경우
            addUserFavorite(userId, productId, product);
        } else {
            //이미 사용자가 관심사품으로 등록한 경우

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