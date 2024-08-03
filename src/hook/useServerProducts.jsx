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

  const getServerFarmerProducts = useInfiniteQuery({
    queryKey : ["ROOTUE PROJECT","FarmerStory", userId],
    queryFn : getFarmerProducts,
    initialPageParam : 0,
    getNextPageParam : (lastPage, allPages) =>{
      if (lastPage.length<8) return null;
      return lastPage[lastPage.length-1][0];
    }
  })


  async function getFarmerProducts({pageParam}){
    const db = getFirestore(app);
    const q = pageParam ? query(collection(db, "ROOTUE PROJECT","FarmerStory", userId),
    orderBy("time"),
    startAfter(pageParam),
    limit(8))
    :
    query(collection(db, "ROOTUE PROJECT","FarmerStory", userId),
    orderBy("time"),
    limit(8));
    
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    //각각의 doc은 QueryDocumentSnapshot이란 이름으로 저장되어 있다.
    //실질적으로 저장했던 데이터는 doc.data() 속에 들어있다.
    let result = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc); => QueryDocumentSnapshot를 출력한다
      // doc.data() is never undefined for query doc snapshots
      result.push([doc, doc.data()]); //snapshot과 데이터를 같이 push한다.
    });
    //console.log("결과...", result);
    return result;

  }


  return {getServerProducts, getServerFarmerProducts}
}
