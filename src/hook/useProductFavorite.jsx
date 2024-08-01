import React from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteChoose, getUserFavorite } from "../api/firebase";
import { getOneProduct } from "../api/getfireStore";
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

    });

    const AddUserFavorite = useMutation({

    });

    const DeleteUserFavorite = useMutation({

    });


    /*
    const newSetFarmerInfo = useMutation({
    mutationFn : (userInfo)=> updateFarmerInfo(uid, userInfo),
    onMutate:()=>{
      console.log("실행중");
    },
    onSuccess : ()=>{
      console.log("요청 성공")
      queryClient.invalidateQueries({queryKey:['users', uid||""]});
      queryClient.invalidateQueries({queryKey:['Farmers', uid||""]});
    },
    onError : (result)=>{
      console.log("요청 실패");
      console.log(result);
    }
  })
    */
    return ({isFavoriteProduct, OneProductInfo, AddFavoriteNum});

}

/*

export async function getOneProduct(productId){
  const db = getFirestore(app);
  const docRef = doc(db, 'ROOTUE PROJECT', 'AllProducts', 'productId', productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } 
  return docSnap.data();
}
*/