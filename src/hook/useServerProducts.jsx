import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery
} from '@tanstack/react-query'
import { getAllProducts, getBestProducts } from '../api/getfireStore';
import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getDoc, getDocs, orderBy, query, limit,  getFirestore, startAfter} from "firebase/firestore"; 
import { useAuthContext } from '../context/useAuthContext';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID, 
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

export default function useServerProducts(){
  const {user} = useAuthContext();
  let userId = user && user.uid;

  const getServerProducts = useInfiniteQuery({
    queryKey : ['ROOTUE PROJECT', 'AllProducts', 'productId'],
    queryFn : getAllProducts,
    initialPageParam : 0,
    getNextPageParam : (lastPage, allPages)=>{
      //console.log({lastPage, allPages});
      //console.log("전달받은 querySnapshot", lastPage);      

      if (lastPage.length<12){
        return null;
      }
      return lastPage[lastPage.length-1][0];
    }
  })

  return {getServerProducts}
}
