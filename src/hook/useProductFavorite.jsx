import React from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteChoose, getUserFavorite } from "../api/firebase";
import { getOneProduct } from "../api/getfireStore";

export default function useProductFavorite(productId){
    const {user} = useAuthContext();
    const query = useQueryClient();
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

    const AddFavoriteNum = useMutation({

    });

    const MinusFavoriteNum = useMutation({

    });

    const AddUserFavorite = useMutation({

    });

    const DeleteUserFavorite = useMutation({

    });


    return ({isFavoriteProduct, OneProductInfo});

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