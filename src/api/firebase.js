// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} from "firebase/auth";
import { doc, setDoc,} from "firebase/firestore"; 

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

const auth = getAuth();
// Initialize Firebase

/*로그인 관련 훅*/
export function getAuthChanged(func){
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      func(user); //콜백 함수 실행
      return user;
    } 
  });

}

export async function AddNewUser(email, password, func){
  if (password.length<8 || password.length>10){
    alert("비밀번호 자릿수가 맞지 않습니다.")
    return;
  }
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("새로운 유저", user); //가장 중요하게 쓰일 정보는 user.uid
    func();
    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    //에러메시지
    let arr = errorMessage && errorMessage.split("(auth/")
    let len = arr[arr.length-1].length;
    let errorType = arr[arr.length-1].slice(0,len-2)
    console.log(arr[arr.length-1].slice(0,len-2));
    console.log(errorMessage);
    alert(errorType);
  });
}

export async function LogIn(email, password, func){
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("로그인 성공", user);
    func();
    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("로그인 실패")
  });
}

export async function LogOut(){
  return signOut(auth).then(() => {
  // Sign-out successful.
    console.log("로그아웃");
  }).catch(console.error);
}


/*realtime Database */
export function signUp(userId, email, isFarmer) {
  const db = getDatabase();
  if (isFarmer){
    set(ref(db, 'Farmers/' + userId), {
      userId,
      email,
    });
  }
  //idCheck를 위해 email만 저장해놓는다.
  userId && set(ref(db, 'FOR_ID_CHECK/'+userId), email);

  return set(ref(db, 'users/' + userId), {
    userId,
    email: email,
    profile_picture: 'https://res.cloudinary.com/doujrgenf/image/upload/v1720285571/%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_emikyc.jpg',
    nickName:"별명을 입력해주세요",
    isFarmer,
    story:'0'
  });
}


export async function checkPrevIDs(){
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `FOR_ID_CHECK`)).then((snapshot) => {
    if (snapshot.exists()) {
      let result = Object.values(snapshot.val())
      console.log(result);
      return result;
    } else return [];
  }).catch((error) => {
    console.error(error);
  });
}


export async function getUserProfile(userId){
  const dbRef = ref(getDatabase());
  if (!userId) return;
  return get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      return result;
    }
  }).catch((error) => {
    console.error(error);
  });
}

//프로퍼티 추가, 혹은 데이터 수정할 때 사용하는 함수
export async function updateUserInfo(userInfo, newProp, newVal){
  const db = getDatabase();
  return set(ref(db, 'users/' + userInfo.userId), {
    ...userInfo,
    [newProp] : newVal
  }).catch(()=>{
    console.log("여기서 에러 발생");
  });
}


//farmer
export async function updateFarmerInfo(userId, userInfo){
  const db = getDatabase();

  if (userId){  
    if (!userInfo.isFarmer){
      remove(ref(db, 'Farmers/'+userId)).catch(console.error);
    }
    else set(ref(db, 'Farmers/'+userId), {email:userInfo.email, userId})
    return set(ref(db, 'users/' + userId), userInfo).catch(()=>{
      console.log("여기서 에러 발생");
    });
  }
}

export async function removeUser(userId){
  /*
  1)forIdCheck/userId 삭제
  2) isFarmer가 true 값이라면 Farmer/userId도 삭제
  3) users/userId도 삭제
  4) Authentication 삭제가 마지막
  
  */
  const db = getDatabase();
  if (!userId) return;
  remove(ref(db, 'FOR_ID_CHECK/'+userId)).catch(console.error);
  remove(ref(db, 'Farmers/'+userId)).catch(console.error);
  remove(ref(db, 'users/'+userId)).catch(console.error); 
}

export function deleteUserAuth(){
  const user = auth.currentUser;

  return deleteUser(user).then(() => {
    console.log("authentication 삭제")
  }).catch(console.error);

}

//firestore에 정보 추가하기
//프로퍼티 추가, 혹은 데이터 수정할 때 사용하는 함수
export async function updateUserStory(user, story, storyid){
  const db = getFirestore(app);
  const UserRef = doc(db, "ROOTUE PROJECT", "Userstory");
  setDoc(UserRef, { capital: true }, { merge: true });
  const timestamp = new Date();

  return await setDoc(doc(db, "ROOTUE PROJECT", "Userstory", user.userId, storyid),
  {...story,
  time: timestamp
  })
  .then((result) =>{
    console.log(result);
    alert(timestamp);
  })
  .catch(console.error);
}
        

