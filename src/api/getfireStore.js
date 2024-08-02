import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, startAfter} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import {collection, doc, setDoc, getDoc, getDocs, orderBy, query, limit, where, and, or} from "firebase/firestore"; 
import { addServerProduct } from "./firebase";


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
const analytics = getAnalytics(app);

//하위 컬렉션의 모든 문서 가져오기
export async function getNextItems({pageParam}){
  console.log("들어오는 인수", pageParam) //{queryKey: Array(3), pageParam: 0, direction: 'forward', meta: undefined}
  const db = getFirestore(app); 
  
  const q = pageParam ? query(collection(db, 'ROOTUE PROJECT', 'Story', 'storyID'),
  orderBy("time", "desc"),
  startAfter(pageParam), //latestDocs의 존재 여부를 확인한다
  limit(2))
  :
  query(collection(db, 'ROOTUE PROJECT', 'Story', 'storyID'),
  orderBy("time", "desc"), //latestDocs의 존재 여부를 확인한다
  limit(2));

  const querySnapshot =  await getDocs(q);
  console.log(querySnapshot);

  //각각의 doc은 Que:ryDocumentSnapshot이란 이름으로 저장되어 있다.
  //실질적으로 저장했던 데이터는 doc.data() 속에 들어있다.
  let result = [];
  querySnapshot.forEach((doc) => {
    //console.log(doc); => QueryDocumentSnapshot를 출력한다
    // doc.data() is never undefined for query doc snapshots
    result.push([doc, doc.data()]); //snapshot과 데이터를 같이 push한다.
  });
  console.log("결과...", result);

  //return querySnapshot;
  return result;
}

export async function getAllProducts({pageParam}){
  const db = getFirestore(app);
  
  const q = pageParam ? query(collection(db, 'ROOTUE PROJECT', 'AllProducts', 'productId'),
  orderBy("time", "desc"),
  startAfter(pageParam), //latestDocs의 존재 여부를 확인한다
  limit(12))
  :
  query(collection(db, 'ROOTUE PROJECT', 'AllProducts', 'productId'),
  orderBy("time", "desc"), //latestDocs의 존재 여부를 확인한다
  limit(12));

  const querySnapshot =  await getDocs(q);

  let result = [];
  querySnapshot.forEach((doc) => {
    //console.log(doc); => QueryDocumentSnapshot를 출력한다
    // doc.data() is never undefined for query doc snapshots
    result.push([doc, doc.data()]); //snapshot과 데이터를 같이 push한다.
  });

  //return querySnapshot;
  return result;
}


export async function getBestProducts(){
  const db = getFirestore(app);
  const favoriteq =  query(collection(db, 'ROOTUE PROJECT', 'AllProducts', 'productId'),
  orderBy("favorite", "desc"), //latestDocs의 존재 여부를 확인한다
  limit(10));

  const querySnapshot =  await getDocs(favoriteq);
  let result = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data()); //snapshot과 데이터를 같이 push한다.
  });
  console.log("베스트 결과...", result);
  //return querySnapshot;
  return result;
}


export async function getFarmerProducts(farmerId){
  const db = getFirestore(app);
  const q =  query(collection(db, 'ROOTUE PROJECT', 'FarmerStory', farmerId),
  orderBy("time", "desc")) //latestDocs의 존재 여부를 확인한다;

  const querySnapshot =  await getDocs(q);
  let result = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data()); //snapshot과 데이터를 같이 push한다.
  });

  //return querySnapshot;
  return result;
}

export async function getOneProduct(productId){
  const db = getFirestore(app);
  const docRef = doc(db, 'ROOTUE PROJECT', 'AllProducts', 'productId', productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } 
  return docSnap.data();
}

export async function AddProductFavorite(prevData){
  const db = getFirestore(app);
  return await setDoc(doc(db, 'ROOTUE PROJECT', 'AllProducts', 'productId', prevData.productId), 
  {...prevData, ['favorite']:prevData.favorite+1});
}

export async function MinusProductFavorite(prevData){
  const db = getFirestore(app);
  return await setDoc(doc(db, 'ROOTUE PROJECT', 'AllProducts', 'productId', prevData.productId), 
  {...prevData, ['favorite']:prevData.favorite-1});
}