export async function updateServerStory(story, userData, storyid){
  const db = getFirestore(app);
  const storyRef = doc(db, "ROOTUE PROJECT", "Story");
  setDoc(storyRef, { capital: true }, { merge: true });
  const timestamp = new Date();

  return await setDoc(doc(db, "ROOTUE PROJECT", "Story", 'storyID', storyid), 
  {...story,
    userId : userData.userId,
    userName : userData.nickName,
    userProfileImg : userData.profile_picture,
    time:timestamp,
  })
  .then((result)=>{
    console.log(result);
  })
  .catch(console.error);
}


export async function addServerProduct(product, productId){
  const db = getFirestore(app);
  const ProductRef = doc(db, "ROOTUE PROJECT", "Products");
  setDoc(ProductRef, { capital: true }, { merge: true });
  const timestamp = new Date();
  await setDoc(doc(db, "ROOTUE PROJECT", "AllProducts", "productId", productId),
  {...product,
    time:timestamp
  })
  .then((result)=>{
    console.log(result);
  })
  .catch(console.error);

  return await setDoc(doc(db, "ROOTUE PROJECT", "Products", product.firstKind, productId), 
  {...product,
    time:timestamp
  })
  .then((result)=>{
    console.log(result);
  })
  .catch(console.error);
}

export async function addUserProduct(product, userId, productId){
  const db = getFirestore(app);
  const userProductRef = doc(db, "ROOTUE PROJECT", 'FarmerStory');
  setDoc(userProductRef, { capital: true }, { merge: true });
  const timestamp = new Date();

  return await setDoc(doc(db, "ROOTUE PROJECT", 'FarmerStory', userId, productId),
  {...product,
    time:timestamp
  })
  .then((result)=>{console.log(result);})
  .catch(console.error);
}

//유저의 카트에 해당 상품이 들어있는가
export async function IsProduct(userId, productId, optionName){
  const dbRef = ref(getDatabase());
  if (!userId || !productId) return;
  return get(child(dbRef, `Carts/${userId}/${productId}/${optionName}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      return result;
    } else return false;
  }).catch((error) => {
    console.error(error);
  });
}


//farmer
export async function updateUserCart(userId, productId, optionName, product){
  const db = getDatabase();

  return set(ref(db, `Carts/${userId}/${productId}/${optionName}`), product).catch(()=>{
    console.log("여기서 에러 발생");
  });

}



//유저의 관심 상품에 해당 상품이 들어있는가
export async function favoriteChoose(userId, productId){
  const dbRef = ref(getDatabase());
  if (!userId || !productId) return 0;
  return get(child(dbRef, `users/${userId}/favorite/${productId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      return result
    } else return false;
  }).catch((error) => {
    console.error(error);
  });
}

export async function getUserFavorite(userId){
  const dbRef = ref(getDatabase());
  if (!userId) return;
  return get(child(dbRef, `users/${userId}/favorite`)).then((snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      return result;
    } else return [];
  }).catch((error) => {
    console.error(error);
  });
}


//프로퍼티 추가, 혹은 데이터 수정할 때 사용하는 함수
export async function addUserFavorite(userId, productId, product){
  const db = getDatabase();
  if (!userId || !productId) return;
  return set(ref(db,`users/${userId}/favorite/${productId}`), product).catch(()=>{
    console.log("여기서 에러 발생");
  });
}

export async function removeUserFavorite(userId, productId){
  const db = getDatabase();
  if (!userId || !productId) return;
  return remove(ref(db,`users/${userId}/favorite/${productId}`)).catch(console.error);
}




/*
//프로퍼티 추가, 혹은 데이터 수정할 때 사용하는 함수
export async function updateUserInfo(userInfo, newProp, newVal){
  const db = getDatabase();
  return set(ref(db, 'users/' + userInfo.userId), {
    ...userInfo,
    [newProp] : newVal
  }).catch(()=>{
    console.log("여기서 에러 발생");
  });
}
*/